<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LocationRequest;

class LocationController extends Controller
{
    public function getAllLocations()
    {
        //only confirmed locations
        $locations = Location::where('confirmed_by', '!=', null)->orderBy('name')->get();
        // $locations = Location::orderBy('name')->get();

        return response()->json($locations);
    }

    /**
     * Display a listing of the resource.
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

    public function getUnconfirmed()
    {
        $locations = Location::where('confirmed_by', null)->orderBy('name')->get();

        return response()->json($locations);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(LocationRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        $location = Location::create([
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

    public function confirmLocation(Location $location, $locationId)
    {
        $location = Location::find($locationId);
        if(!$location){
            return response()->json(['message' => 'Location not found.'], 401);
        }
        $location->confirmed_by = Auth::user()->id;
        $location->save();
        return response()->json(['message' => 'Location confirmed.'], 200);
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
    public function show(Location $location)
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

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Location $location)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location, $locationId)
    {
        $location = Location::find($locationId);

        Location::where('id', $locationId)->delete();
    }
}
