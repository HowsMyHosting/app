<?php

namespace App\Models;

use App\Observers\CloudwaysAppObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/** @mixin Builder */
#[ObservedBy([CloudwaysAppObserver::class])]
class CloudwaysApp extends Model
{
    use HasFactory;

    // ----------------------------------- constants

    const PENDING = 'pending';

    const CONNECTED = 'connected';

    const DISCONNECTED = 'disconnected';

    // ----------------------------------- attributes

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'cloudways_integration_id',
        'app_id',
        'label',
        'status',
    ];

    // ----------------------------------- relationships

    public function reportingData()
    {
        return $this->belongsToMany(ReportingData::class)->withTimestamps();
    }

    public function emailReport(): HasOne
    {
        return $this->hasOne(EmailReport::class);
    }
}
