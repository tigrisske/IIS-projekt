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
                'start_date' => '2023-12-12 18:00:00',
                'end_date' => '2023-12-12 22:00:00',
                'capacity' => 20000,
                'description' => 'Some description',
                'category_id' => 1,
                'location_id' => 1,
                'is_confirmed' => 1,
            ],
            [
                'name' => 'UFC 298',
                'start_date' => '2023-12-15 18:00:00',
                'end_date' => '2023-12-12 22:00:00',
                'capacity' => 20000,
                'description' => 'Some description',
                'category_id' => 1,
                'location_id' => 1,
                'is_confirmed' => 1,
            ],
            [
                'name' => 'Octagon 35',
                'start_date' => '2023-12-03 18:00:00',
                'end_date' => '2023-12-03 22:00:00',
                'capacity' => 5000,
                'description' => 'Some description',
                'category_id' => 2,
                'location_id' => 2,
                'is_confirmed' => 1,
            ],
            [
                'name' => 'Volby do NR SR',
                'start_date' => '2023-09-30 08:00:00',
                'end_date' => '2023-09-30 20:00:00',
                'capacity' => 150,
                'description' => 'Some description',
                'category_id' => 1,
                'location_id' => 1,
                'is_confirmed' => 0,
            ],
            [
                'name' => 'Festival 2023',
                'start_date'=> '2023-07-23 12:00:00',
                'end_date' => '2023-07-25 22:00:00',
                'capacity' => 30000,
                'description' => 'Some description',
                'category_id' => 4,
                'location_id' => 3,
                'is_confirmed' => 0,
            ]
        ];

        DB::table('events')->insert($data);
    }
}