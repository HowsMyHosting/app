<?php

namespace App\Http\Controllers;

use App\Models\CloudwaysApp;
use Illuminate\Http\Request;

class EmailReportController extends Controller
{
    public string $resourceName = 'Email Report';

    public function store(Request $request, CloudwaysApp $cloudwaysApp)
    {
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
            redirect: route('cloudwaysApp.show', $cloudwaysApp),
            message: __('general.success'),
            description: __('general.updated', ['resource' => $this->resourceName]),
        );
    }
}
