new IOService({
    name:'Portfolio',
  },
  function(self){
    
    $("#city").autocomplete({
      maxheight:100,
      minChars:2,
      preserveInput:true,
      lookup: $.map($CB, function(item){
        return { value: item.c+' - '+item.u, data: item.i};
      }),
      onSelect:function(sugg,a){
          $(this).val(sugg.value); 
          $(this).attr('fv-value',sugg.data);
          self.df.formValidation('revalidateField', 'city');
      },
      onInvalidateSelection(){
        $(this).attr('fv-value','');
        self.df.formValidation('revalidateField', 'city');
      }
    });

    $('#featured').attrchange(function(attrName) {
      if(attrName == 'aria-pressed'){
        $('#__featured').val($(this).attr('aria-pressed'));
      }
    });

    $("#lat").maskMoney({
      thousands:'',
      precision:7,
      allowNegative:true
    })
    .on('paste',function(e){
      self.df.formValidation('enableFieldValidators', 'lat', false, 'stringLength');
      $(this).select();
      let old_value = e.originalEvent.clipboardData.getData('text/plain','text');
      let new_value = parseFloat(old_value);
      $(this).maskMoney('mask',new_value);
      e.originalEvent.preventDefault();
    }).
    on('change',function(e){
      self.df.formValidation('revalidateField','lat');
    })
    .on('blur',function(){ 
      setTimeout(() => {
        if(self.df.data('formValidation').isValidField('lat') && self.df.data('formValidation').isValidField('lng'))
        autoFillCity(parseFloat($("#lat").val()),parseFloat($("#lng").val()));
      }, 200);
    });
    
    
    $("#lng").maskMoney({
      thousands:'',
      precision:7,
      allowNegative:true
    })
    .on('paste',function(e){
      self.df.formValidation('enableFieldValidators', 'lat', false, 'stringLength');
      $(this).select();
      let old_value = e.originalEvent.clipboardData.getData('text/plain','text');
      let new_value = parseFloat(old_value);
      $(this).maskMoney('mask',new_value);
      e.originalEvent.preventDefault();
    }).
    on('change',function(e){
      self.df.formValidation('revalidateField','lng');
    })
    .on('blur',function(){
      setTimeout(() => {
        if(self.df.data('formValidation').isValidField('lat') 
        && self.df.data('formValidation').isValidField('lng'))
        autoFillCity(parseFloat($("#lat").val()),parseFloat($("#lng").val()));
      }, 200); 
    });

    $("#potence").maskMoney({
      thousands:',',
      precision:3,
    });

    $("#production").maskMoney({
      thousands:'.',
      precision:0,
    });

    //video configs
    $(".video-thumb").each(function(i,obj){
      $(obj).on('click',function(){
          $(".video-thumb").removeClass('active');
          $(this).addClass('active');
      });
    });
    
    $('#video_start_at').wickedpicker({
      now: "00:00:00",
      clearable: false,
      twentyFour: true,
      showSeconds: true,
      clearable: false,
      beforeShow:function(e,t){
       $(t).css({'width':$(e).parent().width()+'px'});
       self.df.formValidation('revalidateField','video_start_at');
      },
     });      

     $('#video_start_at').on('change',function(){
      //para evitar chamadas redundantes
        if($(this).attr('data-old-value') != $(this).val()){
          $(this).attr('data-old-value',$(this).val())
            self.df.formValidation('revalidateField','video_start_at');
        }
     });
    
    //pickadate objects initialization
    $('#video_date').pickadate({
        formatSubmit: 'yyyy-mm-dd 00:00:00',
        onClose:function(){
        }
      }).pickadate('picker').on('render', function(){
        self.df.formValidation('revalidateField', 'date');
    });

     $('#btn-get-current-time').on('click',function(){
        let time = moment.duration(parseInt(self.VPlayer.__getCurrent()),'seconds');
        $('#video_start_at').val(time.format('hh : mm : ss',{trim:false}));
        $('#video_start_at').data('plugin_wickedpicker')
        .setTime({hours:time._data.hours,minutes:time._data.minutes,seconds:time._data.seconds});
        //pause video
        self.VPlayer.__pause();
     });
   
    //pickadate objects initialization
    $('#dt_ini').pickadate({
      formatSubmit: 'yyyy-mm-dd',
      onClose:function(){
      }
    }).pickadate('picker').on('render', function(){
      self.df.formValidation('revalidateField', 'dt_ini');
    });
  
    $('#dt_fim').pickadate({
      formatSubmit: 'yyyy-mm-dd',
      onClose:function(){
      }
    }).pickadate('picker').on('render', function(){
      self.df.formValidation('revalidateField', 'dt_fim');
    });

    //Datatables initialization
    
     self.dt = $('#default-table').DataTable({
      aaSorting:[ [3,"desc" ]],
      ajax: self.path+'/list',
      initComplete:function(){
        //parent call
        let api = this.api();
        $.fn.dataTable.defaults.initComplete(this);
  
        api.addDTSelectFilter([
          {el:$('#ft_featured'),column:'featured'},
          {el:$('#ft_has_video'),column:'video_id'},
          //verificar cats e subcats durante os filtros, tem que fazer outras N verificações
        ]);
          
        $('#ft_dtini').pickadate().pickadate('picker').on('render', function(){
          api.draw()
        });
        
        $('#ft_dtfim').pickadate().pickadate('picker').on('render', function(){
          api.draw()
        });
        
        
        api.addDTBetweenDatesFilter({
            column:'date',
            min: $('#ft_dtini'),
            max: $('#ft_dtfim')
        });
      },
      footerCallback:function(row, data, start, end, display){
      },
      columns: [
        { data: 'id', name: 'id'},
        { data: 'external_id', name: 'external_id'},
        { data: 'client', name: 'client'},
        { data: 'title', name: 'title'},
        { data: 'potence', name: 'potence'},
        { data: 'dt_ini', name: 'dt_ini'},
        { data: 'video_id', name: 'video_id'},
        { data: 'featured', name: 'featured'},
        { data: 'actions', name: 'actions'},
      ],
      columnDefs:
      [
        {targets:'__dt_',width:"3%",searchable: true,orderable:true},
        {targets:'__dt_codigo',class:"text-center",width: "5%",searchable: true,orderable:true},
        {targets:'__dt_cliente',width: "20%",searchable: true,orderable:true},
        {targets:'__dt_titulo',width: "auto",searchable: true,orderable:true},
        {targets:'__dt_kwp',class:"text-center",width: "3%",orderable:true},
        {targets:'__dt_data',type:'date-br',width: "9%",orderable:true,className:"text-center",render:function(data,type,row){
            return moment(data).format('DD/MM/YYYY');
          }
        },

        {targets:'__dt_v',width: "2%",orderable:true,className:"text-center",render:function(data,type,row){
          if(data)
            return self.dt.addDTIcon({ico:'ico-video',value:1,title:'possui vídeo',pos:'left',_class:'text-danger'});
          else
            return self.dt.addDTIcon({value:0,_class:'invisible'});
          }
        },

        {targets:'__dt_d',width: "2%",orderable:true,className:"text-center",render:function(data,type,row){
            if(data)
              return self.dt.addDTIcon({ico:'ico-star',value:1,title:'projeto destaque',pos:'left',_class:'text-info'});
            else
              return self.dt.addDTIcon({value:0,_class:'invisible'});
          }
        },
        {targets:'__dt_acoes',width:"7%",className:"text-center",searchable:false,orderable:false,render:function(data,type,row,y){
            return self.dt.addDTButtons({
              buttons:[
                {ico:'ico-trash',_class:'text-danger',title:'excluir'},
                {ico:'ico-edit',_class:'text-info',title:'editar'}
            ]});
          }
        }
      ]	
    }).on('click',".btn-dt-button[data-original-title=editar]",function(){
      var data = self.dt.row($(this).parents('tr')).data();
      self.view(data.id);
    }).on('click','.ico-trash',function(){
      var data = self.dt.row($(this).parents('tr')).data();
      self.delete(data.id);
    }).on('draw.dt',function(){
      $('[data-toggle="tooltip"]').tooltip();
    });

   /* locale:self.df.formValidation.defaults.locale,
    framework:self.df.formValidation.defaults.framework,
    icon: self.df.formValidation.defaults.icon,
    excluded: self.df.formValidation.defaults.disabled,*/
    //FormValidation initialization
    FormValidation.Validator.checkCidade = {
      validate: function(validator, $field, options){
        if(!$field.val().length)
          return {
            valid:false,
            message:'O campo cidade é obrigatório'
          }
        
        if($field.attr('fv-value') == '')
          return {
            valid:false,
            message:'cidade inválida!'
          }
          
        return true;
      }
    }
    
    self.fv = self.df.formValidation({
      locale: 'pt_BR',
      excluded: 'disabled',
      framework: 'bootstrap',  
      icon: {
        valid: 'fv-ico ico-check',
        invalid: 'fv-ico ico-close',
        validating: 'fv-ico ico-gear ico-spin'
      },
      fields:{
        title:{
          validators:{
            notEmpty:{
              message: 'O título do projeto é obrigatório!'
            }
          }
        },
        client:{
          validators:{
            notEmpty:{
              message: 'O nome do cliente é obrigatório!'
            }
          }
        },
        code:{
          validators:{
            notEmpty:{
              message: 'O código é obrigatório!'
            }
          }
        },
        dt_ini:{
          validators:{
            notEmpty:{
              message: 'O data inicial obrigatória'
            },
            date:{
              format: 'DD/MM/YYYY',
              message: 'Informe uma data válida!'
            }
          }
        },
        dt_fim:{
          validators:{
            date:{
              format: 'DD/MM/YYYY',
              message: 'Informe uma data válida!'
            }
          }
        },
        lat:{
          validators:{
              notEmpty:{
                message: 'A Latitude é obrigatória'
              },
              callback:{
                message: 'Latitude Inválida!',
                callback: function(value, validator, $field){
                  let lat = $('#lat').maskMoney('unmasked')[0];
                  if(lat !== 0)
                    return (lat >= -90 && lat <= 90);
                  else
                    return false;
              }
            }
          }
        },
        lng:{
          validators:{
              notEmpty:{
                message: 'A Longitude é obrigatória'
              },
              callback:{
                message: 'Longitude Inválida!',
                callback: function(value, validator, $field){
                  let lng = $('#lng').maskMoney('unmasked')[0];
                  if(lng !== 0)
                    return (lng >= -180 && lng <= 180);
                  else
                    return false;
              }
            }
          }
        },
        city:{
          validators:{
            checkCidade:{
              enabled: true,
            },
          }
        },
        has_images:{
          validators:{
            callback:{
              message: 'O projeto deve ter no mínimo uma imagem!',
              callback: function(value, validator, $field){
                
                if(self.dz.files.length>0)
                  return true
                
                toastr["error"]("O projeto deve conter no mínimo uma imagem!")
                
                return false;
              }
            }
          }
        },
        video_url:{
          validators:{
            promise:{
              promise: function(value, validator, $field){
                let dfd   = new $.Deferred(),
                    video = getVideoInfos($('#video_url').val()),
                    prom;
                
                if(video.source != null){
                  $('#embed-container-video').addClass('loading');
                  switch(video.source){
                    case 'youtube':
                      prom = getYoutubeVideoPromise(video,self);
                      break;
                    case 'facebook':
                      prom = getFacebookVideoPromise(video,self);
                      break;
                  }
                    
                  prom.then(resolve=>{
                    resolve.callback(resolve);
                    $('#video_title').val(video.infos.title);
                    $('#video_description').val(video.infos.description);
                    $('#video_start_at').removeAttr('disabled');
                    $('#btn-get-current-time').removeClass('__disabled mouse-off');

                    makeVideoThumbs(video,self);
                    $('#video_data').val(JSON.stringify(video));
                    dfd.resolve({ valid: true });
                    
                    if($('#video_url').attr('data-loaded')!==undefined){
                      let vdata = JSON.parse($('#video_url').attr('data-loaded'));
                      //what need to call twice??
                      let vthumb = JSON.parse(JSON.parse($('#video_url').attr('data-thumb')));
                      $('#video_title').val(vdata.title)
                      $('#video_description').val(vdata.description)
                      $($('.container-video-thumb .video-thumb')[vthumb.pos]).css({
                        'backgroundImage': "url('"+vthumb.url+"')"
                      }).trigger('click');

                      $('#video_url').removeAttr('data-loaded').removeAttr('data-thumb');
                    }
                    return dfd.promise();
                  }).
                  catch(reject=>{
                    reject.callback(reject);
                    let msg = reject.data != null ? reject.data : "Este link não corresponde a nenhum vídeo válido"
                    dfd.reject({
                      valid:false,
                      message: msg
                    });
                  });
                }
                else{
                  videoUnload(self);
                  if($('#video_url').val()=='')
                    dfd.resolve({ valid: true });
                  else
                  dfd.reject({
                    valid:false,
                    message: "Este link não corresponde a nenhum vídeo válido"
                  });
                
                }
                return dfd.promise();
              },
              message: 'O link do vídeo informado é inválido',
            },
          }
        },
        video_start_at:{
          validators:{
            callback:{
              callback:function(value, validator, $field){
                let dur = moment.duration(value.replace(/\s/g,''));
                let isodur = $('#video_start_at').attr('data-video-duration')
                if(isodur !== undefined && isodur != null){
                  if(dur.asSeconds() > moment.duration(isodur).asSeconds())
                    return {
                      valid:false,
                      message:'Início máximo em '+moment.duration(isodur,"minutes").format("H:mm:ss")
                    }
                }
                return true;
             },
            },
          }
        },
        video_date:{
          validators:{
            date:{
              format: 'DD/MM/YYYY',
              message: 'Informe uma data válida!'
            }
          }
        },
      }
    }).on('err.field.fv', function(e, data){
      //nothing to do yet
    }).on('success.form.fv', function(e){
      
    }).on('err.validator.fv', function(e, data) {
      
      data.element
          .data('fv.messages')
          .find('.help-block[data-fv-for="' + data.field + '"]').hide()
          .filter('[data-fv-validator="' + data.validator + '"]').show();
    });
  
    //Dropzone initialization
    self.dz = new DropZoneLoader({
      id:'#custom-dropzone',
      thumbnailWidth: 240,
      thumbnailHeight: 180,
      copy_params:{
        original:true,
        sizes:{
        'sm':{'w':400,'h':300},
        'md':{'w':800,'h':600},
        }
      },
      removedFile:function(file){
        self.df.formValidation('revalidateField', 'has_images');
      },
      onSuccess:function(file,ret){
        self.df.formValidation('revalidateField', 'has_images');        
      }
    });

    //need to transform wizardActions in a method of Class
    self.wizardActions(function(){
        $("[name='__dz_images']").val(JSON.stringify(self.dz.getOrderedDataImages()));
        $("[name='__dz_copy_params']").val(JSON.stringify(self.dz.copy_params));
    });

    self.callbacks.view = view(self);

    self.callbacks.update.onSuccess = function(){
      self.tabs['listar'].tab.tab('show');
    }

    self.callbacks.create.onSuccess = function(){
      self.tabs['listar'].tab.tab('show');
    }

    self.callbacks.unload = function(self){
      $(".aanjulena-btn-toggle").aaDefaultState();

      self.dz.removeAllFiles(true);
      videoUnload(self);
      self.df.formValidation('revalidateField', '__has_images');
    }
});//the end ??





