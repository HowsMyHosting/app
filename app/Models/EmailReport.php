<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmailReport extends Model
{
    use HasFactory;

    // ----------------------------------- attributes

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'cloudways_app_id',
        'recipients',
        'subject',
        'intro',
        'signature',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'recipients' => 'array',
        ];
    }

    // ----------------------------------- relationships

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cloudwaysApp(): BelongsTo
    {
        return $this->belongsTo(CloudwaysApp::class);
    }
}
