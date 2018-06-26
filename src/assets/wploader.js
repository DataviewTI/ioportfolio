'use strict';
let mix = require('laravel-mix');

function IOPortfolio(params={}){
  let $ = this;
  let dep = {
    portfolio: 'node_modules/intranetone-portfolio/src/',
    moment: 'node_modules/moment/',
    sortable: 'node_modules/sortablejs/',
    dropzone: 'node_modules/dropzone/dist/',
    moment: 'node_modules/moment/',
    momentdf: 'node_modules/moment-duration-format/lib/',
    wickedpicker: 'node_modules/dv-wickedpicker/dist/',
    maskmoney: 'node_modules/jquery-maskmoney/dist/',
    autocomplete: 'node_modules/devbridge-autocomplete/dist/',

  }

  let config = {
    optimize:false,
    sass:false,
    fe:true,
    cb:()=>{},
  }
  
  this.compile = (IO,callback = ()=>{})=>{

    mix.styles([
      IO.src.css + 'helpers/dv-buttons.css',
      IO.src.io.css + 'dropzone.css',
      IO.src.io.css + 'dropzone-preview-template.css',
      IO.src.io.vendors + 'aanjulena-bs-toggle-switch/aanjulena-bs-toggle-switch.css',
      IO.src.io.css + 'sortable.css',
      IO.dep.io.toastr + 'toastr.min.css',
      IO.src.io.css + 'toastr.css',
      IO.src.io.root + 'forms/video-form.css',
      IO.src.io.root + 'custom/custom-devbridge.css',
      dep.portfolio + 'portfolio.css',
    ], IO.dest.io.root + 'services/io-portfolio.min.css');
      
    mix.babel([
      dep.sortable + 'Sortable.min.js',
      IO.src.io.vendors + 'aanjulena-bs-toggle-switch/aanjulena-bs-toggle-switch.js',
      IO.dep.io.toastr + 'toastr.min.js',
      IO.src.io.js + 'defaults/def-toastr.js',
      dep.dropzone + 'dropzone.js',
      IO.src.io.js + 'dropzone-loader.js',
      dep.wickedpicker + 'wickedpicker.min.js',
      dep.wickedpicker + 'wickedpicker.min.js',
      dep.maskmoney + 'jquery.maskMoney.min.js',
      dep.autocomplete + 'jquery.autocomplete.min.js'
    ], IO.dest.io.root + 'services/io-portfolio-babel.min.js');
        
    mix.scripts([
      dep.moment + 'min/moment.min.js',
      IO.src.io.vendors + 'moment/moment-pt-br.js',
    ], IO.dest.io.root + 'services/io-portfolio-mix.min.js');

    if(process.env.NODE_ENV !== 'production')
      mix.copy(IO.src.js + 'data/cidades_otimizado.js', IO.dest.js+'cidades_otimizado.js');  //disable on prod

    //copy separated for compatibility
    mix.babel(dep.portfolio + 'portfolio.js', IO.dest.io.root + 'services/io-portfolio.min.js');

    if(config.fe){
    }

    callback(IO);
  }
}


module.exports = IOPortfolio;
