<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('profile_pic')->nullable();
            $table->string('cover_pic')->nullable();
            $table->string('number')->nullable();
            $table->string('gender')->nullable();
            $table->string('description')->nullable();
            $table->string('follower')->nullable();
            $table->string('following')->nullable();
            $table->string('follower_count')->nullable();
            $table->string('following_count')->nullable();
            $table->timestamps();

            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
}
