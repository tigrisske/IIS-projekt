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
                'description' => 'Welcome to "Collision Chaos" at The Thunderdome,
                where the anticipation is as electric as the arena itself,
                pulsating with the excitement of a night filled with seismic clashes.
                The main event sees "Thunder" Tyson OConnor, known for his explosive knockouts,
                go head-to-head with the elusive "Shadow" Sofia Rodriguez,
                a crafty fighter with a unique blend of skills, as they vie for the UFC Lightweight Championship
                in what promises to be an explosive showdown.',
                'category_id' => 1,
                'location_id' => 1,
                'confirmed_by' => null,
                // 'pay_in_advance' => 1,
            ],
            [
                'name' => 'Rytmus BENGORO 2 Krst',
                'start_date' => '2023-12-15 18:00:00',
                'end_date' => '2023-12-12 22:00:00',
                'capacity' => 20000,
                'description' => 'Damy a pani prichadza druhy diel slavneho albumu BENGORO od Rytmusa.',
                'category_id' => 1,
                'location_id' => 1,
                'confirmed_by' => 1,
                //'pay_in_advance' => 1,
            ],
            [
                'name' => 'Octagon 50: Paradaiser vs. Buchinger 2',
                'start_date' => '2023-12-09 17:00:00',
                'end_date' => '2023-12-09 23:00:00',
                'capacity' => 5000,
                'description' => '
                OKTAGON a jeho elitní fighteři se po 9 měsících vrací do Ostravy, nejtvrdšího města republiky, kde bojová krev místním koluje v žilách. Ti nejhlasitější fanoušci na světě dostanou 9. 12. 2023 hned 2 hvězdné titulové bitvy v jeden večer! 
                Legenda Ivana Buchingera znovu ožila. A chce zpět na trůn lehké váhy, na který usedl v roce 2021 výhrou nad Paradeiserem. Ten od té doby udělal velký kus práce, stal se 1 divize a věří, že tentokrát v titulové odvetě „Bukiho“ přejede.    
                Čas korunovat nového šampiona pérové váhy. Bývalý vládce lehké divize, fenomenální Keita, jde do boje s největším talentem OKTAGONu Samsonidsem, který se zdá být nedotknutelný. 
                Nádherná přestřelka postojářských šampionů o další posun v žebříčku pérové váhy se rozpoutá mezi objevem roku Lengálem a švédským a mezinárodní šampionem v thajském boxu Barkem. 
                A ani tentokrát nebudou chybět domácí borci – ostravští srdcaři Matěj Kuzník, Ondřej Raška a Jan Široký. Ten svede těžký souboj s mladým úkazem, neporaženou „Namibijskou noční můrou“ Nafukou, kterému je teprve 19 let. 
                To vše za doprovodu bohaté audiovizuální a světelné show. 
                Zažij 9.12. OKTAGON 50: Paradeiser vs. Buchinger 2 a to nejlepší evropské MMA na vlastní kůži. Lístky právě v prodeji.',
                'category_id' => 2,
                'location_id' => 2,
                'confirmed_by' => null,
            ],
            [
                'name' => 'Volby do NR SR',
                'start_date' => '2023-09-30 07:00:00',
                'end_date' => '2023-09-30 22:00:00',
                'capacity' => 99999999,
                'description' => 'Volebný zoznam do Národnej Rady Slovenskej republiky (NR SR)
                zahŕňa viacero politických strán a kandidátnych subjektov, ktoré sa uchádzajú o verejnú podporu.
                Volebné subjekty predstavujú rôzne politické a sociálne názory, od tradičných strán po nové
                iniciatívy a nezávislé osobnosti. Voliči budú mať možnosť vybrať z kandidátov rôznych strán a hnutí,
                ktorí reprezentujú ich hodnoty a očakávania. Voľby do NR SR sú kľúčovým momentom
                 pre formovanie politickej scény a rozhodujú o budúcej legislatívnej sile a smere krajiny.',
                'category_id' => 1,
                'location_id' => 1,
                'confirmed_by' => 1,
            ],
            [
                'name' => 'Seminar na FIT VUT',
                'start_date' => '2023-12-10 08:00:00',
                'end_date' => '2023-12-10 17:00:00',
                'capacity' => 300,
                'description' => 'Seminar na Fakulte Informačných Technológií Vysokého Učení Technického v Brně (FIT VUT) je vzdelávacou udalosťou,
                ktorá poskytne študentom a odborníkom platformu na zdieľanie vedomostí a skúseností z oblasti informačných technológií.
                Renomovaní prednášajúci z rôznych odvetví IT predstavia najnovšie trendy a vývoj v oblasti programovania, dizajnu a bezpečnosti.
                Účastníci budú mať príležitosť získať inšpiráciu a rozšíriť svoje znalosti v dynamickom prostredí akademickej excelencie.',
                'category_id' => 2,
                'location_id' => 4,
                'confirmed_by' => 2,
            ],
            [
                'name' => 'Koncert Lucie Bílé',
                'start_date' => '2023-11-15 19:30:00',
                'end_date' => '2023-11-15 22:00:00',
                'capacity' => 8000,
                // 'joined_count' => 7400,
                'description' => 'Úžasná hudobná noc naživo s jednou z najvýraznejších osobností českej hudby - Lucie Bílou!
                Pripojte sa k nám na nezabudnuteľnom koncerte, kde Lucie predvedie svoje najväčšie hity,
                od emotívnych balád po rytmické skladby, a urobí z tohto večera jedinečný hudobný zážitok.
                Ak chcete zažiť vášeň, energiu a krásu hudby Lucie Bílé, toto je udalosť, na ktorú nechcete zabudnúť!',
                'category_id' => 3,
                'location_id' => 2,
                'confirmed_by' => 1,
            ]
        ];

        DB::table('events')->insert($data);
    }
}