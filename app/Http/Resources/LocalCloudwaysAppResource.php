<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LocalCloudwaysAppResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'app_id' => $this->app_id,
            'label' => $this->label,
            'status' => $this->status,
            'has_email_report' => $this->emailReport()->exists(),
            'has_reporting_data' => $this->reportingData()->exists(),
        ];
    }
}