/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                                                                                            
  ██╗      ██████╗  ██████╗ █████╗ ██╗         ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
  ██║     ██╔═══██╗██╔════╝██╔══██╗██║         ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
  ██║     ██║   ██║██║     ███████║██║         ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
  ██║     ██║   ██║██║     ██╔══██║██║         ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
  ███████╗╚██████╔╝╚██████╗██║  ██║███████╗    ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
  ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


function preview(param){
  var win = window.open(document.location.origin+'/reader/'+param.id+'/teste-preview', '_blank');
  win.focus();
}

function makeVideoThumbs(video,self){
  let container = $('.container-video-thumb');
  container.find('.video-thumb').remove();
  let new_div = $(document.createElement("div")).addClass('video-thumb d-flex');

  //se existe alguma foto na galeria, add a primeira
  console.log(self.dz.files.length);
  if(self.dz.files.length){
    container.append(new_div.clone().on('click',function(){
        $(".video-thumb").removeClass('active');
        $(this).addClass('active');
      })
      .css({'background-image':"url("+($(self.dz.files[0].previewTemplate).find('[data-dz-thumbnail]').attr('src'))+")      "})
      .attrchange(function(attrName) {
        if(attrName == 'class'){
          if($(this).hasClass('active')){
            let bg = $(this).css('backgroundImage');
            $('#video_thumbnail').val(JSON.stringify({
              pos:$(this).attr('data-pos'),  
              url:bg.substring(5,bg.lastIndexOf("\""))
            }));
          }
        }
      })
    );
  }

  //cria as thumbs de acordo com o retorno de data.thumbs
   //$('#video_start_at').attr('data-video-duration',null);
  video.thumbs.forEach(function(url,i){
    container.append(new_div.clone().on('click',function(){
      $(".video-thumb").removeClass('active');
      $(this).addClass('active');
    })
    .css({'backgroundImage':"url('"+(url)+"')"})
    .attrchange(function(attrName){
      if(attrName == 'class'){
        if($(this).hasClass('active')){
          let bg = $(this).css('backgroundImage');
          $('#video_thumbnail').val(JSON.stringify({
            pos:$(this).attr('data-pos'),  
            url:bg.substring(5,bg.lastIndexOf("\""))
          }));
         }
      }
    }));
  });

  container.find('.video-thumb').first().addClass('active');
  container.find('.video-thumb').each(function(i,obj){
    $(obj).attr('data-pos',i);
  });
}

