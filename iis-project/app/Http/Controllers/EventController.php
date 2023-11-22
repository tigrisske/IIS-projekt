<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventUser;
use App\Models\Ticket;
use App\Models\Location;
use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use App\Models\User;
use App\Models\Review;
use Illuminate\Support\Facades\Validator;


use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 9); // Number of events per page, default is 9
        $page = $request->input('page', 1); // Current page, default is 1

        $events = Event::join('locations', 'events.location_id', '=', 'locations.id')
            ->select('events.*', 'locations.name as location_name')
            ->where('events.end_date', '>=', now()) 
            ->whereNotNull('events.confirmed_by') 
            ->orderBy('events.start_date', 'asc')
            ->paginate($perPage, ['*'], 'page', $page);
    
        return response()->json($events);
    }

    public function index_finished(Request $request)
    {
        $perPage = $request->input('perPage', 4);
        $page = $request->input('page', 1);

        $events = Event::join('locations', 'events.location_id', '=', 'locations.id')
            ->select('events.*', 'locations.name as location_name')
            ->where('events.end_date', '<', now())
            ->whereNotNull('events.confirmed_by') 
            ->orderBy('events.end_date', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($events);
    }



    public function index_created_events(Request $request)
    {
        $perPage = $request->input('perPage', 3);
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
            'created_by' => $user->id,
            'pay_in_advance' => $data['pay_in_advance'],
        ]);

        //destructure ticket_data
        $ticket_data = $data['ticket_data'];

        $tickets_total = 0;
        //sum of ticket amounts
        for ($i = 0; $i < count($ticket_data); $i++) {
            $tickets_total += $ticket_data[$i]['amount'];
        }

        if ($tickets_total > $event->capacity) {
            return response()->json(['message' => 'Total amount of tickets is greater than event capacity.'], 401);
        }
        

        
        //now we create tickets in db
        for ($i = 0; $i < count($ticket_data); $i++) {
            $ticket = Ticket::create([
                'title' => $ticket_data[$i]['name'],
                'price' => $ticket_data[$i]['price'],
                'amount' => $ticket_data[$i]['amount'],
                'event_id' => $event->id,
            ]);
        }



        //debug
        $count = count($ticket_data);




        return response()->json(['message' => 'Event created and logged in', 'num of tickets' => $count, 200]);
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

    public function get_users($id)
    {
        $event = Event::find($id);
    
        // Get the user IDs that joined the event and are not confirmed
        $userIds = EventUser::where('event_id', $event->id)
                            ->where('pay_in_advance_confirmed',false)
                            ->pluck('user_id');
    
        // Get the actual user records from the users table based on user IDs
        $users = User::whereIn('id', $userIds)->get();
    
        return response()->json(['users' => $users], 200);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Event $event, $id)
    {
        $event = Event::find($id);
        //get the location name based od event->location_id
        $location = Location::find($event->location_id);

        //if a authenticated user wants to display event, we check whether he has alraedy joined the event
        $tickets = Ticket::where('event_id', $event->id)->get();
        if (Auth::check()) {
            $user = Auth::user();
            $has_joined = EventUser::where('user_id', $user->id)->where('event_id', $event->id)->exists();
            return response()->json([
                'event' => $event,
                'has_joined' => $has_joined,
                'location' => $location,
                'tickets' => $tickets,
            ], 200);
        }

        return response()->json(['event' => $event, 'has_joint' => false, 'location' => $location, 'tickets' => $tickets], 200);
    }

    public function joinEvent(Event $event, $eventId, $ticketId)
    {
        $user = Auth::user();
        $event = Event::find($eventId);

        //cannot join if already joined
        if (EventUser::where('user_id', $user->id)->where('event_id', $event->id)->exists()) {
            return response()->json(['message' => 'User has already joined this event.'], 401);
        }

        //cannot join if full
        if ($event->joined_count >= $event->capacity) {
            return response()->json(['message' => 'Event is full.'], 401);
        }
        //when the event is does not need a payment in advance, we can join the event
        if (!$event->pay_in_advance) {
            $eventuser = EventUser::create([
            'user_id' => $user->id,
            'event_id' => $event->id,
            'pay_in_advance_confirmed' => true,
            'ticket_id' => $ticketId,
            ]);
            $event->increment('joined_count', 1);
            $ticket = Ticket::find($ticketId);
            if($ticket->amount == 0){
                return response()->json(['message' => 'No more tickets available.'], 401);
            }
            $ticket->decrement('amount');
            return response()->json(['message' => 'User joined event.'], 200);
        }
        //when the event needs a payment in advance, we need to send a request to join the event
        else {
            $eventuser = EventUser::create([
                'user_id' => $user->id,
                'event_id' => $event->id,
                'pay_in_advance_confirmed' => false,
                'ticket_id' => $ticketId,
            ]);
            $event->increment('joined_count', 1);
            //we decrement the amount of available tickets as the user declared he paid for the ticket
            $ticket = Ticket::find($ticketId);
            $ticket->decrement('amount');
            return response()->json(['message' => 'Join request sent succesfully! You will join event after you payment was verfied.'], 200);
        }

        // return response()->json(['message' => 'Join request sent succesfully! You will join event after you payment was verfied.'], 200);
    }

    public function approveUser(Event $event, $eventId, $userId)
    {
        $event = Event::find($eventId);
        if(!$event){
            return response()->json(['message' => 'Event not found.'], 401);
        }
        $user_event_row= EventUser::where('user_id', $userId)->where('event_id', $eventId)->first();
        if(!$user_event_row){
            return response()->json(['message' => 'User not found.'], 401);
        }
        $user_event_row->pay_in_advance_confirmed = true;
        $user_event_row-> save();
        return response()->json(['message' => 'User approved.'], 200);
    }

    public function approveAllUsers(Event $event, $eventId){
        $event = Event::find($eventId);
        if(!$event){
            return response()->json(['message' => 'Event not found.'], 401);
        }
        $user_event_rows= EventUser::where('event_id', $eventId)->get();
        if(!$user_event_rows){
            return response()->json(['message' => 'Users not found.'], 401);
        }
        EventUser::where('event_id', $eventId)->update(['pay_in_dvance_confirmed' => true]);
        return response()->json(['message' => 'All users approved.'], 200);
    }

    public function declineUser(Event $event, $eventId, $userId)
    {
        $event = Event::find($eventId);
        if(!$event){
            return response()->json(['message' => 'Event not found.'], 401);
        }
        $user_event_row= EventUser::where('user_id', $userId)->where('event_id', $eventId)->first();
        if(!$user_event_row){
            return response()->json(['message' => 'User not found.'], 401);
        }
        $event->decrement('joined_count', 1);
        //we increment the amount of tickets back, as the user got rejected 
        $ticketId = $user_event_row->ticket_id;
        $ticket = Ticket::find($ticketId);
        $ticket->increment('amount');

        //delete this row from db
        $user_event_row->delete();
        // $user_event_row-> save();
        return response()->json(['message' => 'User declined.'], 200);
    }

    /*
     * Confirm event, get event id from post
     */
    public function confirmEvent(Event $event, $eventId)
    {
        $event = Event::find($eventId);
        if(!$event){
            return response()->json(['message' => 'Event not found.'], 401);
        }
        $event->confirmed_by = Auth::user()->id;
        $event->save();
        return response()->json(['message' => 'Event confirmed.'], 200);
    }

    public function getReviews($eventId)
    {
        $perPage = 12; // Number of reviews per page
        $currentPage = request()->query('page', 1); // Get the current page from the query parameter, default to 1 if not provided

        // Find the event by its ID
        $event = Event::findOrFail($eventId);

        // Get all reviews associated with this event
        $reviews = $event->reviews()
            ->with([
                'user' => function ($query) {
                    $query->select('id', 'first_name', 'last_name');
                }
            ])
            ->paginate($perPage, ['*'], 'page', $currentPage); // Paginate reviews based on the current page


        return response()->json($reviews, 200);
    }

    public function createReview($eventId, Request $request)
    {
        $requestData = $request->all();
        $requestData['event_id'] = $eventId;
        $requestData['user_id'] = Auth::user()->id;

        // Validate the request data
        $validatedData = Validator::make($requestData, [
            'user_id' => 'required|exists:users,id',
            'event_id' => 'required|exists:events,id',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string',
        ])->validate();

        // Find the event by its ID
        $event = Event::findOrFail($eventId);

        // Create a new review associated with this event
        $review = new Review($validatedData);

        // Associate the review with the event
        $event->reviews()->save($review);

        // Return the newly created review
        return response()->json(['review' => $review]);
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
    public function destroy(Event $event, $eventId)
    {
        $event = Event::find($eventId);

        // Delete related rows in the EventUser table
        EventUser::where('event_id', $eventId)->delete();

        // Delete related rows in the tickets table
        Ticket::where('event_id', $eventId)->delete();

        // Delete the event from the events table
        Event::where('id', $eventId)->delete();
}

    public function getUnConfirmed()
    {
        $unconfirmed_events = Event::where('confirmed_by', null)->get();
        return response()->json([
            'events' => $unconfirmed_events,
        ], 200);
    }

}
