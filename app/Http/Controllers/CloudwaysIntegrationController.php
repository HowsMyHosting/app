<?php

namespace App\Http\Controllers;

use App\Http\Resources\CloudwaysServerResource;
use App\Services\CloudwaysApiService;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CloudwaysIntegrationController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => 'email|required',
            'api_key' => 'required',
        ]);

        try {
            CloudwaysApiService::createConnection(
                email: $validated['email'],
                apiKey: $validated['api_key'],
            );
        } catch (ClientException $e) {
            Log::error($e->getResponse()->getBody()->getContents());

            return toastResponse(
                redirect: back(),
                type: 'error',
                message: __('general.failed'),
                description: __('cloudways.connection.failed'),
            );
        }

        if (! $request->user()->finished_initial_setup) {
            $request->user()->update([
                'initial_setup_step' => 2,
            ]);
        }

        return toastResponse(
            redirect: back(),
            message: __('general.success'),
            description: __('cloudways.connection.success'),
        );
    }

    public function refreshServersList(): JsonResponse
    {
        if (! user()->hasCloudwaysIntegration()) {
            return response()->json(['cloudwaysServers' => []]);
        }

        $cloudwaysIntegration = user()->cloudwaysIntegration;

        if (
            $cloudwaysIntegration->hasServersResponse() &&
            ! $cloudwaysIntegration->serversResponse->refreshServersTimeoutExpired()
        ) {
            return response()->json([
                'message' => __('general.failed'),
                'description' => __('cloudways.refreshTimeout'),
            ], 409);
        }

        $cloudwaysServers = (new CloudwaysApiService($cloudwaysIntegration))
            ->getServers(type: 'refresh');

        return response()->json([
            'cloudwaysServers' => CloudwaysServerResource::collection($cloudwaysServers),
        ]);
    }
}
