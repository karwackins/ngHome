'use strict';

var controllersAdmin = angular.module( 'controllersAdmin' , [ 'myDirectives' ] );

// ------------------------------------------DOCUMENTS----------------------------------------------------

controllersAdmin.controller( 'documents' , [ '$scope' , '$http' , function( $scope , $http ){

    $http.get( 'api/admin/documents/get/' ).
    success( function( data ){
        $scope.documents = data;
    }).error( function(){
        console.log( 'Błąd pobrania pliku json' );
    });

    $scope.delete = function ( document , $index ) {

        if ( !confirm( 'Czy na pewno chcesz usunąć ten dokument?' ) )
            return false;

        $scope.documents.splice( $index , 1 );

        $http.post( '/api/admin/documents/delete/', {
            document: document
        }).
        success( function(){
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });

    };

}]);


controllersAdmin.controller( 'documentEdit' , [ '$scope' , '$http' , '$routeParams', '$timeout' , function( $scope , $http , $routeParams , $timeout){

    var document_id = $routeParams.id;
    $scope.id = document_id;
    $http.get( 'api/admin/documents/get/'+ document_id ).
    success( function( data ){
        $scope.document = data;
    }).error( function(){
        console.log( 'Błąd pobrania pliku json' );
    });
    function getImages() {
        $http.get( '/api/admin/images/get/' + document_id).
        success( function( data ){
            $scope.images = data;
        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });
    }

    getImages();


    $scope.saveChanges = function ( document ) {

        $http.post( '/api/admin/documents/update/', {
            document: document
        }).
        success( function(){
            $scope.success = true;
            $timeout(function() {
                $scope.success = false;
            }, 3000)
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });

        console.log( document );
        console.log( $routeParams.id );
    };
}]);


controllersAdmin.controller( 'documentCreate' , [ '$scope' , '$http' , '$routeParams', '$timeout', function( $scope , $http, $routeParams, $timeout ){
    var document_id = $routeParams.id;
    $scope.createDocument = function ( document ) {
        console.log( $scope.document );
        $http.post( '/api/admin/documents/create/', {
            document: document
        }).
        success( function(){
            $scope.success = true;
            $timeout(function() {
                $scope.success = false;
                $scope.document = {};
            }, 3000)
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });
    };



}]);
// ------------------------------------------NOTES----------------------------------------------------
controllersAdmin.controller( 'notes' , [ '$scope' , '$http' , function( $scope , $http ){

    $http.get( 'api/admin/notes/get/' ).
    success( function( data ){
        $scope.notes = data;
    }).error( function(){
        console.log( 'Błąd pobrania pliku json' );
    });

    $scope.delete = function ( note , $index ) {

        if ( !confirm( 'Czy na pewno chcesz usunąć ta notatkę?' ) )
            return false;

        $scope.notes.splice( $index , 1 );

        $http.post( '/api/admin/notes/delete/', {
            note: note
        }).
        success( function(){
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });

    };

}]);

controllersAdmin.controller( 'noteEdit' , [ '$scope' , '$http' , '$routeParams', '$timeout' , function( $scope , $http , $routeParams , $timeout){

    var note_id = $routeParams.id;
    $scope.id = note_id;
    $http.get( 'api/admin/notes/get/'+ note_id ).
    success( function( data ){
        $scope.note = data;
    }).error( function(){
        console.log( 'Błąd pobrania pliku json' );
    });
    function getImages() {
        $http.get( '/api/admin/images/get/' + note_id).
        success( function( data ){
            $scope.images = data;
        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });
    }

    getImages();

    $scope.saveChanges = function ( note ) {

        $http.post( '/api/admin/note/update/', {
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
}]);


controllersAdmin.controller( 'noteCreate' , [ '$scope' , '$http' , '$routeParams', '$timeout', function( $scope , $http, $routeParams, $timeout ){
    var note_id = $routeParams.id;
    $scope.createNote = function ( note ) {
        console.log( $scope.note );
        $http.post( '/api/admin/notes/create/', {
            note: note
        }).
        success( function(){
            $scope.success = true;
            $timeout(function() {
                $scope.success = false;
                $scope.document = {};
            }, 3000)
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });
    };
}]);
// ------------------------------------------USERS----------------------------------------------------

controllersAdmin.controller( 'users' , [ '$scope' , '$http' , function( $scope , $http ){


    $http.get( 'api/admin/users/get/' ).
    success( function( data ){
        $scope.users = data;
    }).error( function(){
        console.log( 'Błąd pobrania pliku json' );
    });

    $scope.delete = function ( user , $index ) {

        if ( !confirm( 'Czy na pewno chcesz usunąć ten użytkownika?' ) )
            return false;

        $scope.users.splice( $index , 1 );

        $http.post( '/api/admin/users/delete/', {
            user: user
        }).
        success( function(){
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });

    };

}]);


controllersAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams', '$timeout' , function( $scope , $http , $routeParams, $timeout ){

    var user_id = $routeParams.id;
    $scope.id = user_id;
    $http.get( 'api/admin/users/get/'+ user_id ).
    success( function( data ){
        $scope.user = data;
    }).error( function(){
        console.log( 'Błąd pobrania pliku json' );
    });

	$scope.saveChanges = function ( user ) {

        $http.post( '/api/admin/users/update/', {
            user: user,
            name: user.name,
            email: user.email,
            password: user.password,
            passconf: user.passconf
        }).
        success( function(errors){
            if(errors)
            {
                $scope.errors = errors;
            }
            else
            {
                $scope.success = true;
                $timeout(function() {
                    $scope.success = false;
                    $scope.user = {};
                }, 3000)
            }
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });
	};

}]);


controllersAdmin.controller( 'userCreate' , [ '$scope' , '$http', '$timeout' , function( $scope , $http, $timeout ){
    $scope.user = {};
    $scope.user.role = 'user';
    $scope.createUser = function ( user ) {
        $http.post( '/api/admin/users/create/', {
            user: user,
            name: user.name,
            email: user.email,
            password: user.password,
            passconf: user.passconf
        }).
        success( function(errors){
            if(errors)
            {
                $scope.errors = errors;
            }
            else
            {
                $scope.success = true;
                $timeout(function() {
                    $scope.success = false;
                    $scope.user = {};
                }, 3000)
            }
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });
	};

}]);
