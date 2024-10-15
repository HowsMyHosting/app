<?php

namespace App\Http\Controllers;

use App\Http\Resources\CloudwaysServerResource;
use App\Http\Resources\LocalCloudwaysAppResource;
use App\Models\CloudwaysApp;
use App\Models\Integration;
use App\Services\CloudwaysApiService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CloudwaysAppController extends Controller
{
    public string $resourceName = 'Cloudways App';

    public function show(CloudwaysApp $cloudwaysApp): Response
    {
        $reportingData = Integration::where('name', Integration::CLOUDWAYS)
            ->first()
            ->reportingData()
            ->pluck('name')
            ->toArray();

        return inertia('cloudways-app/show', [
            'cloudwaysApp' => (new LocalCloudwaysAppResource($cloudwaysApp))->resolve(),
            'reportingData' => $reportingData,
            'breadcrumbs' => [
                ['label' => 'Dashboard', 'href' => route('dashboard')],
                ['label' => $cloudwaysApp->label, 'href' => ''],
            ],
        ]);
    }

    public function create(): Response
    {
        $cloudwaysIntegration = user()->cloudwaysIntegration;

        return inertia('cloudways-app/create', [
            'cloudwaysServers' => Inertia::lazy(function () use ($cloudwaysIntegration) {
                $cloudwaysServers = (new CloudwaysApiService($cloudwaysIntegration))
                    ->getServers(type: 'fetch');

                return CloudwaysServerResource::collection($cloudwaysServers);
            }),
            'existingAppIds' => $cloudwaysIntegration->apps->pluck('app_id')->toArray(),
            'breadcrumbs' => [
                ['label' => 'Dashboard', 'href' => route('dashboard')],
                ['label' => 'Add a Cloudways App', 'href' => ''],
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'apps' => 'required|array',
            'apps.*.label' => 'required|string',
            'apps.*.id' => 'required|string',
        ]);

        $cloudwaysApps = [];

        foreach ($validated['apps'] as $app) {
            $cloudwaysApps[] = CloudwaysApp::create([
                'cloudways_integration_id' => $request->user()->cloudwaysIntegration->id,
                'user_id' => $request->user()->id,
                'label' => $app['label'],
                'app_id' => $app['id'],
            ])->uuid;
        }

        // TODO: redirect to a bulk "choose reporting data" page instead
        return back();

        // return toastResponse(
        //     redirect: route('cloudwaysApp.show', $cloudwaysApp),
        //     message: __('general.success'),
        //     description: __('general.created', ['resource' => $this->resourceName]),
        // );
    }

    public function destroy(CloudwaysApp $cloudwaysApp): RedirectResponse
    {
        // observer will delete any associated items
        $cloudwaysApp->delete();

        return toastResponse(
            redirect: back(),
            message: __('general.success'),
            description: __('general.deleted', ['resource' => $this->resourceName]),
        );
    }
}