function getYoutubeVideoPromise(video,self){
  let _resolve = function(res){
    let player = $('#'+video.source+'-player');
    player.removeClass('d-none').attr('src',video.embed);
    
    let _ytp = new YT.Player('youtube-player',{
      events: {
        'onReady': function(_t){
          self.VPlayer = _t.target;
          self.VPlayer.__getCurrent = _t.target.getCurrentTime;
          self.VPlayer.__play = _t.target.playVideo;
          self.VPlayer.__pause = _t.target.pauseVideo;
        }
      }
    });

    video.infos = {
        title:res.data.items[0].snippet.title,
        description:res.data.items[0].snippet.description,
        duration:moment.duration(res.data.items[0].contentDetails.duration,'seconds').format('hh:mm:ss',{trim:false}),
      }
      for(let i=0;i<3;i++)
        video.thumbs.push('https://img.youtube.com/vi/'+video.id+'/'+i+'.jpg');
  }

  let _reject = function(res){
    videoUnload(self);
  }
  return new Promise((resolve,reject) => {
      //$('#embed-container-video').addClass('loading');
      $.ajax({
        url: ['https://www.googleapis.com/youtube/v3/videos',
              '?key=AIzaSyB2-i5P7MPuioxONBQOZwgC7vWEeJ4PnIo',
              '&part=snippet,contentDetails',
              '&id='+video.id
        ].join(''),
        type:'GET',
        success: function(ret){
            if(ret.items.length)
              resolve({state:true,data:ret,callback:_resolve});
            else
              reject({state:false,data:'o link informado está quebrado ou é inválido!',callback:_reject});
            },
            error: function(ret){
              reject({state:false,data:'o link informado está quebrado ou é inválido!',callback:_reject});
            }
          }).done(function(){
        });
      });
  }

