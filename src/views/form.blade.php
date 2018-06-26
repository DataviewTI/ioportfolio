<form action = '/admin/portfolio/create' id='default-form' method = 'post' class = 'form-fit'>
  @component('IntranetOne::io.components.wizard',[
    "_id" => "default-wizard",
    "_min_height"=>"435px",
    "_steps"=> [
        ["name" => "Dados Gerais", "view"=> "Portfolio::form-general"],
        ["name" => "Imagens", "view"=> "IntranetOne::io.forms.form-images"],
        ["name" => "Video", "view"=> "IntranetOne::io.forms.form-video"],
      ]
  ])
  @endcomponent
</form>