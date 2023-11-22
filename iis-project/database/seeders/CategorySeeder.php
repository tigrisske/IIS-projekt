<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB; // Import the DB facade
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Sport',
                'parent_id' => null,
                'created_by' => 1,

            ],
            [
                'name' => 'Futbalovy zapas',
                'parent_id' => 1,
                'created_by' => 1,
            ],
            [
                'name' => 'UFC zapas',
                'parent_id' => 1,
                'created_by' => 1,
            ],
            [
                'name' => 'Kultura',
                'parent_id' => null,
                'created_by' => 1,
            ],
            [
                'name' => 'Politika',
                'parent_id' => null,
                'created_by' => 1,
            ],
            [
                'name' => 'Hudba',
                'parent_id' => 4,
                'created_by' => 1,
            ]
        ]);
    }
}