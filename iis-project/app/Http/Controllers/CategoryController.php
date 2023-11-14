<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = $this->getNestedCategories();
    
        return Response::json($categories);
    }
    
    private function getNestedCategories($parentId = null)
    {
        $categories = Category::where('parent_id', $parentId)->get();
    
        foreach ($categories as $category) {
            $category->children = $this->getNestedCategories($category->id);
        }
    
        return $categories;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $data = $request;//->validated();
        $user = Auth::user();
        $event = Category::create([
            'name' => $data['name'],
            'parent_id' => $data['parent_id'],
            'created_by' => $user->id,
        ]);


        return response()->json(['message' => 'Location created and logged in']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
