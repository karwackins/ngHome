'use strict';

var controllersNavigation = angular.module( 'controllersNavigation' , [] );


controllersNavigation.controller( 'navigation' , [ '$scope' , '$location', 'checkToken' , function( $scope , $location, checkToken ){

    if(checkToken.loggedIn())
        $scope.loggedIn = true;
    else
        $scope.loggedIn = false;

	$scope.navigation = function () {
		if ( /^\/admin/.test( $location.path() ) )
			return 'partials/admin/navigation.html';
		else
			return 'partials/site/navigation.html';
	};


	$scope.isActive = function ( path ) {
		return $location.path() === path;
	};

    $scope.logout = function () {
        checkToken.del();
        location.reload();
    }


}]);


