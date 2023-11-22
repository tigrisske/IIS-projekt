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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->decimal('price', 10, 2); // 10 digits in total, 2 after the decimal point
            $table->text('description')->nullable(); // Optional description of the ticket
            $table->integer('amount')->default(1);
            $table->unsignedBigInteger('event_id');
            $table->timestamps();

            // Foreign keys
            $table->foreign('event_id')->references('id')->on('events');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
