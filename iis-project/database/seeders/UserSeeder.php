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
                "first_name" => "admin",
                "last_name" => "admin",
                "email" => "admin@admin.com",
                "password" => bcrypt("Heslo123!"),
                "role" => "admin",
            ],
            [
                "first_name" => "member",
                "last_name"=> "member",
                "email"=> "member@member.com",
                "password"=> bcrypt("Heslo123!"),
                "role"=> "member",
            ],
            [
                "first_name"=> "moderator",
                "last_name"=> "moderator",
                "email"=> "mod@mod.com",
                "password"=> bcrypt("Heslo123!"),
                "role"=> "moderator",
            ],
            [
                "first_name"=> "admin",
                "last_name"=> "admin",
                "email"=> "a@a",
                "password"=> bcrypt("test123."),
                "role"=> "moderator",
            ],
            [
                "first_name"=> "admin",
                "last_name"=> "admin",
                "email"=> "m@m",
                "password"=> bcrypt("test123."),
                "role"=> "moderator",
            ]

        ];

        DB::table('users')->insert($users);
    }
}
