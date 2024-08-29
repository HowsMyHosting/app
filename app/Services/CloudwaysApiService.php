<?php

namespace App\Services;

use App\Models\CloudwaysIntegration;
use GuzzleHttp\Client;

class CloudwaysApiService
{
    public static string $baseUri = 'https://api.cloudways.com/api/v1/';

    public static function createConnection(string $email, string $apiKey): CloudwaysIntegration
    {
        $connection = static::connect(
            email: $email,
            apiKey: $apiKey
        );

        return user()
            ->cloudwaysIntegration()
            ->firstOrCreate(
                [],
                (array) $connection
            );
    }

    public static function connect(string $email, string $apiKey): object
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
}
