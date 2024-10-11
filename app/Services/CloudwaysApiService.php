<?php

namespace App\Services;

use App\Models\CloudwaysIntegration;
use App\Models\Integration;
use GuzzleHttp\Client;

class CloudwaysApiService
{
    public static string $baseUri = 'https://api.cloudways.com/api/v1/';

    public CloudwaysIntegration $cloudwaysIntegration;

    public Client $client;

    public function __construct(CloudwaysIntegration $cloudwaysIntegration)
    {
        if ($cloudwaysIntegration->accessTokenIsExpired()) {
            static::createConnection(
                email: $cloudwaysIntegration->email,
                apiKey: $cloudwaysIntegration->api_key,
            );

            $cloudwaysIntegration->refresh();
        }

        $this->cloudwaysIntegration = $cloudwaysIntegration;

        $this->client = new Client(['base_uri' => static::$baseUri]);
    }

    /**
     * create an initial connection with cloudways oauth api
     * to get an access token and expiration time and
     * store it in our database.
     */
    public static function createConnection(string $email, string $apiKey): CloudwaysIntegration
    {
        $connectionData = (array) static::connect(email: $email, apiKey: $apiKey) + [
            'email' => $email,
            'api_key' => $apiKey,
        ];

        $cloudwaysIntegration = user()->cloudwaysIntegration()->updateOrCreate(
            ['user_id' => user()->id],
            $connectionData
        );

        $integration = Integration::where('name', Integration::CLOUDWAYS)->first();
        user()->integrations()->syncWithoutDetaching([$integration->id]);

        return $cloudwaysIntegration;
    }

    /**
     * connect to the cloudways oauth api to get an access token
     * and expiration time.
     */
    protected static function connect(string $email, string $apiKey): object
    {
        $client = new Client(['base_uri' => static::$baseUri]);

        $response = $client->request('POST', 'oauth/access_token', [
            'json' => [
                'email' => $email,
                'api_key' => $apiKey,
            ],
        ]);

        return json_decode($response->getBody()->getContents());
    }

    /**
     * get cloudways servers list from our database or the
     * cloudways api depending on a timeout.
     */
    public function getServers(string $type): array
    {
        $serversResponse = null;

        if ($this->cloudwaysIntegration->hasServersResponse()) {
            $serversResponse = $this->cloudwaysIntegration->serversResponse;

            $expired = match ($type) {
                'fetch' => $serversResponse->fetchServersTimeoutExpired(),
                'refresh' => $serversResponse->refreshServersTimeoutExpired(),
            };

            if (! $expired) {
                return $serversResponse->servers;
            }
        }

        $serversResponseFromApi = $this->getServersFromApi();

        if ($serversResponse) {
            $serversResponse->update([
                'servers' => $serversResponseFromApi,
            ]);

            $serversResponse->refresh();
        } else {
            $serversResponse = $this->cloudwaysIntegration->serversResponse()->create([
                'user_id' => user()->id,
                'servers' => $serversResponseFromApi,
            ]);
        }

        return $serversResponse->servers;
    }

    /**
     * get cloudways servers list from the cloudways api.
     */
    protected function getServersFromApi(): array
    {
        $response = $this->client->request('GET', 'server', [
            'headers' => $this->getApiHeaders(),
        ]);

        return json_decode($response->getBody()->getContents())->servers;
    }

    /**
     * get api headers for the cloudways api, and add the
     * necessary authorization header.
     */
    protected function getApiHeaders(): array
    {
        $headers = ['Accept' => 'application/json'];

        if ($this->cloudwaysIntegration->token_type === 'Bearer') {
            $headers['Authorization'] = 'Bearer '.$this->cloudwaysIntegration->access_token;
        }

        return $headers;
    }
}
