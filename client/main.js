var appMod = angular.module("appity", ["ngRoute"]);

appMod.config(function($routeProvider){
	$routeProvider
		.when("/manage", {
			templateUrl: "partials/customizeUsers.html",
			controller: "CustomizeUsersController"
		})
		.when("/list", {
			templateUrl: "partials/userList.html",
			controller: "UserListsController"
		})
		.otherwise({
			redirectTo: "/"
		});
});

appMod.factory("userFactory", function(){
	var factory = {};
	var users = [
		{nameFirst:"Yukihiro", nameLast:"Matsumoto", favLang:"Ruby"},
		{nameFirst:"Ryan", nameLast:"Dahl", favLang:"JavaScript"},
		{nameFirst:"Brendan", nameLast:"Eich", favLang:"JavaScript"},
		{nameFirst:"Brian", nameLast:"Kernighan", favLang:"C"},
		{nameFirst:"Dennis", nameLast:"Ritchie", favLang:"C"}
	];
	factory.index = function(callback){
		callback(users);
	}
	factory.create = function(user){
		if (user && user.nameFirst && user.nameLast && user.favLang) {
			users.push(user);
		}
	}
	factory.delete = function(user){
		users.splice(users.indexOf(user), 1);
	}
	return factory;
});

appMod.controller("CustomizeUsersController", ["$scope", "userFactory", function($scope, userFactory){
	$scope.users = [];
	userFactory.index(function(data){
		$scope.users = data;
	});
	$scope.addUser = function(){
		userFactory.create($scope.user);
		$scope.user = "";
	}
	$scope.removeUser = function(user){
		userFactory.delete(user);
	}
}]);

appMod.controller("UserListsController", ["$scope", "userFactory", function($scope, userFactory){
	$scope.users = [];
	userFactory.index(function(data){
		$scope.users = data;
	});
}]);

appMod.controller("ContainerController", ["$scope", function($scope){
	$scope.sortColumn = "nameLast";
	$scope.sortReverse = false	
	$scope.changeSort = function(col){
		if (col === $scope.sortColumn) {
			$scope.sortReverse = !$scope.sortReverse;
		} else {
			$scope.sortColumn = col;
		}
	}
}]);