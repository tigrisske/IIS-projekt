<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    public function handle($request, Closure $next)
    {
        if ($request->isMethod('OPTIONS')) {
            return response('', 200)
                ->header('Access-Control-Allow-Origin', 'http://100.64.217.131:3000') // Add your React app's domain here
                // ->header('Access-Control-Allow-Origin', 'http://localhost:3000') // Add your React app's domain here
                ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
                ->header('Access-Control-Allow-Credentials', 'true')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization,X-CSRF-Token, X-Requested-With, Application');
        }

        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', 'http://100.64.217.131:3000'); // Add your React app's domain here
        // $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Add your React app's domain here
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization,X-CSRF-Token, X-Requested-With, Application');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        return $response;
    }
}
