<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title' => 'VIP',
                'price' => 100,
                'description' => 'VIP ticket',
                'event_id' => 1,
                'amount' => 5000,
            ],
            [
                'title' => 'Regular',
                'price' => 50,
                'description' => 'Regular ticket',
                'event_id' => 1,
                'amount' => 15000,
            ],
            [
                'title' => 'VIP',
                'price' => 100,
                'description' => 'VIP ticket',
                'event_id' => 2,
                'amount' => 15000
            ],
            [
                'title' => 'Regular',
                'price' => 50,
                'description' => 'Regular ticket',
                'event_id' => 2,
                'amount' => 5000,
            ],
            [
                'title' => 'VIP',
                'price' => 100,
                'description' => 'VIP ticket',
                'event_id' => 3,
                'amount' => '1000',
            ],
            [
                'title' => 'Regular',
                'price' => 50,
                'description' => 'Regular ticket',
                'event_id' => 3,
                'amount' => 4000,
            ],
            [
                'title' => 'Free',
                'price' => 50,
                'description' => 'Regular ticket',
                'event_id' => 4,
                'amount' => 150,
            ],
            [
                'title' => 'VIP',
                'price' => 100,
                'description' => 'VIP ticket',
                'event_id' => 5,
                'amount' => '1000',
            ],
            [
                'title' => '1-Day',
                'price' => 50,
                'description' => 'Regular ticket',
                'event_id' => 5,
                'amount' => 9000,
            ],
            [
                'title' => '3-Day',
                'price' => 100,
                'description' => 'VIP ticket',
                'event_id' => 5,
                'amount' => 20000,
            ],
        ];

        DB::table('tickets')->insert($data);

    }
}
