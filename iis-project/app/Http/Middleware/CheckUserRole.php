<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;


class CheckUserRole
{
    protected function compareRoles($userRole, $role)
    {
        $roles = [
            'member' => 0,
            'moderator' => 1,
            'admin' => 2,
        ];

        return $roles[$userRole] >= $roles[$role];
    }

    public function handle($request, Closure $next, $role)
    {
        if (Auth::check() && $this->compareRoles(Auth::user()->role, $role)) {
            return $next($request);
        }

        return abort(401, "Unauthorized, user's role is: " . Auth::user()->role);
    }
}
