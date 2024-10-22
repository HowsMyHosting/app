<?php

namespace App\Http\Controllers;

use App\Models\CloudwaysApp;
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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'bulkRecipients' => ['required', 'array'],
            'bulkRecipients.*.cloudwaysAppUuid' => ['required', 'string'],
            'bulkRecipients.*.recipients' => ['required', 'array'],
            'bulkRecipients.*.recipients.*' => ['required', 'email'],
            'subject' => 'required|string',
            'intro' => 'nullable|string',
            'signature' => 'nullable|string',
            'cloudwaysApps' => ['required', 'array'],
            'cloudwaysApps.*' => ['required', 'uuid'],
        ]);

        $cloudwaysApps = $request->user()
            ->cloudwaysApps()
            ->whereIn('uuid', $validated['cloudwaysApps'])
            ->get();

        foreach ($cloudwaysApps as $cloudwaysApp) {
            $subject = str_replace('[$appName]', $cloudwaysApp->label, $validated['subject']);
            $intro = str_replace('[$appName]', $cloudwaysApp->label, $validated['intro']);
            $signature = str_replace('[$appName]', $cloudwaysApp->label, $validated['signature']);

            // find the recipient by the cloudways app uuid
            $recipients = collect($validated['bulkRecipients'])
                ->firstWhere('cloudwaysAppUuid', $cloudwaysApp->uuid)['recipients'];

            $cloudwaysApp->emailReport()->create([
                'user_id' => $request->user()->id,
                'subject' => $subject,
                'recipients' => $recipients,
                'intro' => $intro,
                'signature' => $signature,
            ]);

            $cloudwaysApp->update([
                'status' => CloudwaysApp::CONNECTED,
            ]);
        }

        if (! $request->user()->finished_initial_setup) {
            $request->user()->update([
                'finished_initial_setup' => true,
            ]);
        }

        return toastResponse(
            redirect: route('dashboard'),
            message: __('general.success'),
            description: __('general.updated', ['resource' => 'Email Reports']),
        );
    }
}
