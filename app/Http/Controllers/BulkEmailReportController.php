<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BulkEmailReportController extends Controller
{
    public function show(Request $request)
    {
        if (! $request->has('cloudwaysApps')) {
            return toastResponse(
                redirect: route('dashboard'),
                message: __('general.failed'),
                description: __('general.not_found', ['resource' => 'Cloudways Apps']),
            );
        }

        $cloudwaysApps = $request->user()
            ->cloudwaysApps()
            ->whereIn('id', explode(',', $request->cloudwaysApps))
            ->get();

        if ($cloudwaysApps->isEmpty()) {
            return toastResponse(
                redirect: route('dashboard'),
                message: __('general.failed'),
                description: __('general.not_found', ['resource' => 'Cloudways Apps']),
            );
        }

        return inertia('email-report/show-bulk', [
            'cloudwaysApps' => $cloudwaysApps,
            'breadcrumbs' => [
                ['label' => 'Dashboard', 'href' => route('dashboard')],
                ['label' => 'Edit Email Report'],
            ],
        ]);
    }

    // TODO: implement store method
}
