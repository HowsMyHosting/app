<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CloudwaysServersResponse extends Model
{
    use HasFactory;

    /**
     * amount of time that needs to pass from last
     * updated_at before we try to fetch
     * some new cloudways servers.
     */
    public static int $fetchTimeout = 86400; // 24 hours

    /**
     * amount of time that needs to pass before
     * we can allow the user to do a manual
     * refresh of the cloudways servers.
     */
    public static int $refreshTimeout = 300; // 5 min


    // ----------------------------------- attributes

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'cloudways_integration_id',
        'servers',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'servers' => 'array',
        ];
    }

    // ----------------------------------- helpers

    /**
     * return if we're passed the fetch timeout so
     * that we can fetch new servers from the
     * cloudways api.
     */
    public function fetchServersTimeoutExpired(): bool
    {
        return Carbon::now()->greaterThan(
            $this->updated_at->addSeconds(static::$fetchTimeout)
        );
    }

    /**
     * return if we're passed the refresh timeout so
     * that we can manually refresh the server list
     * from the cloudways api.
     */
    public function refreshServersTimeoutExpired(): bool
    {
        return Carbon::now()->greaterThan(
            $this->updated_at->addSeconds(static::$refreshTimeout)
        );
    }
}
