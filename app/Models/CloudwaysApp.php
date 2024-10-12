<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/** @mixin Builder */
class CloudwaysApp extends Model
{
    use HasFactory;

    public static function booted()
    {
        static::creating(function ($model) {
            $model->uuid = Str::uuid();
        });
    }

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

    public function reportingData()
    {
        return $this->belongsToMany(ReportingData::class)->withTimestamps();
    }
}
