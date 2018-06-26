<?php
namespace Dataview\IOPortfolio;

use Illuminate\Database\Seeder;
use Dataview\IntranetOne\Service;
use Sentinel;

class PortfolioSeeder extends Seeder
{
    public function run(){
      //cria o serviço se ele não existe
      if(!Service::where('service','Portfolio')->exists()){
        Service::insert([
            'service' => "Portfolio",
            'ico' => 'ico-project',
            'alias'=>'portfolio',
            'description' => 'Cadastro de Projetos',
            'order' => Service::max('order')+1
          ]);
      }

      //seta privilegios padrão para o user admin
      $user = Sentinel::findById(1);
      $user->addPermission('portfolio.view');
      $user->addPermission('portfolio.create');
      $user->addPermission('portfolio.update');
      $user->addPermission('portfolio.delete');
      $user->save();
    }
} 
