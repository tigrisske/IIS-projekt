<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                "first_name" => "John",
                "last_name" => "Doe",
                "email" => "john@admin.com",
                "password" => bcrypt("test123."),
                "role" => "admin",
            ],
            [
                "first_name" => "Jozef",
                "last_name"=> "Mak",
                "email"=> "jozef@member.com",
                "password"=> bcrypt("test123."),
                "role"=> "member",
            ],
            [
                "first_name"=> "Karol",
                "last_name"=> "Gazdik",
                "email"=> "karol@mod.com",
                "password"=> bcrypt("test123."),
                "role"=> "moderator",
            ],
            [
                "first_name"=> "Robert",
                "last_name"=> "Member",
                "email"=> "robert@member.com",
                "password"=> bcrypt("test123."),
                "role"=> "member",
            ],
            [
                "first_name"=> "David",
                "last_name"=> "Member",
                "email"=> "david@member.com",
                "password"=> bcrypt("test123."),
                "role"=> "moderator",
            ]

        ];

        DB::table('users')->insert($users);
    }
}
