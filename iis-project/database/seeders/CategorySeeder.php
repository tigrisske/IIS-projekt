<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB; // Import the DB facade
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Sport',
                'created_by' => 1,
                'confirmed_by' => 1,
            ],
            [
                'name'=> 'Kultura',
                'created_by'=> 1,
                'confirmed_by'=> 1,
            ]
            ];

        DB::table('categories')->insert($data);
    }
}