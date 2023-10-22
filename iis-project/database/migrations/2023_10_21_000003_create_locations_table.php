<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // The name of the location
            $table->string('address_line_1');
            $table->string('address_line_2')->nullable(); // Optional
            $table->string('city');
            $table->string('zip_code');
            $table->string('country');
            $table->text('description')->nullable(); // Description of the location
            $table->unsignedBigInteger('created_by'); // The user who created the location
            $table->unsignedBigInteger('confirmed_by')->nullable(); // NULL means that the location is not confirmed yet
            $table->timestamps();

            // Foreign keys
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('confirmed_by')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
