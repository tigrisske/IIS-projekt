<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function tickets()
    {
        return $this->belongsToMany(Ticket::class, 'event_ticket');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /*
     * Get the users registerdd for the event.
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

}
