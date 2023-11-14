<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $id = Auth::id();
        $user = User::find($id);
        return response()->json($user);
    }

    /**
     * Get the events that the user is registered for.
     */
    public function getUpcomingEvents(Request $request)
    {
        $id = Auth::id();
        $user = User::find($id);
        $events = $user->events->where('start_date', '>=', date('Y-m-d H:i:s'));
        return response()->json($events);
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10); // Number of events per page, default is 10
        $page = $request->input('page', 1); // Current page, default is 1

        $users = User::orderBy('last_name', 'asc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($users);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json(['user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

}
