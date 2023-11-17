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
                'rating' => 5,
                'comment' => 'This was a great event!',
                'user_id' => 2,
                'event_id' => 4,
            ],
            [
                'rating' => 4,
                'comment' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at risus vitae diam feugiat vestibulum. Vestibulum a magna mollis, ultricies metus in, maximus nulla. Suspendisse a quam sollicitudin, pulvinar odio id, varius massa. Duis ultrices velit vitae iaculis vehicula. Etiam quis aliquet turpis. Vivamus fermentum consectetur lectus vel fringilla. Duis eleifend molestie dui, a dapibus quam mattis non. Sed neque mi, faucibus sit amet imperdiet at, scelerisque sed eros. Donec suscipit augue ut felis condimentum placerat. Fusce a leo id elit interdum posuere eget ut ipsum. Sed scelerisque nisi a lacus vehicula, vitae tempus ex interdum. Phasellus sollicitudin tempor convallis. Etiam facilisis elit a efficitur facilisis. Proin ac vulputate ligula.',
                'user_id' => 3,
                'event_id' => 4,
            ]
        ];

        DB::table('reviews')->insert($data);
    }
}
