<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use \Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * Get the events that the user is registered for.
     * 
     * @param Request $request Request object
     * @return JsonResponse JSON response with the list of events
     */
    public function getUpcomingEvents(Request $request)
    {
        $id = Auth::id();
        $user = User::find($id);
        $events = $user->events->where('start_date', '>=', date('Y-m-d H:i:s'));
        return response()->json($events);
    }


    /**
     * Get a listing of users with pagination.
     * 
     * In the get request, can be specified the number of events per page and the current page.
     * 
     * @param Request $request Request object
     * @return JsonResponse JSON response with the list of users
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
     * Update the role of a user.
     * 
     * @param Request $request Request object
     * @param int $id ID of the user
     * @return JsonResponse JSON response with a message indicating success or failure
     */
    public function updateRole(Request $request, $id)
    {
        $user = User::findOrFail($id); // Fetch the user by ID

        // Update the user's role attribute based on the request
        $user->role = $request->input('role');
        $user->save();

        // Optionally, return a response indicating success or failure
        return response()->json(['message' => 'User role updated successfully']);
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
     * 
     * @param int $userId ID of the user
     */
    public function show($userId)
    {
        $user = User::find($userId);
        return response()->json($user);
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
     * 
     * @param int $id ID of the user
     * @return JsonResponse JSON response with a message indicating success or failure
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

}
