'use strict';
angular.module("devtest").controller("mainController", function ($scope, portAPI) {
    $scope.favorites = new Array();
	$scope.result = null;
	
	//- fill the focusedThumb var, so angular can make changes in the front
	$scope.thumbFocus = function(_thumb){
		$scope.focusedThumb = _thumb;
	};

	//- delete focusedThumb for reverse effects
	$scope.unFocusThumb = function(){
		delete $scope.focusedThumb;
	}

	//-- manage the thumb list display order
	$scope.orderBy = function (field, _id) {
        $scope.orderCrit = field;
        $scope.orderDir = !$scope.orderDir;
        toggleOrderIcon(_id, $scope.orderDir);
    };


	//-- After the user stops typing, sends a request through PortsAPI,
	//--  waits for the response var and sends it to responseHandler
	$scope.search = function(_search_input, _search_type){
    	if(!_search_input)
    		return;

		$scope.thumbList = null;
		$scope.waiting_for_request = true;
		if(_search_type){
			portAPI.getByDirector(_search_input).then(function (response) {
				responseHandler(response);
			}).catch(function(response) {
				responseHandler(response);
		  	});
		}else{
			portAPI.getByTitle(_search_input).then(function (response) {
				responseHandler(response);
			}).catch(function(response) {
				responseHandler(response);
		  	});
		};
	};

	//-- If the response is good (200) it sets the result var to 200, fill the thumbList array with
	//-- the response data. Otherwise sets result to 'error'
	var responseHandler = function(_response){
		$scope.waiting_for_request = false;
		switch(_response.status){
			case 200:
				//-- if the response is an object, make it into an array
				if(_response.data.constructor !== Array){
					$scope.thumbList = new Array();
				}

				//-- throught the checkIfFavorite function test if any of the movies are on the users favorite list
				checkIfFavorite($scope.favorites, _response.data);
				$scope.thumbList = _response.data;
				$scope.result = 200;
				break;
			default:
				$scope.thumbList = null;
				$scope.result = 'error';
		}
	}

	//--activates the favorites stars when the users is in the My Favorites page
	$scope.checkFavorites = function(_favorites){
		checkIfFavorite(_favorites, _favorites);
		$scope.thumbList = _favorites;
		$scope.search_input = null;
	}

	//--favorites or unfavorites a movie, depending on the current movie status,
	//--if the movie is being added to the favorites list, this functions adds an
	//-- instance of the movie object and push it to the Favorites list.
	$scope.manageFavorites = function(_favorites, _data){
		if(_data.is_favorite){
			for(var i = 0; i < _favorites.length; i++) {
			    if(_favorites[i].show_id == _data.show_id) {
			        _favorites.splice(i, 1);
			        break;
			    }
			}
		}else{
			var new_favorite = {
		      "unit": _data.unit,
		      "show_id": _data.show_id,
		      "show_title": _data.show_title,
		      "release_year": _data.release_year,
		      "rating": _data.rating,
		      "category": _data.category,
		      "show_cast": _data.show_cast,
		      "director": _data.director,
		      "summary": _data.summary,
		      "poster": _data.poster,
		      "mediatype": _data.mediatype,
		      "runtime": _data.runtime
		   };

		   $scope.favorites.push(new_favorite);
		};
	};

	//- run through the data and favorites lists to find if a movie is already on My Favorites
	var checkIfFavorite = function(_favorites, _data){
		for(var i = 0; i < _data.length; i++) {

			var result = _favorites.filter(function( obj ) {
			  return obj.show_id == _data[i].show_id;
			});

			if(result.length > 0){
				_data[i].is_favorite = true;
			}
		}
	}
});

var toggleOrderIcon = function (_id, bool){
    var _class = '.order-text:not(#'+_id+')';
    if(bool){
        $('#'+_id).find('.glyphicon').removeClass('glyphicon-triangle-bottom glyphicon-triangle-top');
        $('#'+_id).find('.glyphicon').addClass('glyphicon-triangle-top');
    }else{
        $('#'+_id).find('.glyphicon').removeClass('glyphicon-triangle-bottom glyphicon-triangle-top');
        $('#'+_id).find('.glyphicon').addClass('glyphicon-triangle-bottom');
    }
    $(_class).find('.glyphicon').removeClass('glyphicon-triangle-bottom glyphicon-triangle-top');
};