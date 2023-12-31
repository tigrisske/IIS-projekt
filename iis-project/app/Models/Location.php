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
        'address_line_2',
        'city', 
        'zip_code', 
        'country',
        'description',
        'created_by',
        'confirmed_by',
    ];

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
