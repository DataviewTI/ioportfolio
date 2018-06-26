<?php
namespace Dataview\IOPortfolio\Console;
use Dataview\IntranetOne\Console\IOServiceInstallCmd;
use Dataview\IOPortfolio\IOPortfolioServiceProvider;
use Dataview\IOPortfolio\PortfolioSeeder;

class Install extends IOServiceInstallCmd
{
  public function __construct(){
    parent::__construct([
      "service"=>"portfolio",
      "provider"=> IOPortfolioServiceProvider::class,
      "seeder"=>PortfolioSeeder::class,
    ]);
  }

  public function handle(){
    parent::handle();
  }
}