function getFacebookVideoPromise(video,self){
  let _resolve = function(res){
    let player = $('#'+video.source+'-player');
    player.removeClass('d-none').attr('data-href',video.url);
    FB.XFBML.parse(document.getElementById('facebook-player').parentNode);
    self.VPlayer = null;
    FB.Event.subscribe('xfbml.ready', function(msg) {
      if (msg.type === 'video') {
        self.VPlayer = msg.instance;
        self.VPlayer.__getCurrent = msg.instance.getCurrentPosition;
        self.VPlayer.__play = msg.instance.play;
        self.VPlayer.__pause = msg.instance.pause;
      }
    });
    video.infos = {
      title:res.data.title,
      description:res.data.description,
      duration:moment.duration(parseInt(res.data.length),'seconds').format('hh:mm:ss'),
    }
    
    video.embed = video.embed+'&width='+res.data.format[0].width
    let max_video_number = (res.data.thumbnails.data.length>=3) ? 3 : res.data.thumbnails.data.length;
    for(let i=0;i<max_video_number;i++)
      video.thumbs.push(res.data.thumbnails.data[i].uri);
  }

  let _reject = function(res){
    videoUnload(self);
  }

  return new Promise((resolve,reject) => {
    FB.api(
      "/"+video.id+'?fields=thumbnails,description,length,embeddable,embed_html,format,title&access_token='+window.IntranetOne.social_media.facebook.long_token,
      function (ret){
        if(ret && !ret.error){
          resolve({state:true,data:ret,callback:_resolve});
        }
        else{
          if(ret.error.code == 100)
            reject({state:false,data:"O video deste link não permite sua utilização",callback:_reject});
          reject({state:false,data:null,callback:_reject});
        }
      });

  });

}

