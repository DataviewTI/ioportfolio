<?php
namespace Dataview\IOPortfolio;
  
use Dataview\IntranetOne\IOController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests;
use Dataview\IOPortfolio\PortfolioRequest;
use Dataview\IOPortfolio\Portfolio;
use Dataview\IntranetOne\Group;
use Dataview\IntranetOne\Video;
use Validator;
use DataTables;
use Session;
use Sentinel;

class PortfolioController extends IOController{

	public function __construct(){
    $this->service = 'portfolio';
	}

  public function index(){
		return view('Portfolio::index');
  }

	public function list(){
		$query = Portfolio::select('id','external_id','client','title','lat','lng','potence','production','group_id','video_id','dt_ini','dt_fim','interval','featured')
			->with([
				'video'=>function($query){
					$query->select('videos.id');
				}
			])
			->orderBy('dt_ini','desc')
			->get();
			return Datatables::of(collect($query))->make(true);
	}

	public function create(PortfolioRequest $request){
    $check = $this->__create($request);
    if(!$check['status'])
      return response()->json(['errors' => $check['errors'] ], $check['code']);	
      
    $obj = new Portfolio($request->all());
    $obj->setAppend("sizes",$request->__dz_copy_params);
    $obj->save();

    $obj->group->manageImages(json_decode($request->__dz_images),json_decode($request->__dz_copy_params));
    $obj->save();

    if($request->video_url != null){
      $_vdata = json_decode($request->video_data);
      
      $obj->video()->associate(Video::create([
        'url' => $request->video_url,
        'source' => $_vdata->source,
        'title' => $request->video_title,
        'description' => $request->video_description,
        'date' => $request->video_date_submit,
        'thumbnail' => $request->video_thumbnail,
        'data' => $request->video_data,
        'start_at' => $request->start_at
      ]));
      $obj->save();
    }

    return response()->json(['success'=>true,'data'=>null]);
	}

	public function view($id){
    $check = $this->__view();
    if(!$check['status'])
      return response()->json(['errors' => $check['errors'] ], $check['code']);	

    $query = Portfolio::select('id','external_id','title','client','lat','lng','potence','production','group_id','video_id','dt_fim','dt_ini','interval','featured','city','description')
				->with([
					'video',
					'group.files'
				])
				->orderBy('dt_ini','desc')
				->where('id',$id)
				->get();
				
        return response()->json(['success'=>true,'data'=>$query]);
	}
	
	public function update($id,PortfolioRequest $request){
    $check = $this->__update($request);
    if(!$check['status'])
      return response()->json(['errors' => $check['errors'] ], $check['code']);	

    $_new = (object) $request->all();
			$_old = Portfolio::find($id);
      
    $upd = ['external_id','client','title','lat','lng','potence','production','dt_ini','dt_fim','interval','description','featured','city'];

    foreach($upd as $u)
      $_old->{$u} = $_new->{$u};
      
			if($_old->video != null){
        if($_new->video_url==null){
          $_old->video_id = null;
        }
        else
        {
          $_vdata = json_decode($_new->video_data);
          $_old->video->url = $_new->video_url;
          $_old->video->source = $_vdata->source;
          $_old->video->title = $_new->video_title;
          $_old->video->description = $_new->video_description;
          $_old->video->date = $_new->video_date_submit;
          $_old->video->thumbnail = $_new->video_thumbnail;
          $_old->video->data = $_new->video_data;
          $_old->video->start_at = $_new->start_at;
          $_old->video->save();
        } 
      }
      else
      {
        if($_new->video_data!=null){
          $_vdata = json_decode($_new->video_data);
          $_old->video()->associate(Video::create([
            'url' => $_new->video_url,
            'source' => $_vdata->source, //depois fazer esse dado vir do submit		
            'title' => $_new->video_title,
            'description' => $_new->video_description,
            'date' => $_new->video_date_submit,
            'thumbnail' => $_new->video_thumbnail,
            'data' => $_new->video_data,
            'start_at' => $_new->start_at
          ]));
        }
      }


      if($_old->group != null){
        $_old->group->sizes = $_new->sizes;
        $_old->group->manageImages(json_decode($_new->__dz_images),json_decode($_new->__dz_copy_params));
        $_old->group->save();
      }
      else
				if(count(json_decode($_new->__dz_images))>0){
					$_old->group()->associate(Group::create([
            'group' => "Album do Projeto ".$obj->id,
            'sizes' => $_new->__dz_copy_params
            ])
          );
					$_old->group->manageImages(json_decode($_new->__dz_images),json_decode($_new->__dz_copy_params));
				}
			
			$_old->save();
			return response()->json(['success'=>$_old->save()]);
	}

	public function delete($id){
    $check = $this->__delete();
    if(!$check['status'])
      return response()->json(['errors' => $check['errors'] ], $check['code']);	

      $obj = Portfolio::find($id);
			$obj = $obj->delete();
			return  json_encode(['sts'=>$obj]);
  }
}
