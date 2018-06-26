	<div class = 'row dt-filters-container'>
		<div class="col-md-2 col-sm-12">
			<div class="form-group">
        <label for = 'subtitulo' class = 'bmd-label-static'><i class = 'ico ico-filter'></i> Palavra Chave</label>
        <input type = 'text' class = 'form-control form-control-lg' name ='ft_search' id = 'ft_search' />
			</div>
		</div>
		<div class="col-md-5 col-sm-12">
			<div class = 'row'>
				<div class="col-md-3 col-sm-12">
          <div class="form-group">
            <label for = 'subtitulo' class = 'bmd-label-static'><i class = 'ico ico-filter'></i> Destaque?</label>
            <select id = 'ft_featured' class = 'form-control form-control-lg'>
              <option value = ''></option>
              <option value = '1'>Sim</option>
              <option value = '0'>Não</option>
            </select>
          </div>
        </div>
        <div class="col-md-3 col-sm-12">
          <div class="form-group">
            <label for = 'ft_has_video' class = 'bmd-label-static'><i class = 'ico ico-filter'></i> Com Vídeo</label>
            <select id = 'ft_has_video' class = 'form-control form-control-lg'>
              <option value = ''></option>
              <option value = '1'>Sim</option>
              <option value = '0'>Não</option>
            </select>
          </div>
        </div>
				<div class="col-md-3 col-sm-12">
          <div class="form-group">
            <label for = 'ft_dtini' class = 'bmd-label-static'><i class = 'ico ico-filter'></i> Data Inicial</label>  
            <input type = 'text' name = 'ft_dtini' id = 'ft_dtini' class = 'form-control form-control-lg'>
          </div>
        </div>
        <div class="col-md-3 col-sm-12">
          <div class="form-group">
          <label for = 'ft_dtfim' class = 'bmd-label-static'><i class = 'ico ico-filter'></i> Data Final</label>  
          <input type = 'text' name = 'ft_dtfim' id = 'ft_dtfim' class = 'form-control form-control-lg'>
          </div>
        </div>
			</div>
		</div>
		<div class="col-md-5 col-sm-12">
		</div>
	</div>
	@component('IntranetOne::io.components.datatable',[
	"_id" => "default-table",
	"_columns"=> [
			["title" => "#"],
			["title" => "Código"],
			["title" => "cliente"],
			["title" => "Título"],
			["title" => "kWp"],
			["title" => "data"],
			["title" => "V"],
			["title" => "D"],
			["title" => "Ações"],
		]
	])
@endcomponent