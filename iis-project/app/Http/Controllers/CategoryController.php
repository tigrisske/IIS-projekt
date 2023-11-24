<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Get a listing of confirmed categories with pagination.
     * 
     * In the get request, can be specified the number of events per page and the current page.
     * 
     * @param Request $request Request object
     * @return JsonResponse
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
     * 
     * @return JsonResponse
     */
    public function getAllCategories()
    {
        $categories = $this->getNestedCategories();

        return Response::json($categories);
    }

    /**
     * Get all categories with nested children. This is a recursive function.
     * 
     * @param int $parentId ID of the parent category
     * @return array Array of categories
     */
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
     * Create a new category.
     * 
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $data = $request;
        $user = Auth::user();
        Category::create([
            'name' => $data['name'],
            'parent_id' => $data['parent_id'],
            'created_by' => $user->id,
        ]);
        return response()->json(['message' => 'Category created']);

    }

    /**
     * Get all unconfirmed categories.
     * 
     * @return JsonResponse
     */
    public function getUnconfirmed()
    {
        $categories = Category::where('confirmed_by', null)->get();
        return Response::json($categories);
    }

    /**
     * Confirm a category.
     * 
     * @param Category $category
     * @param int $categoryId ID of the category to confirm
     * @return JsonResponse
     */
    public function confirmCategory($categoryId)
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
     * Update the specified resource in storage.
     * 
     * @param Request $request Request object
     * @param int $categoryId ID of the category to update
     * @return JsonResponse
     */
    public function update(Request $request, $categoryId)
    {
        $category = Category::find($categoryId);
        //change the name of the category
        $category->name = $request->name;
        $category->save();
        return response()->json(['message' => 'Category updated.'], 200);

    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param int $categoryId ID of the category to delete
     */
    public function destroy($categoryId)
    {
        Category::where('id', $categoryId)->delete();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Get the specified resource.
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


}
