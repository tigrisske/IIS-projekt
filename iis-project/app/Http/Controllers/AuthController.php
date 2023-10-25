<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        if (Auth::attempt($data)) {
            // $session = $request->session()-regenerate();
            $request->session()->regenerate();
            // $session_id = $session->getId();

            return response()->json(['message' => 'Authentication successful'], 200);//->headers('SESSION_ID', $session_id);
        }

        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    public function register(SignupRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        // User will be logged in after registration
        Auth::login($user);

        return response()->json(['message' => 'Account created and logged in']);
    }

    public function logout(Request $request)
    {
        logger($request->session()->all());
        // Check if the user is authenticated
        
        
        // $request->session()->invalidate();
        if (Auth::check()) {
            // Log out the authenticated user
            Auth::logout();
            // $request->session()->regenerateToken();
            return response()->json(['message' => 'Successfully logged out']);
        }

        // User is not authenticated
        return response()->json(['message' => 'User not authenticated'], 401);
    }
    
    public function auth(Request $request)
    {
        if (Auth::check()) {
            return response()->json(['message' => 'User is authenticated'], 200);
        }

        return response()->json(['message' => 'User not authenticated'], 401);
    }
}
