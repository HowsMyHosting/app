<?php

namespace App\Observers;

use App\Models\CloudwaysApp;
use Illuminate\Support\Str;

class CloudwaysAppObserver
{
    public function creating(CloudwaysApp $cloudwaysApp): void
    {
        $cloudwaysApp->uuid = Str::uuid();
    }

    public function deleting(CloudwaysApp $cloudwaysApp): void
    {
        $cloudwaysApp->emailReport()->delete();
    }
}
