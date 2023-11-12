<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 1); // Number of events per page, default is 9
        $page = $request->input('page', 1); // Current page, default is 1

        $events = Event::paginate($perPage, ['*'], 'page', $page);

        return response()->json($events);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $data = $request; //->validated();
        $event = Event::create([
            'name' => $data['name'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'capacity' => $data['capacity'],
            'description' => $data['description'],
            'category_id' => $data['category_id'],
            'location_id' => $data['location_id'],
            'is_confirmed' => 0
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
    public function show(Event $event)
    {
        return response()->json([
            'event' => $event,
        ], 200);
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
