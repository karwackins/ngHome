'use strict';


var controllersSite = angular.module( 'controllersSite' , [ 'angularFileUpload' , 'myDirectives' ] );




controllersSite.controller( 'siteDocument' , [ '$scope' , '$http' , '$routeParams', function( $scope , $http , $routeParams){
    var id = $routeParams.id;
	$http.post( 'api/site/documents/get/' + id).
	success( function( data ){
		$scope.document = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});



    function getImages() {
        $http.get( '/api/site/documents/getImages/' + id).
        success( function( data ){
            $scope.images = data;
        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });
    }
    getImages();

}]);


controllersAdmin.controller( 'documentCreate' , [ '$scope' , '$http' , '$routeParams', '$timeout', function( $scope , $http, $routeParams, $timeout ) {
    var document_id = $routeParams.id;
    $scope.createDocument = function (document) {
        $http.post('/api/admin/documents/create/', {
            document: document
        }).success(function () {
            $scope.success = true;
            $timeout(function () {
                $scope.success = false;
                $scope.document = {};
            }, 3000)
        }).error(function () {
            console.log('Błąd komunikacji z API');
        });
        console.log($scope.document);
    };
}]);

controllersAdmin.controller( 'noteCreate' , [ '$scope' , '$http' , '$routeParams', '$timeout','checkToken' , function( $scope , $http, $routeParams, $timeout, checkToken ) {
    var document_id = $routeParams.id;
    $scope.createNote = function (note) {
        $http.post('/api/site/notes/create/', {
            note: note,
            payload: checkToken.payload()
        }).success(function () {
            $scope.success = true;
            $timeout(function () {
                $scope.success = false;
                $scope.note = {};
            }, 3000)
        }).error(function () {
            console.log('Błąd komunikacji z API');
        });
    };
}]);

controllersSite.controller( 'noteEdit' , [ '$scope' , '$http' , '$routeParams' , 'FileUploader' , '$timeout' , function( $scope , $http , $routeParams , FileUploader , $timeout ){

    var note_id = $routeParams.id;
    $scope.id = note_id;
    $http.get( 'api/site/notes/get/'+ note_id ).
    success( function( data ){
        $scope.note = data;
    }).error( function(){
        console.log( 'Błąd pobrania pliku json' );
    });


    $scope.saveChanges = function ( note ) {

        $http.post( '/api/site/notes/update/', {
            note: note
        }).
        success( function(){
            $scope.success = true;
            $timeout(function() {
                $scope.success = false;
            }, 3000)
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });

        console.log( note );
        console.log( $routeParams.id );
    };


    function getImages() {
        $http.get( 'api/admin/images/get/' + note_id ).
        success( function( data ){
            $scope.images = data;
        }).error( function(){
            console.log( 'Błąd połączenia z API' );
        });
    }
    getImages();

    var uploader = $scope.uploader = new FileUploader({
        url : 'api/admin/images/upload/' + note_id
    });

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        getImages();
    };

    $scope.delImage = function ( imageName , $index ) {

        $scope.images.splice( $index , 1 );

        $http.post( 'api/admin/images/del/' , {

            id : note_id,
            image : imageName

        }).success( function(  ){

        }).error( function(){
            console.log( 'Błąd połączenia z API' );
        });

    };


}]);

controllersAdmin.controller( 'siteNotes' , [ '$scope' , '$http', '$location', 'checkToken' , function( $scope , $http, $location, checkToken ){

    if(!checkToken.loggedIn())
    {
        $location.path('/login')
    }

    $http.get( 'api/site/notes/get/' ).
    success( function( data ){
        $scope.notes = data;
    }).error( function(){
        console.log( 'Błąd pobrania pliku json' );
    });
}]);


controllersSite.controller( 'login' , [ '$scope' , '$http' , 'store', 'checkToken','$location' , function( $scope , $http , store, checkToken, $location ){

    if(checkToken.loggedIn())
    {
        $location.path('/notes')
    }
    $scope.user = {};

    $scope.formSubmit = function ( user ) {

        $http.post( 'api/site/user/login/' , {
            email : user.email,
            password : user.password
        }).success( function( data ){

            $scope.submit = true;
            $scope.error = data.error;

            if ( !data.error )
            {
                store.set( 'token' , data.token );
                location.reload();
            }

        }).error( function(){
            console.log( 'Błąd połączenia z API' );
        });

    };

}]);


controllersAdmin.controller( 'register' , [ '$scope' , '$http' , function( $scope , $http ){

    $scope.user = {};
    $scope.formSubmit = function ( user ) {

            $http.post( '/api/site/user/create/', {
                user: user,
                name: user.name,
                email: user.email,
                password: user.password,
                passconf: user.passconf
            }).
            success( function(errors){
            	$scope.submit = true;
            	$scope.user = {};
                if(errors)
                {
                    $scope.errors = errors;
                }
                else
                {
                	$scope.errors = {};
                    $scope.success = true;
                }
            }).error( function(){
                console.log( 'Błąd komunikacji z API' );
            });
	};

}]);