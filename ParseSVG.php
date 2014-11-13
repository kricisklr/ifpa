<?php

define("APP_PATH",dirname(__FILE__).DIRECTORY_SEPARATOR);

$params = array();
$cron = php_sapi_name() == 'cli';


if($cron){
    $_GET['svg'] = $argv[1];
}

$floorPlan = !isset($_GET['svg'])?'albemarle':$_GET['svg'];
$floor = !isset($_GET['floor'])?'basement':$_GET['floor'];

$svgPath = APP_PATH.'/svg/'.$floorPlan.'/'.$floor.'.svg';

$psvg = new ParseSVG($svgPath);

$psvg->go();

class ParseSVG {
    public $xml = null;
    private $results = array();
    
    function __construct($svgPath) {
        $this->xml =  simplexml_load_file($svgPath);
    }  
    
    private function iterateXML($obj){
             
        foreach($obj->polyline as $pg):
            $this->results[] = $this->generatePolygon($pg,true);
        endforeach;
        
        foreach($obj->polygon as $pg):
            $this->results[] = $this->generatePolygon($pg);
        endforeach;
        
        foreach($obj->path as $ph):
            $this->results[] = $this->generatePolygon($ph,false,true);
        endforeach;

        foreach($obj->rect as $rt):
            $this->results[] = $this->generateRectangle($rt);
        endforeach;

        foreach($obj->line as $ln):
            $this->results[] = $this->generateLine($ln);
        endforeach;
        
        foreach($obj->text as $txt):
            $this->results[] = $this->generateText($txt);
        endforeach;
        
        if(property_exists($obj, 'g')):
        
            foreach($obj->g as $ob): 
                
                $this->iterateXML($ob);
                
            endforeach;
        endif;
    }
    
    public function go() {
        $this->iterateXML($this->xml);
            
        echo json_encode($this->results);      
    }
    
    private function generatePolygon($obj,$polyline = false,$path = false) {
        return ['type'   => $polyline?'polyline':'polygon',
                'fill'   => (isset($obj['fill']))?(string) $obj['fill']:'#000000',
                'stroke'   => (string) $obj['stroke'],
                'strokeWidth'   => (string) $obj['stroke-width'],
                'points' => $path? (string) $obj['d']:'M '.$obj['points'].' z',
               ];
    }
    
    private function generateRectangle($obj) {
        return ['type'   => 'rectangle',
                'fill'   => (isset($obj['fill']))?(string) $obj['fill']:'#000000',
                'stroke'   => (string) $obj['stroke'],
                'strokeWidth'   => (string) $obj['stroke-width'],
                'x'      => (string) $obj['x'],
                'y'      => (string) $obj['y'],
                'width'  => (string) $obj['width'],
                'height' => (string) $obj['height'],
               ];
    }
    
    private function generateLine($obj) {
        return ['type'   => 'rectangle',
                'fill'   => 'none',
                'stroke'   => (string) $obj['stroke'],
                'strokeWidth'   => (string) $obj['stroke-width'],
                'x1'   => (string) $obj['x1'],
                'y1'   => (string) $obj['y1'],
                'x2'   => (string) $obj['x2'],
                'y2'   => (string) $obj['y2'],
               ];
    }
    
    private function generateText($obj) {
        $transform = (isset($obj['transform']))?preg_replace('/matrix\((.*)\)/','${1}',$obj['transform']):'';
        $transform = explode(' ',$transform);
        
        return ['type'      => 'text',
                'transform' => $transform,
                'text'      => (string) $obj[0],
               ];
    }
        
}

function output($var) { 
    echo "<pre>";
    print_r($var);
    echo "</pre>";
}
