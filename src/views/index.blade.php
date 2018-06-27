@extends('IntranetOne::io.layout.dashboard')

{{-- page level styles --}}
@section('header_styles')
  <link rel="stylesheet" type="text/css" href="{{ asset('css/pickadate-full.min.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('io/services/io-portfolio.min.css') }}">
</style>
@stop

@section('main-heading')
@stop

@section('main-content')
	<!--section ends-->
			@component('IntranetOne::io.components.nav-tabs',
			[
				"_id" => "default-tablist",
				"_active"=>1,
				"_tabs"=> [
					[
						"tab"=>"Listar",
						"icon"=>"ico ico-list",
						"view"=>"Portfolio::table-list"
					],
					[
						"tab"=>"Cadastrar",
						"icon"=>"ico ico-new",
						"view"=>"Portfolio::form"
					],
				]
			])
			@endcomponent
	<!-- content -->
  @stop

  @section('after_body_scripts')
    @include('IntranetOne::base.social.fb-sdk',[
        'app_id'=>config('intranetone.social_media.facebook.app_id'),
        'app_version'=>config('intranetone.social_media.facebook.app_version'),
        'app_locale'=>config('intranetone.social_media.facebook.locale')
        ])
  @endsection

@section('footer_scripts')
@include('IntranetOne::base.social.google-maps-api')
  @include('IntranetOne::base.social.google-youtube')

<script src="{{ asset('js/cidades_otimizado.js') }}" charset="ISO-8859-1" type="text/javascript"></script>

<script src="{{ asset('js/pickadate-full.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('io/vendors/tinymce/tinymce.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('io/vendors/tinymce/langs/pt_BR.js') }}" type="text/javascript"></script>

<script src="{{ asset('io/services/io-portfolio-babel.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('io/services/io-portfolio-mix.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('io/services/io-portfolio.min.js') }}" type="text/javascript"></script>
@stop
