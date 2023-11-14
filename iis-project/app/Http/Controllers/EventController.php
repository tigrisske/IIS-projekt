<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventUser;
use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;

use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10); // Number of events per page, default is 10
        $page = $request->input('page', 1); // Current page, default is 1

        $events = Event::orderBy('end_date', 'asc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($events);
    }

    /**
     * Get the events that the are under user's management.
     */
    public function getUserEvents(Request $request)
    {
        $perPage = $request->input('perPage', 4);
        $page = $request->input('page', 1);

        $user = Auth::user(); // Get the logged-in user

        // If the user is authenticated, retrieve events created by the user
        if ($user) {
            $events = Event::where('created_by', $user->id)
                ->orderBy('end_date', 'asc')
                ->paginate($perPage, ['*'], 'page', $page);

            return response()->json($events);
        } else {
            // Handle the case where the user is not authenticated
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(EventRequest $request)
    {
        $data = $request->validated();
        $user = Auth::user();
        $event = Event::create([
            'name' => $data['name'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'capacity' => $data['capacity'],
            'description' => $data['description'],
            'category_id' => $data['category_id'],
            'location_id' => $data['location_id'],
            'is_confirmed' => 0,
            'created_by' => $user->id
        ]);


        return response()->json(['message' => 'Event created and logged in', 200]);
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
    public function show(Event $event, $id)
    {
        $event = Event::find($id);

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