function videoUnload(self){
  $('#embed-container-video').removeClass('loading');
  $('.vplayer').attr('src','').addClass('d-none');
  $('.vplayer').attr('data-href','').addClass('d-none');

  $('#video_start_at').val('00 : 00 : 00').attr('disabled','disabled');
//  $('#btn-get-current-time').attr('disabled','disabled');
  self.VPlayer = null;
  $('#video_start_at').data('plugin_wickedpicker')
  .setTime({hours:0,minutes:0,seconds:0});
  $('.container-video-thumb .video-thumb').remove();
  $('#video_title,#video_description, #video_data').val('');

  $('#video_start_at').attr('disabled','disabled');
  $('#btn-get-current-time').addClass('__disabled mouse-off');
  $('#video_data').val('');
}

function getVideoInfos(url){
  let rgx_youtube = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  let rgx_facebook = /^http(?:s?):\/\/(?:www\.|web\.|m\.)?facebook\.com\/([A-z0-9\.]+)\/videos(?:\/[0-9A-z].+)?\/(\d+)(?:.+)?$/

  if(rgx_youtube.test(url))
    return {
      source:'youtube',
      id:url.match(rgx_youtube)[1],
      url:url,
      embed:[
        'https://www.youtube.com/embed/'+url.match(rgx_youtube)[1],
        '?enablejsapi=1',
        '&origin='+document.location.origin
      ].join(''),
      thumbs:[]        
  }

  if(rgx_facebook.test(url)){
    let url_match = url.match(rgx_facebook);
    return {
        source:'facebook',
        id:url_match[2],
        url:url,
        embed:[
          'https://www.facebook.com/plugins/video.php',
          '?href=https%3A%2F%2Fwww.facebook.com%2F',
          url_match[1]+'%2Fvideos%2F'+url_match[2]
        ].join(''),
        thumbs:[]        
      }
  }

    return {source:null,id:null,thumbs:[],embed:null,url:null};
}

