<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LocationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:110',
            'address_line_1' => 'required|string|max:110',
            'city' => 'required|string|max:110',
            'zip_code' => 'required|integer|digits:5',
            'country' => 'required|string|max:110',
            'description' => 'required|string|max:1100',
        ];
    }
}
