<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB; // Import the DB facade
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'O2 Arena',
                'address_line_1' => 'Ocelářská 460/2',
                'city' => 'Praha',
                'zip_code' => '190 00',
                'country' => 'Česká republika',
                'description' => 'O2 Arena je multifunkční sportovní a kulturní aréna, která se nachází v Praze na Českomoravské ulici v Libni. Otevřena byla 27. března 2004. V roce 2008 byla O2 Arena vyhlášena nejlepší arénou světa.',
                'created_by' => 1,
                'confirmed_by' => 1,
            ],
            [
                'name' => 'Tipsport Arena',
                'address_line_1' => 'Za elektrárnou 419/1',
                'city' => 'Liberec',
                'zip_code' => '460 01',
                'country' => 'Česká republika',
                'description'=> 'Tipsport arena je víceúčelová hala v Liberci. V současnosti je využívána především pro hokejové zápasy, ale také pro koncerty a další kulturní akce. V roce 2009 byla hala přejmenována na Tipsport arena.',
                'created_by'=> 1,
                'confirmed_by'=> 1,
            ]
        ];

        DB::table('locations')->insert($data);
    }
}