//CRUD CallBacks
function view(self){
  return{
      onSuccess:function(data){
        $("[name='external_id']").val(data.external_id);
        $("[name='title']").val(data.title);
        $("[name='client']").val(data.client);
        $("[name='code']").val(data.external_id);
        $("#lat").maskMoney('mask',parseFloat(data.lat));
        $("#lng").maskMoney('mask',parseFloat(data.lng));
        $("#potence").maskMoney('mask',parseFloat(data.potence));
        $("#production").maskMoney('mask',parseFloat(data.production));


        $("[name='city']").val(data.city).trigger('change');
        $('#default-form').formValidation('revalidateField', 'city')

        $("[name='potence']").val(data.potence);
        $("[name='production']").val(data.production);
        $("[name='interval']").val(data.interval);
        $("[name='description']").val(data.description);
        $("[name='dt_ini']").pickadate('picker').set('select',new Date(data.dt_ini));
        if(data.dt_fim != null)
          $("[name='dt_fim']").pickadate('picker').set('select',new Date(data.dt_fim));
          
        $("#featured").aaToggle(data.featured);

        if(data.video_id != null){
            $('#video_url').attr('data-loaded',JSON.stringify(data.video)).val(data.video.url);
            $('#video_url').attr('data-thumb',JSON.stringify(data.video.thumbnail));
            self.df.formValidation('revalidateField', 'video_url');

            if(data.video.date!=null)
              $("#video_date").pickadate('picker').set('select',new Date(data.video.date));
            
              let dur = moment.duration(data.video.start_at,'seconds');
              $('#video_start_at').val(dur.format('hh : mm : ss',{trim:false}));
              $('#video_start_at').data('plugin_wickedpicker').setTime({
                hours:dur._data.hours,
                minutes:dur._data.minutes,
                seconds:dur._data.seconds
              });
          }
          else{
            $('#video_url').removeAttr('data-loaded');
            $('#video_url').removeAttr('data-thumb');
          }

          //reload imagens 
          self.dz.removeAllFiles(true);
          if(data.group!=null){
            self.dz.reloadImages(data);
          }
        },
        onError:function(self){
          console.log('executa algo no erro do callback');
      }
    }
}


