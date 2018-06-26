<div class = 'row'>
    <div class="col-sm-6 col-xs-12 pl-sm-1 b">
      <div class="form-group">
        <label for = 'title' class="bmd-label-floating __required">Título da Projeto</label>
        <input name = 'title' type = 'text' class = 'form-control form-control-lg' />
      </div>
    </div>
    <div class="col-sm-6 col-xs-12 ">
      <div class = 'row'>
        <div class="col-sm-9 col-xs-12">
          <div class="form-group">
            <label for = 'client ' class="bmd-label-floating __required">Nome do Cliente</label>
            <input name = 'client' type = 'text' class = 'form-control form-control-lg' />
          </div>
        </div>
        <div class="col-sm-3 col-xs-12 pr-sm-1">
          <div class="form-group">
            <label for = 'external_id' class="bmd-label-static __required">Código</label>
            <input name = 'external_id' type = 'text' placeholder = 'ex: CL00001' class = 'form-control form-control-lg' />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class = 'row'>
    <div class="col-sm-7 col-xs-12">
      <div class = 'row'>
        <div class="col-sm-3 col-xs-12 pl-sm-1">
          <div class="form-group">
            <label for = 'lat' class="bmd-label-static __required">Latitude</label>
            <input name = 'lat' id = 'lat' type = 'tel' class = 'form-control form-control-lg' />
          </div>
        </div>
        <div class="col-sm-3 col-xs-12 pr-xs-1">
          <div class="form-group">
            <label for = 'lng' class="bmd-label-static __required">Longitude</label>
            <input name = 'lng'  id = 'lng' class = 'form-control form-control-lg' />
          </div>
        </div>
        <div class="col-sm-6 col-xs-12">
          <div class="form-group">
            <label for = 'city' class="bmd-label-static __required">Cidade</label>
            <input name = 'city' id = 'city' type = 'text' fv-value = '' class = 'form-control form-control-lg' />
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-5 col-xs-12 ">
      <div class = 'row'>
        <div class="col-sm-4 col-xs-12">
          <div class="form-group">
            <label for = 'potence' class="bmd-label-static __required">Potência em kWp</label>
            <input name = 'potence' id = 'potence' type = 'text'  placeholder = 'ex: 5,035kWp' class = 'form-control form-control-lg' />
          </div>
        </div>
        <div class="col-sm-4 col-xs-12">
          <div class="form-group">
            <label for = 'production' class="bmd-label-static __required">Produção</label>
            <input name = 'production' id = 'production' type = 'text'  placeholder = 'ex: 1720kWp' class = 'form-control form-control-lg' />
          </div>
        </div>
        <div class="col-sm-4 col-xs-12 pr-sm-1">
          <div class="form-group">
            <label for = 'interval' class="bmd-label-static __required">Período</label>
            <input name = 'interval' type = 'text' placeholder = 'por mês' class = 'form-control form-control-lg' />
          </div>
        </div>
      </div>
    </div>
  </div>  
  
  <div class = 'row'>
    <div class="col-sm-6 col-xs-12">
      <div class = 'row'>
        <div class="col-sm-4 col-xs-12 pl-1">
          <div class="form-group">
            <label for = 'dt_ini' class = 'bmd-label-floating'>Inicio do Projeto</label>
            <input name = 'dt_ini' id = 'dt_ini' type = 'text' class = 'form-control form-control-lg'/>
          </div>
        </div>
        <div class="col-sm-4 col-xs-12">
          <div class="form-group">
            <label for = 'dt_fim' class = 'bmd-label-floating'>Fim do Projeto </label>
            <input name = 'dt_fim' id = 'dt_fim' type = 'text' class = 'form-control form-control-lg'/>
          </div>
        </div>
        <div class="col-sm-4 col-xs-12 pr-1">
          <div class="form-group is-filled">
            <label for = 'featured' class = 'bmd-label-static'>Destacar Projeto?</label>
            <button type="button" data-off = 'Não' data-on = 'Sim' 
              class="mt-4 float-right btn btn-md aanjulena-btn-toggle"
              data-toggle="button" aria-pressed="false"
              data-default-state='false' autocomplete="off" name = 'featured' id = 'featured'>
              <div class="handle"></div>
            </button>
            <input type = 'hidden' name = '__featured' id = '__featured' />
          </div>
        </div>
      </div>
      <div class = 'row'>
        <div class="col-sm-12 col-xs-12 px-1">
          <div class="form-group">
            <label for = 'description' class = 'bmd-label-static'>Descrição do Projeto</label>
            <textarea name = 'description' rows="3" type = 'text' class = 'form-control form-control-lg'></textarea>
          </div>
        </div>
      </div>      
    </div>
    <div class = 'col-sm-6 col-xs-12'>
      
    </div>
  </div>


