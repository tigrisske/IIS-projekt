<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'capacity' => 'required|integer|min:1|max:99999999',
            'description' => 'required|string|max:10000',
            'category_id' => 'required|exists:categories,id',
            'location_id' => 'required|exists:locations,id',
            'pay_in_advance' => 'required',
            'ticket_data.*.name' => 'required|string|max:255',
            'ticket_data.*.price' => 'required|numeric|min:0',
            'ticket_data.*.amount' => 'required|integer|min:1|max:100000',
            'ticket_data' => function ($attribute, $value, $fail) {
                // Check if at least one ticket is provided
                if (count($value) === 0) {
                    $fail('At least one ticket is required.');
                }
            },
        ];
    }
}
