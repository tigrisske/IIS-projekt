<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;

class AuthController extends Controller
{
    /**
     * Handle an authentication attempt. 
     */
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        if (Auth::attempt($data)) {
            $request->session()->regenerate();
            $user = User::find(Auth::id());
            return response()->json(['message' => 'Authentication successful', 'user' => $user], 200); 
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    /**
     * Handle a registration request of a new user.
     */
    public function register(SignupRequest $request)
    {
        $data = $request->validated();
        $newUser = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        // User will be logged in after registration
        Auth::login($newUser);
        $user = User::find(Auth::id());

        return response()->json(['message' => 'Account created and logged in!', 'user' => $user], 200);
    }

    /**
     * Handle a logout request. 
     */
    public function logout(Request $request)
    {
        logger($request->session()->all());
        
        // Check if the user is authenticated
        if (Auth::check()) {
            Auth::logout();// Log out the authenticated user
            return response()->json(['message' => 'Successfully logged out']);
        }

        // User is not authenticated
        return response()->json(['message' => 'User not authenticated'], 401);
    }

    /**
     * Check if the user is authenticated. For testing if the session is working.
     */
    public function auth(Request $request)
    {
        if (Auth::check()) {
            return response()->json(['message' => 'User is authenticated'], 200);
        }

        return response()->json(['message' => 'User not authenticated'], 401);
    }
}
