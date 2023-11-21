<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{

    public function createReview($eventId, Request $request)
    {
        $review = new Review();
        $review->rating = $request->rating;
        $review->comment = $request->comment;
        $review->event_id = $eventId;
        $review->user_id = auth()->id();
        $review->save();
    }
    /**
     * Display a listing of the resource.
     */
    public function index($eventId)
    {
        $perPage = 12; // Number of reviews per page
        $currentPage = request()->query('page', 1); // Get the current page from the query parameter, default to 1 if not provided

        $reviews = Review::where('event_id', $eventId)
            ->paginate($perPage, ['*'], 'page', $currentPage); // Paginate reviews based on the current page

        return response()->json(['reviews' => $reviews], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $review = new Review();
        $review->rating = $request->rating;
        $review->comment = $request->comment;
        $review->event_id = $request->event_id;
        $review->user_id = auth()->id();
        $review->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();
        return response()->json(['message' => 'Review deleted successfully'], 200);
    }
}
