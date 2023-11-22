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
                'confirmed_by' => 1,

            ],
            [
                'name' => 'Culture',
                'parent_id' => null,
                'created_by' => 1,
                'confirmed_by' => 1,
            ],
            [
                'name' => 'Entertainment',
                'parent_id' => null,
                'created_by' => 1,
                'confirmed_by' => 1,
            ],
            [
                'name' => 'Politics',
                'parent_id' => null,
                'created_by' => 1,
                'confirmed_by' => 1,
            ],
            [
                'name' => 'Football',
                'parent_id' => 1,
                'created_by' => 1,
                'confirmed_by' => 1,
            ],
            [
                'name' => 'BJJ',
                'parent_id' => 1,
                'created_by' => 1,
                'confirmed_by' => 1,
            ],
            [
                'name' => 'Hockey',
                'parent_id' => 1,
                'created_by' => 1,
                'confirmed_by' => 1,
            ],
            [
                'name' => 'NHL',
                'parent_id' => 7,
                'created_by' => 1,
                'confirmed_by' => 1,
            ],
            [
                'name' => 'Fighting',
                'parent_id' => 3,
                'created_by' => 1,
                'confirmed_by' => 1,
            ],
            [
                'name' => 'Elections',
                'parent_id' => 4,
                'created_by' => 1,
                'confirmed_by' => 1,
            ]
        ]);
    }
}