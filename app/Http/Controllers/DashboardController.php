<?php

namespace App\Http\Controllers;

use App\Http\Resources\CloudwaysServerResource;
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
        return inertia('dashboard/show', [
            'cloudwaysServers' => Inertia::lazy(function () use ($request) {
                if (!$request->user()->hasCloudwaysIntegration()) {
                    return [];
                }

                $cloudwaysIntegration = $request->user()->cloudwaysIntegration;

                $cloudwaysServers = (new CloudwaysApiService($cloudwaysIntegration))
                    ->getServers(type: 'fetch');

                return CloudwaysServerResource::collection($cloudwaysServers);
            }),
        ]);
    }
}
