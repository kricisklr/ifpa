var ifpDirectives = angular.module('ifpDirectives',[]);

ifpDirectives.directive('ifpBackLink',['$window',function($window){
    return function(scope,element,attr) {
        element.on('click', function(e) {
            e.preventDefault();
            $window.history.back();
        });
    };
}]);

ifpDirectives.directive('ifpPrettyp', function(){
    return function(scope, element, attrs) {
        element.on('click', function(e){
            e.preventDefault();
            $.prettyPhoto.open(attrs.href,attrs.title,attrs.description); 
        });
    };
});

ifpDirectives.directive('btPositionResult',['$window',function($window){
    return function(scope,element,attr) {
        var left = attr.btPositionResult * (UNIT_WIDTH + 1);
        element.css("left", left + "px");
        var unitWidth   = parseInt(element.css('width'));
        var parentWidth = parseInt(element.parent().css('width'));
        
        element.parent().css('width', parentWidth+unitWidth+1);
    };
}]);

ifpDirectives.directive('btHoverUnit',['$window',function($window){
    return function(scope,element,attr) {
    	var eleClass = attr.btHoverUnit;
    	
        element.on('mouseenter',function(){
        	element.animate({
        		'border-color':'#f4dd46'
        	},'fast');
        	element.children('.unitHeading').animate({
        		borderRightColor:'#f4dd46',
        		borderBottomColor:'#f4dd46',
        		color:'#f4dd46'
        	},'fast');
        });
        element.on('mouseleave',function(){
        	if(element[0].className.search(/even/) >= 0)
        		var borderColor = '#989ca5';
        	else
        		var borderColor = '#313a4b';

        	element.animate({
        		'border-color':borderColor
        	},'fast');
        	
        	element.children('.unitHeading').animate({
        		borderRightColor:borderColor,
        		borderBottomColor:borderColor,
        		color:borderColor
        	},'fast');
        });
    };
}]);

ifpDirectives.directive('ifpSvg',['$animate',function(){
    return function(scope,element,attr){
    	console.info('ifpDirectives.ifpSvg',scope);
    	
        if(typeof scope.floorPlan != 'undefined'){
    		console.info('ifpDirectives.ifpSvg',scope.floorPlan);
    		
			svgdisplay = element;
            
            var evDisplay = Raphael(svgdisplay[0],'100%','100%');
            var floorplan = scope.floorPlan;
            var hallFill = '#000000';
            
            $(floorplan).each(function() {
                if(this.type == 'polygon' || this.type == 'path' || this.type == "polyline"){
                    var currentPath = evDisplay.path(this.points);  
                    currentPath.attr( { "fill": this.fill, "stroke-width" : this.strokeWidth, "stroke" : this.stroke } );
                }
                else if(this.type == "rectangle"){
                    var currentPath = evDisplay.rect(this.x,this.y,this.width,this.height);
                    currentPath.attr( { "fill": this.fill, "stroke-width" : this.strokeWidth, "stroke" : this.stroke } );
                }
                else if(this.type == "line"){
                    var currentPath = evDisplay.path(['M',this.x1,this.y1,'L',this.x2,this.y2]);
                    currentPath.attr( { "fill": this.fill, "stroke-dasharray" : "0", "stroke" : "#000000" } );
                }
                else if(this.type == "text"){
                    var currentPath = evDisplay.text(this.transform[4],this.transform[5],this.text);
                    currentPath.attr({"font-family": 'Times New Roman',"font-size": '8','stroke-width': '0','stroke-opacity': '1','fill': '#000000'});
                }   
            });
            evDisplay.setViewBox(0,0,400,300);
            evDisplay.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');;
            /*
            
            $(keyplan.Hall).each(function() {
                if(this.type == 'polygon' || this.type == 'path' || this.type == "polyline"){
                    var currentPath = kpDisplay.path(this.points);  
                    currentPath.attr( { "fill": hallFill, "stroke-width" : ".50", "stroke" : "#000000" } );
                }
                else if(this.type == "rectangle"){
                    var currentPath = kpDisplay.rect(this.x,this.y,this.width,this.height);
                    currentPath.attr( { "fill": hallFill, "stroke-width" : ".50", "stroke" : "#000000" } );
                }
                else if(this.type == "line"){
                    var currentPath = kpDisplay.path(['M',this.x1,this.y1,'L',this.x2,this.y2]);
                    currentPath.attr( { "fill": 'none', "stroke-dasharray" : "0", "stroke" : "#000000" } );
                }
                else if(this.type == "text"){
                    var currentPath = kpDisplay.text(this.transform[4],this.transform[5],this.text);
                    currentPath.attr({"font-family": 'Times New Roman',"font-size": '8','stroke-width': '0','stroke-opacity': '1','fill': '#000000'});
                }   
            });
            
            var that = scope.bt;
                 
            $(keyplan.Units).each(function() {
                
                if(this.type == 'polygon' || this.type == 'path' || this.type == "polyline") {
                    var currentPath = kpDisplay.path(this.points);
                }
                else {              
                    var currentPath = kpDisplay.rect(this.x,this.y,this.width,this.height);
                }
                
                currentPath.size = 'regular';
                
                currentPath.attr(inActiveAttr); 
            
                var path_name = (typeof this.id == 'undefined')?'':this.id.replace(/(.*)\_/,'');
    
                if(path_name != '') {
                        
                    currentPath.id = path_name;
                    // find this unit in the result's array by name.
                    // if the unit's vacancy is unoccupied
                    // make this unit clickable.
                    var unit = that.units[path_name];
                    
                    if(typeof unit == 'undefined') {
                        console.log(unit);
                        console.log(path_name);
                        return;
                    }
                    
                    var path_instance = that;
                    var current_path_name = unit['Unit']['MarketingName'];
                    
                    if (unit['Unit']['Information']['UnitLeasedStatus'] == "available")
                    {
                        //that.kUnits.push(currentPath);
                        currentPath.attr(activeAttr);   
                        
                        if(current_path_name == that.currentUnitName && size == "thumbnail")
                        {
                            currentPath.attr({
                                "fill"          : scope.bt.getConfigVal('keyplanAvailableHoverColor')
                            }); 
                        }
                        else {
                            currentPath.hover(function() {
                                scope.hoverUnit = this.id;
                                this.animate({"fill"    : scope.bt.getConfig().keyplanAvailableHoverColor   }, 250, ">");
                                scope.hovered = true;
                                
                                scope.$apply();
                            },function() {
                                scope.hoverUnit = this.id;
                                this.animate({"fill"    : scope.bt.getConfig().keyplanAvailableColor   }, 250, ">");
                                scope.hovered = false;
                                scope.$apply();
                            });
                        }
                    }
                    else {
                        currentPath.hover(function() {
                                scope.hoverUnit = this.id;
                                scope.hovered = true;
                                scope.$apply();
                            },
                            function() {
                                scope.hoverUnit = this.id;
                                scope.hovered = false;
                                scope.$apply();
                                //path_instance.onComplete(   path_instance.events.KEYPLAN_UNIT_OUT, { "unitName" : this.id, "size" : this["size"] } );
                            }
                        );
                    }
                    
                        
                    currentPath.click(function()
                    {
                        // set the building tour's current unit name
                        path_instance.currentUnitName   = current_path_name;
                        window.location ='#/apartment/'+current_path_name;
                    });
                }
                else {
                        currentPath.attr( { "fill": scope.bt.getConfig().keyplanDefaultColor  } );
                }
           });*/
        }
    };
}]);