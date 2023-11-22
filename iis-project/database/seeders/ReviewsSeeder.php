<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'rating' => 1,
                'comment' => 'Nedopadlo to dobre :(',
                'user_id' => 2,
                'event_id' => 4,
            ],
            [
                'rating' => 4,
                'comment' => 'Uzasny event! Som prvovolic a velmi som si uzil tuto udalost v nasom hlavnom meste Bratislava okres Bratislava 3. ',
                'user_id' => 5,
                'event_id' => 4,
            ],
            [
                'rating' => 5,
                'comment' => 'Volby boli velmi pekne organizovane, vseto prebehlo rychlo a bez problemov.',
                'user_id' => 3,
                'event_id' => 4,
            ]
        ];

        DB::table('reviews')->insert($data);
    }
}
