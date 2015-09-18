angular.module('hefesoft.parse')
.service('parseService', 
	['$q', '$timeout', 'pubNubService', '$ionicLoading', function ($q, $timeout, pubNubService, $ionicLoading) {
	
	
	var dataFactory = {};
	
	dataFactory.error = function(er, promise) {
       
       if(hefesoftLogActivated){
       	alert("Error: " + er.code + " " + er.message);
       	console.log("Error: " + er.code + " " + er.message);
       }
       
       promise.reject(er);
    }
    
    dataFactory.loginFb = function(){
        $ionicLoading.show();
        
        Parse.FacebookUtils.logIn(null, {
          success: function(user) {
            $ionicLoading.hide();
            if (!user.existed()) {
              updateInoProfile(user); 
            } else {
              updateInoProfile(user);
            }
          },
          error: function(user, error) {
            $ionicLoading.hide();
            alert("Error realizando la autorizacions");
          }
        });
    }
    
    function updateInoProfile(user){
      dataFactory.getInfo().then(function(dataUser){
          
          user.set("email", dataUser.email);
          user.set("picture", dataUser.picture);
          user.set("name",  dataUser.name);
          user.save();
          
          pubNubService.initialise(dataUser.email);
      });
    }
    
    dataFactory.getInfo = function(){
        var deferred = $q.defer();
        FB.api('/me', {fields: 'name,email,picture'}, function(response) {
          deferred.resolve(response);
        });
        
        return deferred.promise;
    }
	
	 
	return dataFactory;

}])