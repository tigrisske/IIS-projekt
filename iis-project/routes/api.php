<?php

use App\Http\Controllers\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;


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
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/auth', [AuthController::class, 'auth']);
    Route::post('/unconfirmed_events', [EventController::class, 'getUnConfirmed']);
});

// Routes only for admin
Route::group(['middleware' => ['auth', 'role:admin']], function () {
    // List all users
    Route::post('/users', [UserController::class, 'index']);
    Route::post('/users/{user}', [UserController::class, 'show']);
});

//TODO check whether user has a valid session
Route::post('/checksession', [AuthController::class, 'checkSession']);
