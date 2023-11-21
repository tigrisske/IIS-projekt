<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'address_line_1',
        'city', 
        'zip_code', 
        'country',
        'description',
        'created_by',
        'confirmed' 
    ];

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
