<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReportingData extends Model
{
    use HasFactory;

    protected $table = 'reporting_datas';

    // ----------------------------------- attributes

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'integration_id',
        'name',
    ];

    // ----------------------------------- relations

    public function integration(): BelongsTo
    {
        return $this->belongsTo(Integration::class);
    }

    public function cloudwaysApps()
    {
        return $this->belongsToMany(CloudwaysApp::class)->withTimestamps();
    }
}
