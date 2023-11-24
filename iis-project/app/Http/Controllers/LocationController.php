<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LocationRequest;
use \Illuminate\Http\JsonResponse;

class LocationController extends Controller
{
    /**
     * Get a listing of confirmed locations with pagination.
     * 
     * In the get request, can be specified the number of events per page and the current page.
     *
     * @param Request $request Request object
     * @return JsonResponse JSON response with the list of locations
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10); // Number of events per page, default is 10
        $page = $request->input('page', 1); // Current page, default is 1

        $locations = Location::orderBy('name', 'asc')
            ->where('confirmed_by', '!=', null)
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($locations);
    }

    /**
     * Get all the confirmed locations, without pagination.
     * 
     * @return JsonResponse JSON response with the list of locations
     */
    public function getAllLocations()
    {
        //only confirmed locations
        $locations = Location::where('confirmed_by', '!=', null)->orderBy('name')->get();
        // $locations = Location::orderBy('name')->get();

        return response()->json($locations);
    }

    /**
     * Get all the unconfirmed locations, without pagination.
     * 
     * @return JsonResponse JSON response with the list of locations
     */
    public function getUnconfirmed()
    {
        $locations = Location::where('confirmed_by', null)->orderBy('name')->get();

        return response()->json($locations);
    }

    /**
     * Create a new location.
     * 
     * @param LocationRequest $request Request object
     * @return JsonResponse Message of success or failure
     */
    public function create(LocationRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        Location::create([
            'name' => $data['name'],
            'address_line_1' => $data['address_line_1'],
            'city' => $data['city'],
            'zip_code' => $data['zip_code'],
            'country' => $data['country'],
            'description' => $data['description'],
            'created_by' => $user->id
        ]);


        return response()->json(['message' => 'Location created and logged in']);
    }

    /**
     * Confirm a location.
     * 
     * @param int $locationId ID of the location
     * @return JsonResponse Message of success or failure
     */
    public function confirmLocation($locationId)
    {
        $location = Location::find($locationId);
        if (!$location) {
            return response()->json(['message' => 'Location not found.'], 401);
        }
        $location->confirmed_by = Auth::user()->id;
        $location->save();
        return response()->json(['message' => 'Location confirmed.'], 200);
    }

    /**
     * Get the specified resource.
     * 
     * @param int $userId ID of the location to get
     * @return JsonResponse JSON response with the location data
     */
    public function show($userId)
    {
        $location = Location::find($userId);
        return response()->json($location);
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param LocationRequest $request Request object
     * @param int $locationId ID of the location to update
     * @return JsonResponse Message of success or failure
     */
    public function update(Request $request, $locationId)
    {
        $location = Location::find($locationId);

        $location->update($request->all());

        return response()->json(['message' => 'Location updated successfully', 'location' => $location]);
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param int $locationId ID of the location to delete
     */
    public function destroy($locationId)
    {
        Location::where('id', $locationId)->delete();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Location $location)
    {
        //
    }


}