function getCity(lat,lng){

  let coord = {'lat':lat,'lng':lng}
  let geocoder = new google.maps.Geocoder;

  return new Promise((resolve, reject) => {
    geocoder.geocode({'location': coord}, function(results, status){
      if(status === 'OK'){
        if(results[1]){
          let storableLocation = {};
          for (var ac = 0; ac < results[0].address_components.length; ac++) {
             var component = results[0].address_components[ac];
             if(component.types.includes('sublocality') || component.types.includes('locality'))
                  storableLocation.city = component.long_name;
             else if (component.types.includes('administrative_area_level_1'))
                  storableLocation.state = component.short_name;
             else if (component.types.includes('administrative_area_level_2'))
              storableLocation.city = component.short_name;
      
          }

          resolve({state:true,message:storableLocation});

        } 
        else
          reject({state:false,message:'Nenhum resultado encontrado'})
      }
      else
        reject({state:false,message:'Nenhum resultado encontrado'});
    });
  })
}

function autoFillCity(lat,lng){
  getCity(lat,lng).then(result => {
    $("#city").val(result.message.city+' - '+result.message.state).trigger('change');
  })
  .catch(err => {
    console.log(err);
    $("#city").val('');
  });
 
  $('#default-form').formValidation('revalidateField', 'city');
}


