<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToStagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stages', function (Blueprint $table) {
            //
            $table->timestamp('start_date')->nullable()->default(null);;
            $table->integer('duration')->nullable(false);
            $table->integer('progress')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stages', function (Blueprint $table) {
            //
            $table->dropColumn('start_date');
            $table->dropColumn('duration');
            $table->dropColumn('progress');
        });
    }
}
