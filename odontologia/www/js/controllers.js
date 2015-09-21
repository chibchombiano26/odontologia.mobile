angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, parseService, pubNubService, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    //parseService.loginFb();
    parseService.loginOpenFb().then(function(result){
      var imagenUsuario = Parse.User.current().get("pictureUrl");
      var email = Parse.User.current().get("email");
      
      pubNubService.initialise(email);
      $state.go("app.browse");
    })
    
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
  ];
})

.controller('userDataCtrl', function($scope){
  $scope.urlPicture = Parse.User.current().get("pictureUrl");
  $scope.name = Parse.User.current().get("name");
  $scope.email = Parse.User.current().get("email");
  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
