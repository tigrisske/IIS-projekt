<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'price',
        'amount',
        'event_id',
    ];

    public function events()
    {
        return $this->belongsToMany(Event::class, 'event_ticket_pivot');
    }
}
