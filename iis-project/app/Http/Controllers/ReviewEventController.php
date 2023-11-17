<?php

namespace App\Http\Controllers;

use App\Models\Review;

class ReviewEventController extends Controller
{
    public function getReviews($eventId)
    {
        $perPage = 12; // Number of reviews per page
        $currentPage = request()->query('page', 1); // Get the current page from the query parameter, default to 1 if not provided

        $reviews = Review::where('event_id', $eventId)
            ->paginate($perPage, ['*'], 'page', $currentPage); // Paginate reviews based on the current page
        
        return response()->json(['reviews' => $reviews], 200);
    }
}
