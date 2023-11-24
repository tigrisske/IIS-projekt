<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;

class ReviewController extends Controller
{

    /**
     * Get a listing of reviews for a specific event with pagination.
     * 
     * In the get request, can be specified the number of current page.
     * 
     * @param int $eventId ID of the event
     * @return JsonResponse JSON response with the list of reviews
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
     * 
     * @param int $id ID of the review to delete
     * @return JsonResponse JSON response with the message of success or failure
     */
    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();
        return response()->json(['message' => 'Review deleted successfully'], 200);
    }
}
