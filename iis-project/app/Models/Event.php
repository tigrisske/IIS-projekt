<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'capacity',
        'description',
        'category_id',
        'location_id',
        'confirmed_by',
        'created_by',
        'pay_in_advance',
    ];


    /**
     * Get all possible ticket options for the event.
     */
    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'tickets');
    }

    /**
     * Get all of the event's reviews.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /*
     * Get the users registerdd for the event.
     */
    public function users()
    {
        return $this->hasMany(User::class, 'event_user');
    }

}
