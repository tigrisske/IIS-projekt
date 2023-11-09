<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login');
    }

    protected function handle(Request $request, \Closure $next){
        if(Auth::check()){
            return $next($request);
        }else{
            return response()->json(['message'=> 'User is not authenticated.'], 401);
        }
    }
}
