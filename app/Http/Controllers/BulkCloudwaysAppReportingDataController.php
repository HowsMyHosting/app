<?php

namespace App\Http\Controllers;

use App\Models\CloudwaysApp;
use App\Models\Integration;
use App\Models\ReportingData;
use Illuminate\Http\Request;

class BulkCloudwaysAppReportingDataController extends Controller
{
    public string $resourceName = 'Reporting data';

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

        $reportingData = Integration::where('name', Integration::CLOUDWAYS)
            ->first()
            ->reportingData()
            ->pluck('name')
            ->toArray();

        return inertia('choose-reporting-data/show-bulk', [
            'cloudwaysApps' => $cloudwaysApps,
            'reportingData' => $reportingData,
            'breadcrumbs' => [
                ['label' => 'Dashboard', 'href' => route('dashboard')],
                ['label' => 'Choose Reporting Data'],
            ],
        ]);
    }

    public function store(Request $request, CloudwaysApp $cloudwaysApp)
    {
        $validated = $request->validate([
            'reportingData' => 'required|array',
            'cloudwaysApps' => 'required|array',
        ]);

        $reportingDataIds = ReportingData::whereIn('name', $validated['reportingData'])->pluck('id')->toArray();
        $cloudwaysApps = $request->user()->cloudwaysApps()->whereIn('uuid', $validated['cloudwaysApps'])->get();

        foreach ($cloudwaysApps as $cloudwaysApp) {
            $cloudwaysApp->reportingData()->syncWithoutDetaching($reportingDataIds);
        }

        return toastResponse(
            redirect: route('cloudwaysApp.show', $cloudwaysApp),
            message: __('general.success'),
            description: __('general.updated', ['resource' => $this->resourceName]),
        );
    }
}
