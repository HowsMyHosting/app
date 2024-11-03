<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocalCloudwaysAppResource;
use App\Models\CloudwaysApp;
use App\Models\Integration;
use App\Models\ReportingData;
use Illuminate\Http\Request;

class CloudwaysAppReportingDataController extends Controller
{
    public string $resourceName = 'Reporting data';

    public function store(Request $request, CloudwaysApp $cloudwaysApp)
    {
        $validated = $request->validate([
            'reportingData' => 'required|array',
        ]);

        $this->attachReportingData($cloudwaysApp, $validated['reportingData']);

        return toastResponse(
            redirect: route('cloudways-app.show', $cloudwaysApp),
            message: __('general.success'),
            description: __('general.updated', ['resource' => $this->resourceName]),
        );
    }

    public function edit(CloudwaysApp $cloudwaysApp)
    {
        $reportingData = Integration::where('name', Integration::CLOUDWAYS)
            ->first()
            ->reportingData()
            ->pluck('name')
            ->toArray();

        return inertia('reporting-data/edit', [
            'cloudwaysApp' => (new LocalCloudwaysAppResource($cloudwaysApp->load('reportingData')))->resolve(),
            'reportingData' => $reportingData,
            'breadcrumbs' => [
                ['label' => 'Dashboard', 'href' => route('dashboard')],
                ['label' => $cloudwaysApp->label, 'href' => route('cloudways-app.show', $cloudwaysApp)],
                ['label' => 'Edit Reporting Data', 'href' => ''],
            ],
        ]);
    }

    public function update(Request $request, CloudwaysApp $cloudwaysApp)
    {
        $validated = $request->validate([
            'reportingData' => 'required|array',
        ]);

        $cloudwaysApp->reportingData()->detach();

        $this->attachReportingData($cloudwaysApp, $validated['reportingData']);

        return toastResponse(
            redirect: route('cloudways-app.show', $cloudwaysApp),
            message: __('general.success'),
            description: __('general.updated', ['resource' => $this->resourceName]),
        );
    }

    protected function attachReportingData(CloudwaysApp $cloudwaysApp, array $reportingData)
    {
        $reportingDataIds = ReportingData::whereIn('name', $reportingData)->pluck('id')->toArray();

        $cloudwaysApp->reportingData()->syncWithoutDetaching($reportingDataIds);
    }
}
