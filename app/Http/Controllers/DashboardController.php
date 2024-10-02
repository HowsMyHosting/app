<?php

namespace App\Http\Controllers;

use App\Http\Resources\CloudwaysServerResource;
use App\Http\Resources\LocalCloudwaysAppResource;
use App\Models\CloudwaysApp;
use App\Services\CloudwaysApiService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $hasCloudwaysIntegration = false;
        $cloudwaysIntegration = null;

        if ($request->user()->hasCloudwaysIntegration()) {
            $hasCloudwaysIntegration = true;

            $cloudwaysIntegration = $request->user()->cloudwaysIntegration;
        }

        return inertia('dashboard/show', [
            'cloudwaysServers' => Inertia::lazy(function () use ($hasCloudwaysIntegration, $cloudwaysIntegration) {
                if (! $hasCloudwaysIntegration) {
                    return [];
                }

                $cloudwaysServers = (new CloudwaysApiService($cloudwaysIntegration))
                    ->getServers(type: 'fetch');

                return CloudwaysServerResource::collection($cloudwaysServers);
            }),
            'cloudwaysApps' => LocalCloudwaysAppResource::collection($cloudwaysIntegration->apps) ?? [],
            'existingAppIds' => CloudwaysApp::pluck('app_id')->toArray(),
        ]);
    }
}
