<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocalCloudwaysAppResource;
use App\Models\CloudwaysApp;
use Illuminate\Http\Request;

class EmailReportController extends Controller
{
    public string $resourceName = 'Email Report';

    public function store(Request $request, CloudwaysApp $cloudwaysApp)
    {
        $this->formatRecipients($request);

        $validated = $request->validate([
            'subject' => 'required|string',
            'recipients' => 'required|array',
            'recipients.*' => 'required|email',
            'intro' => 'nullable|string',
            'signature' => 'nullable|string',
        ]);

        $cloudwaysApp->emailReport()->create([
            'user_id' => $request->user()->id,
            'subject' => $validated['subject'],
            'recipients' => $validated['recipients'],
            'intro' => $validated['intro'],
            'signature' => $validated['signature'],
        ]);

        if (! $request->user()->finished_initial_setup) {
            $request->user()->update([
                'finished_initial_setup' => true,
            ]);
        }

        $cloudwaysApp->update([
            'status' => CloudwaysApp::CONNECTED,
        ]);

        return toastResponse(
            redirect: route('cloudways-app.show', $cloudwaysApp),
            message: __('general.success'),
            description: __('general.updated', ['resource' => $this->resourceName]),
        );
    }

    public function edit(CloudwaysApp $cloudwaysApp)
    {
        return inertia('email-report/edit', [
            'cloudwaysApp' => (new LocalCloudwaysAppResource($cloudwaysApp->load('emailReport')))->resolve(),
            'breadcrumbs' => [
                ['label' => 'Dashboard', 'href' => route('dashboard')],
                ['label' => $cloudwaysApp->label, 'href' => route('cloudways-app.show', $cloudwaysApp)],
                ['label' => 'Edit Email Report', 'href' => ''],
            ],
        ]);
    }

    public function update(Request $request, CloudwaysApp $cloudwaysApp)
    {
        $this->formatRecipients($request);

        $validated = $request->validate([
            'subject' => 'required|string',
            'recipients' => 'required|array',
            'recipients.*' => 'required|email',
            'intro' => 'nullable|string',
            'signature' => 'nullable|string',
        ]);

        $cloudwaysApp->emailReport->update([
            'subject' => $validated['subject'],
            'recipients' => $validated['recipients'],
            'intro' => $validated['intro'],
            'signature' => $validated['signature'],
        ]);

        return toastResponse(
            redirect: route('cloudways-app.show', $cloudwaysApp),
            message: __('general.success'),
            description: __('general.updated', ['resource' => $this->resourceName]),
        );
    }

    protected function formatRecipients(Request $request): void
    {
        // trim the whitespace too for each email
        $recipients = array_map('trim', explode(',', $request->recipients));

        // set the recipients on the request
        $request->merge(['recipients' => $recipients]);
    }
}
