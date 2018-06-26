<?php
namespace Dataview\IOPortfolio\Console;
use Dataview\IntranetOne\Console\IOServiceRemoveCmd;
use Dataview\IOPortfolio\IOPortfolioServiceProvider;
use Dataview\IntranetOne\IntranetOne;


class Remove extends IOServiceRemoveCmd
{
  public function __construct(){
    parent::__construct([
      "service"=>"portfolio",
      "tables" =>['portfolios'],
    ]);
  }

  public function handle(){
    parent::handle();
  }
}
