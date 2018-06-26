<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePortfolioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
			Schema::create('portfolios', function(Blueprint $table)
			{
				$table->increments('id');
				$table->char('external_id',15)->nullable();
				$table->string('client')->nullable();
				$table->string('title');
        $table->decimal('lat', 10, 7)->default(0);
        $table->decimal('lng', 10, 7)->default(0);
        $table->string('city');
        $table->decimal('potence')->default(0)->nullable();
        $table->decimal('production')->default(0)->nullable();
        $table->date('dt_ini');
        $table->date('dt_fim')->nullable();
        $table->char('interval')->nullable();
				$table->text('description')->nullable();
        $table->boolean('featured')->default(false);
        $table->boolean('facebook_comments')->default(1);
        $table->boolean('twitter_comments')->default(1);
        $table->integer('group_id')->unsigned()->nullable();
        $table->integer('video_id')->unsigned()->nullable();
        $table->timestamps();
				$table->softDeletes();
        $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade')->onUpdate('cascade');
        $table->foreign('video_id')->references('id')->on('videos')->onDelete('cascade')->onUpdate('cascade');
			});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('portfolio');
    }
}
