<?php

namespace App\Http\Controllers;

use App\Models\CloudwaysApp;
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

        $reportingDataIds = ReportingData::whereIn('name', $validated['reportingData'])->pluck('id')->toArray();

        $cloudwaysApp->reportingData()->syncWithoutDetaching($reportingDataIds);

        return toastResponse(
            redirect: route('cloudwaysApp.show', $cloudwaysApp),
            message: __('general.success'),
            description: __('general.updated', ['resource' => $this->resourceName]),
        );
    }
}
