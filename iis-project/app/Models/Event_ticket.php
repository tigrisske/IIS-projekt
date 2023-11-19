<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event_ticket extends Model
{
    use HasFactory;
    protected $table = 'event_ticket';

    protected $fillable = [
        'event_id',
        'ticket_id',
    ];
}
