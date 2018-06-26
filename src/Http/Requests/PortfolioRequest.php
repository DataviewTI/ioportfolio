<?php

namespace Dataview\IOPortfolio;
use Dataview\IntranetOne\IORequest;

class PortfolioRequest extends IORequest
{

	public function sanitize(){
    $input = parent::sanitize();

		$input['featured'] = (int)($input['__featured']=='true');

    $input['sizes'] = $input['__dz_copy_params'];

    $input['lat'] = (float) $input['lat'];
    $input['lng'] = (float) $input['lng'];
    $input['potence'] = (float) $input['potence'];
    $input['production'] = (float) $input['production'];
    $input['dt_ini'] = date($input['dt_ini_submit']);

    $input['dt_fim'] = !empty($input['dt_fim']) ? date($input['dt_fim_submit']) : null; 

    if(isset($input['video_start_at']))
      $input['start_at'] = str_replace(' ','',date($input['video_start_at']));
    else
      $input['start_at'] = '';
        
		$this->replace($input);
	}
		
  public function rules(){
    $this->sanitize();
    return [
    ];
  }
}
