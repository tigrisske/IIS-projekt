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
        DB::table('locations')->insert([
            [
                'name' => 'O2 Arena',
                'address_line_1' => 'Ocelářská 460/2',
                'city' => 'Praha',
                'zip_code' => '190 00',
                'country' => 'Česká republika',
                'description' => 'O2 Arena je multifunkční sportovní a kulturní aréna, která se nachází v Praze na Českomoravské ulici v Libni. Otevřena byla 27. března 2004. V roce 2008 byla O2 Arena vyhlášena nejlepší arénou světa.',
                'capacity' => 20000,
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
                'capacity' => 7500,
                'created_by'=> 1,
                'confirmed_by'=> 1,
            ],
            [
                'name' => 'Letisko Trenčín',
                'address_line_1' => 'Legionárska',
                'city' => 'Trenčín',
                'zip_code' => '911 05',
                'country' => 'Slovensko',
                'description'=> 'Letisko Trenčín je známe ako miesto konania rôznych festivalov a podujatí. Okrem toho slúži aj ako športovisko pre rôzne letecké aktivity a prezentácie. Nachádza sa v krásnom prostredí pri rieke Váh a pravidelne privíta tisíce návštevníkov.',
                'capacity' => 40000,
                'created_by'=> 1,
                'confirmed_by'=> 1,
            ]
            ,
            [
                'name' => 'VUT FIT',
                'address_line_1' => 'Božetěchova 1/2',
                'city' => 'Brno',
                'zip_code' => '612 00',
                'country' => 'Česká republika',
                'description' => 'Fakulta informačních technologií Vysokého učení technického v Brně je jednou z předních institucí v oblasti informačních technologií ve střední Evropě. Nabízí široké spektrum studijních programů a moderních laboratoří.',
                'capacity' => 5000,
                'created_by' => 1,
                'confirmed_by' => 1,
            ],
        ]);
    }
}