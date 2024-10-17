<?php

namespace App\Http\Controllers;

use App\Models\CloudwaysApp;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BulkCloudwaysAppController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'apps' => 'required|array',
            'apps.*.label' => 'required|string',
            'apps.*.id' => 'required|string',
        ]);

        $cloudwaysApps = [];

        foreach ($validated['apps'] as $app) {
            $cloudwaysApp = CloudwaysApp::create([
                'cloudways_integration_id' => $request->user()->cloudwaysIntegration->id,
                'user_id' => $request->user()->id,
                'label' => $app['label'],
                'app_id' => $app['id'],
            ]);

            $cloudwaysApps[] = $cloudwaysApp->id;
        }

        if (count($cloudwaysApps) > 1) {
            return toastResponse(
                redirect: route('cloudwaysAppReportingData.show.bulk', ['cloudwaysApps' => implode(',', $cloudwaysApps)]),
                message: __('general.success'),
                description: __('general.added', ['resource' => 'Cloudways Apps']),
            );
        }

        return toastResponse(
            redirect: route('cloudwaysApp.show', $cloudwaysApp->uuid),
            message: __('general.success'),
            description: __('general.added', ['resource' => 'Cloudways App']),
        );
    }
}
