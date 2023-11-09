<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $data = $request;//->validated();
        $event = Event::create([
            'name' => $data['name'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'], 
            'capacity' => $data['capacity'], 
            'description' => $data['description'], 
            'category_id' => $data['category_id'], 
            'location_id' => $data['location_id'], 
            'is_confirmed' => $data['is_confirmed'], 
        ]);


        return response()->json(['message' => 'Event created and logged in']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }
    public function get_num_events()
    {
        $count = Event::where('is_confirmed', 1)->count();
        return response()->json(['count' => $count]);
    }


    /**
     * Display the specified resource.
     */
    public function show(Event $event, $page = 1)
{
    $events = Event::where('is_confirmed', 1)
        ->skip(((int)$page - 1) * 4)
        ->take(4)
        ->get();

    return response()->json(['events' => $events]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }

    public function getUnConfirmed()
    {
        $unconfirmed_events = Event::where('is_confirmed', false)->get();
        return response()->json([
            'events' => $unconfirmed_events,
        ], 200);
    }

}
