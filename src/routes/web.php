<?php
/*
  funções declaradas dentro do web.php geram erro no artisan config:cache, mensagem de declaração duplicada
  sem existir, por isso foi usado o helper;
*/

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                                                                             
███████╗██████╗ ██╗   ██╗        ██████╗      ██████╗     ██████╗     ████████╗    
██╔════╝██╔══██╗██║   ██║        ██╔══██╗    ██╔═══██╗    ██╔══██╗    ╚══██╔══╝    
███████╗██████╔╝██║   ██║        ██████╔╝    ██║   ██║    ██████╔╝       ██║       
╚════██║██╔══██╗╚██╗ ██╔╝        ██╔═══╝     ██║   ██║    ██╔══██╗       ██║       
███████║██║  ██║ ╚████╔╝         ██║         ╚██████╔╝    ██║  ██║       ██║       
╚══════╝╚═╝  ╚═╝  ╚═══╝          ╚═╝          ╚═════╝     ╚═╝  ╚═╝       ╚═╝       
                                                                                   
                                                                                             
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

Route::group(['prefix' => 'admin', 'middleware' => ['web','admin'], 'as' => 'admin.'],function(){
    Route::group(['prefix' => 'portfolio'], function () {
    Route::get('/','PortfolioController@index');
    Route::post('create', 'PortfolioController@create');
    Route::get('list', 'PortfolioController@list');
    Route::get('view/{id}', 'PortfolioController@view');
    Route::post('update/{id}', 'PortfolioController@update');
    Route::get('delete/{id}', 'PortfolioController@delete');			
  });
});
