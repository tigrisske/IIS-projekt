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

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($ticket) {
            if ($ticket->amount < 0) {
                throw new \Exception('Ticket amount cannot be less than zero.');
            }
        });
    }

    public function events()
    {
        return $this->belongsToMany(Event::class, 'event_ticket_pivot');
    }
}

