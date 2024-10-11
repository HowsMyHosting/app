<?php

namespace Database\Seeders;

use App\Models\Integration;
use App\Models\ReportingData;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'email' => 'miguejarias@gmail.com',
        ]);

        $integration = Integration::create([
            'name' => Integration::CLOUDWAYS,
        ]);

        $reportingData = [
            'Vulnerability scans',
            'Bot protection',
            'Malware protection',
            'Backup status',
        ];

        foreach ($reportingData as $reportingDataName) {
            ReportingData::create([
                'integration_id' => $integration->id,
                'name' => $reportingDataName,
            ]);
        }
    }
}
