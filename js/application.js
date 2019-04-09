'use strict';

var app = angular.module( 'app' , [ 'ngRoute' , 'angular-storage','angular-jwt' , 'controllersNavigation' , 'controllersAdmin' , 'controllersSite' , 'myServices' ] );

app.config( [ '$routeProvider' , '$httpProvider' , function( $routeProvider , $httpProvider ) {


	// ================== Admin Documents ====================

    $routeProvider.when( '/admin/documents' , {
        controller : 'documents',
        templateUrl : 'partials/admin/documents.html'
    });

    $routeProvider.when( '/admin/document/edit/:id' , {
        controller: 'documentEdit',
        templateUrl : 'partials/admin/document-edit.html'
    });

    $routeProvider.when( '/admin/document/create' , {
        controller: 'documentCreate',
        templateUrl : 'partials/admin/document-create.html'
    });

    // ================== Admin Notes ====================

    $routeProvider.when( '/admin/notes' , {
        controller : 'notes',
        templateUrl : 'partials/admin/notes.html'
    });

    $routeProvider.when( '/admin/note/edit/:id' , {
        controller: 'noteEdit',
        templateUrl : 'partials/admin/note-edit.html'
    });

    $routeProvider.when( '/admin/note/create' , {
        controller: 'noteCreate',
        templateUrl : 'partials/admin/note-create.html'
    });

	// ================== Admin Users ====================

	$routeProvider.when( '/admin/users' , {
		controller: 'users',
		templateUrl : 'partials/admin/users.html'
	});

	$routeProvider.when( '/admin/user/edit/:id' , {
		controller: 'userEdit',
		templateUrl : 'partials/admin/user-edit.html'
	});

	$routeProvider.when( '/admin/user/create' , {
		controller: 'userCreate',
		templateUrl : 'partials/admin/user-create.html'
	});


	// ================== Site Documents ====================

	$routeProvider.when( '/documents' , {
		controller : 'siteDocuments',
		templateUrl : 'partials/site/documents.html'
	});

	$routeProvider.when( '/document/:id' , {
		controller: 'siteDocument',
		templateUrl : 'partials/site/document.html'
	});

    // ================== Site Notes ====================

    $routeProvider.when( '/notes' , {
        controller : 'siteNotes',
        templateUrl : 'partials/site/notes.html'
    });

    $routeProvider.when( '/note/create' , {
        controller: 'noteCreate',
        templateUrl : 'partials/site/note-create.html'
    });

    $routeProvider.when( '/note/edit/:id' , {
        controller: 'noteEdit',
        templateUrl : 'partials/site/note-edit.html'
    });


	// ================ Login & Register ==================

	$routeProvider.when( '/login' , {
		controller : 'login',
		templateUrl : 'partials/site/login.html'
	});

	$routeProvider.when( '/register' , {
		controller : 'register',
		templateUrl : 'partials/site/register.html'
	});

	// ================== Default ====================

	$routeProvider.otherwise({
		redirectTo: '/login'
	});

}]);


