<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocalCloudwaysAppResource;
use App\Models\CloudwaysApp;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CloudwaysAppController extends Controller
{
    public string $resourceName = 'Cloudways App';

    public function show(CloudwaysApp $cloudwaysApp): Response
    {
        return inertia('cloudwaysApp/show', [
            'cloudwaysApp' => (new LocalCloudwaysAppResource($cloudwaysApp))->resolve(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'label' => 'required|string',
            'id' => 'required|string',
        ]);

        $cloudwaysApp = CloudwaysApp::create([
            'cloudways_integration_id' => $request->user()->cloudwaysIntegration->id,
            'user_id' => $request->user()->id,
            'label' => $validated['label'],
            'app_id' => $validated['id'],
        ]);

        return toastResponse(
            redirect: route('cloudwaysApp.show', $cloudwaysApp),
            message: __('general.success'),
            description: __('general.created', ['resource' => $this->resourceName]),
        );
    }

    public function destroy(CloudwaysApp $cloudwaysApp): RedirectResponse
    {
        // TODO: create observer to delete any associated items/emails
        $cloudwaysApp->delete();

        return toastResponse(
            redirect: back(),
            message: __('general.success'),
            description: __('general.deleted', ['resource' => $this->resourceName]),
        );
    }
}
