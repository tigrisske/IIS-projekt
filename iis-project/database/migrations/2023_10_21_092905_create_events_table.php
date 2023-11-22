<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->unsignedBigInteger('capacity');
            $table->text('description');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('location_id');
            $table->boolean('confirmed_by')->nullable(); // NULL means that the event is not confirmed yet
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedInteger('joined_count')->default(0);
            $table->boolean('pay_in_advance')->default(false);
            $table->timestamps();

            // Foreign keys
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade');
            $table->foreign('location_id')
                ->references('id')
                ->on('locations')
                ->onDelete('cascade');
            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
