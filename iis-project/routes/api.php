<?php

use App\Http\Controllers\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TicketController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['web'])->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/signin', [AuthController::class, 'register']);
    Route::post('/auth', [AuthController::class, 'auth']);

    Route::get('/events', [EventController::class, 'index']);
    Route::get('/myevents', [EventController::class, 'index2']);
    Route::get('/event/{id}', [EventController::class, 'show']);
    Route::get('/event/{id}/reviews', [EventController::class, 'getReviews']);
});

Route::middleware(['web', 'auth'])->group(function () {
    Route::post('/createevent', [EventController::class, 'create']);
    Route::post('/createlocation', [LocationController::class, 'create']);
    Route::post('/createcategory', [CategoryController::class, 'create']);

    Route::get('/event/{eventId}/users', [EventController::class, 'get_users']);
    Route::post('/event/{eventId}/join/ticket/{ticketId}', [EventController::class, 'joinEvent']);

    Route::post('/event/{eventId}/approve/users', [EventController::class, 'approveAllUsers']);
    Route::post('/event/{eventId}/approve/user/{userId}', [EventController::class, 'approveUser']);
    Route::post('/event/{eventId}/decline/user/{userId}', [EventController::class, 'declineUser']);
    Route::post('/event/{eventId}/delete', [EventController::class, 'destroy']);

    Route::post('/event/{id}/has_joined', [EventController::class, 'has_joined']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/myupcomingevents', [UserController::class, 'getUpcomingEvents']);
    Route::get('/myevents', [EventController::class, 'index_created_events']);
    Route::post('/event/{id}/reviews', [EventController::class, 'createReview']);

    Route::get('/getalllocations', [LocationController::class, 'getAllLocations']);
    Route::get('/getallcategories', [CategoryController::class, 'getAllCategories']);

    Route::get('/locations', [LocationController::class, 'index']);
    Route::get('/categories', [CategoryController::class, 'index']);
});

Route::middleware(['web','auth', 'role:moderator'])->group(function () {

    Route::post('/update_category/{categoryId}', [CategoryController::class, 'update']);

    Route::delete('/review/{id}', [ReviewController::class,'destroy']);

    Route::get('/location/{locationId}', [LocationController::class, 'show']);
    Route::get('/category/{categoryId}', [CategoryController::class, 'show']);

    Route::delete('/event/{eventId}', [EventController::class, 'destroy']);
    Route::delete('/location/{locationId}', [LocationController::class, 'destroy']);
    Route::delete('/category/{categoryId}', [CategoryController::class, 'destroy']);

    Route::post('/confirm_event/{eventId}', [EventController::class, 'confirmEvent']);
    Route::post('/confirm_location/{locationId}', [LocationController::class, 'confirmLocation']);
    Route::post('/confirm_category/{categoryId}', [CategoryController::class, 'confirmCategory']);

    Route::get('/unconfirmed_events', [EventController::class, 'getUnConfirmed']);
    Route::get('/unconfirmed_categories', [CategoryController::class, 'getUnconfirmed']);
    Route::get('/unconfirmed_locations', [LocationController::class, 'getUnconfirmed']);

    Route::put('/location/{locationId}', [LocationController::class, 'update']);
});

Route::middleware(['web', 'auth', 'role:admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);
    Route::put('/user/{id}/update-role', [UserController::class, 'updateRole']);
    
});

Route::middleware('auth:sanctum')->get('/check-auth', function (Request $request) {
    return response()->json(['authenticated' => true]);
});

//TODO check whether user has a valid session
Route::post('/checksession', [AuthController::class, 'checkSession']);
