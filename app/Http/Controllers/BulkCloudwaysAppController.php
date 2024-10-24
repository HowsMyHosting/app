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

        $cloudwaysAppIds = [];

        foreach ($validated['apps'] as $app) {
            $cloudwaysApp = CloudwaysApp::create([
                'cloudways_integration_id' => $request->user()->cloudwaysIntegration->id,
                'user_id' => $request->user()->id,
                'label' => $app['label'],
                'app_id' => $app['id'],
            ]);

            $cloudwaysAppIds[] = $cloudwaysApp->id;
        }

        /**
         * If there's only one app then continue the singular
         * app onboarding flow.
         */
        if (count($cloudwaysAppIds) === 1) {
            return toastResponse(
                redirect: route('cloudwaysApp.show', $cloudwaysApp->uuid),
                message: __('general.success'),
                description: __('general.added', ['resource' => 'Cloudways App']),
            );

        }

        return toastResponse(
            redirect: route('cloudwaysAppReportingData.create.bulk', ['cloudwaysApps' => implode(',', $cloudwaysAppIds)]),
            message: __('general.success'),
            description: __('general.added', ['resource' => 'Cloudways Apps']),
        );
    }

    public function destroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'cloudwaysApps' => 'required|array',
            'cloudwaysApps.*' => 'required|uuid',
        ]);

        foreach ($validated['cloudwaysApps'] as $cloudwaysAppUuid) {
            CloudwaysApp::where('uuid', $cloudwaysAppUuid)
                ->firstOrFail()
                ->delete();
        }

        return toastResponse(
            redirect: route('dashboard'),
            message: __('general.success'),
            description: __('general.removed', ['resource' => 'Cloudways Apps']),
        );
    }
}
