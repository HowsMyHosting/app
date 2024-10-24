<?php

namespace App\Http\Controllers;

use App\Http\Resources\CloudwaysServerResource;
use App\Http\Resources\LocalCloudwaysAppResource;
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
            'cloudwaysApps' => $cloudwaysIntegration
                ? LocalCloudwaysAppResource::collection($cloudwaysIntegration->apps->sortBy('label'))
                : [],
            'existingAppIds' => $cloudwaysIntegration ? $cloudwaysIntegration->apps->pluck('app_id')->toArray() : [],
        ]);
    }
}
