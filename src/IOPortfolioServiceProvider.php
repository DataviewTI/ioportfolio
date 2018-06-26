<?php

namespace Dataview\IOPortfolio;

use Illuminate\Support\ServiceProvider;

class IOPortfolioServiceProvider extends ServiceProvider
{
  public static function pkgAddr($addr){
    return __DIR__.'/'.$addr;
  }

  public function boot(){
    $this->loadViewsFrom(__DIR__.'/views', 'Portfolio');
  }

    public function register()
    {
      $this->commands([
        Console\Install::class,
        Console\Remove::class,
      ]);

      $this->app['router']->group(['namespace' => 'dataview\ioportfolio'], function () {
        include __DIR__.'/routes/web.php';
      });
      //buscar uma forma de não precisar fazer o make de cada classe

      $this->app->make('Dataview\IOPortfolio\PortfolioController');
      $this->app->make('Dataview\IOPortfolio\PortfolioRequest');
    }
}
