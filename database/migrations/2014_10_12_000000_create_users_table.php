<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('number');
            $table->enum('color', [
                'green',
                'blue',
                'red'
            ]);
            $table->bigInteger('id')
                ->index();
            $table->string('last_name', 128);
            $table->string('first_name', 128);
            $table->enum('sex', [
               '-', 'Ж', 'М'
            ]);
            $table->string('bdate', 32);
            $table->string('city', 128);
            $table->string('last_seen');
            $table->string('university_name', 128);
            $table->text('career');
            $table->enum('has_photo', [
                'Да', 'Нет'
            ]);
            $table->text('interests');
            $table->string('community')
                ->default('Сообщество');
            $table->integer('friends', false, true);
            $table->integer('followers_count', false, true);
            $table->string('mobile_phone', 128);
            $table->string('email')
                ->default('email');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
