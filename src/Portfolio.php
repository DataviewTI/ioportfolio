<?php
namespace Dataview\IOPortfolio;

use Dataview\IntranetOne\IOModel;
use Dataview\IntranetOne\File as ProjectFile;
use Dataview\IntranetOne\Group;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class Portfolio extends IOModel
{
  //protected $table = 'portfolio';
  protected $fillable = ['external_id','client','title','lat','lng','city','potence','production','interval','description','featured','dt_ini','dt_fim'];
	protected $casts = [
			'featured' => 'boolean',
	];	

  /* 
	| Many to Many relations are not audited yet, maybe on v4.1 (02/05/2017)
	*/
	public function group(){
		return $this->belongsTo('Dataview\IntranetOne\Group');
  }
  
	public function video(){
		return $this->belongsTo('Dataview\IntranetOne\Video');
  }

  public static function boot() { 
    parent::boot(); 
    
    static::created(function (Portfolio $obj) {
      $_obj = new Group([
        'group' => "Album do Portfolio".$obj->id,
        'sizes' => $obj->getAppend("sizes")
      ]);
      $_obj->save(); 
      $obj->group()->associate($_obj)->save();
    });
  }
}
