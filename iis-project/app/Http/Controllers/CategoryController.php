<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource. With pagination.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);

        $categories = Category::select('categories.*', 'parent.name as parent_name')
            ->orderBy('categories.name', 'asc')
            ->where('categories.confirmed_by', '!=', null)
            ->leftJoin('categories as parent', 'categories.parent_id', '=', 'parent.id')
            ->paginate($perPage, ['categories.*'], 'page', $page);

        return response()->json($categories);
    }


    /**
     * Get all categories.
     */
    public function getAllCategories()
    {
        $categories = $this->getNestedCategories();

        return Response::json($categories);
    }

    private function getNestedCategories($parentId = null)
    {
        $categories = Category::where('parent_id', $parentId)
            ->where('confirmed_by', '!=', null)
            ->get();

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
        $data = $request->validated();
        $user = Auth::user();
        $category = Category::create([
            'name' => $data['name'],
            'parent_id' => $data['parent_id'],
            'created_by' => $user->id,
        ]);


        return response()->json(['message' => 'Category created']);
    }

    public function getUnconfirmed()
    {
        $categories = Category::where('confirmed_by', null)->get();
        return Response::json($categories);
    }

    public function confirmCategory(Category $category, $categoryId)
    {
        $category = Category::find($categoryId);
        if (!$category) {
            return response()->json(['message' => 'Category not found.'], 401);
        }
        $category->confirmed_by = Auth::user()->id;
        $category->save();
        return response()->json(['message' => 'Category confirmed.'], 200);
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
    public function destroy(Category $category, $categoryId)
    {
        $category = Category::find($categoryId);

        Category::where('id', $categoryId)->delete();
    }
}
