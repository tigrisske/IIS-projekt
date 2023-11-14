<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LocationRequest;

class LocationController extends Controller
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
    public function create(LocationRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        $event = Location::create([
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
    public function destroy(Location $location)
    {
        //
    }
}
