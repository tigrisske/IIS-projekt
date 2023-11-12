<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB; // Import the DB facade
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'UFC 294',
                'start_date' => '2023-12-12',
                'end_date' => '2023-12-12',
                'capacity' => 20000,
                'description' => 'Some description',
                'category_id' => 1,
                'location_id' => 1,
                'is_confirmed' => 1,
            ],
            [
                'name' => 'UFC 298',
                'start_date' => '2023-12-12',
                'end_date' => '2023-12-12',
                'capacity' => 20000,
                'description' => 'Some description',
                'category_id' => 1,
                'location_id' => 1,
                'is_confirmed' => 1,
            ],
            [
                'name' => 'Octagon 35',
                'start_date' => '2023-12-12',
                'end_date' => '2023-12-13',
                'capacity' => 5000,
                'description' => 'Some description',
                'category_id' => 2,
                'location_id' => 2,
                'is_confirmed' => 1,
            ],
            [
                'name' => 'Volby do NR SR',
                'start_date' => '2023-12-12',
                'end_date' => '2023-12-13',
                'capacity' => 150,
                'description' => 'Some description',
                'category_id' => 1,
                'location_id' => 1,
                'is_confirmed' => 0,
            ],
            // Add more data entries as needed
        ];

        DB::table('events')->insert($data);
    }
}