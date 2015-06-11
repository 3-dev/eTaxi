var res;
var stateConnexion = false;
var myApp = angular.module("eTaxi",[
    
  'ngWebSocket'
  ])
.factory('Messages', function($websocket) {
  //var ws = $websocket('ws://echo.websocket.org/');
  //var ws = $websocket('ws://192.168.1.6:1010/WSEtaxi/etaxi');
  //var ws = $websocket('ws://localhost:1011/WSEtaxi/etaxi?login=client&type=client&pass=client&action=connexion');
  //var ws = $websocket('ws://localhost:1011');
  var ws = $websocket('ws://67.230.191.199:1011');
  var collection = [];

  ws.onMessage(function(event) {
    //alert(event.data);
    console.log('message: ', event);
    
    
    try {
      res = JSON.parse(event.data);
      
    } catch(e) {
      res = {'username': 'anonymous', 'message': event.data};
    }

    collection.push({
      username: res.username,
      content: res.message,
      timeStamp: event.timeStamp
    });
  });

  ws.onError(function(event) {
    console.log('connection Error', event);
  });

  ws.onClose(function(event) {
    console.log('connection closed', event);
  });

  ws.onOpen(function() {
    console.log('connection open');
    /*ws.send('Hello World');
    ws.send('again');
    ws.send('and again');*/
  });
  // setTimeout(function() {
  //   ws.close();
  // }, 500)

  return {
    collection: collection,
    status: function() {
      return ws.readyState;
    },
    send: function(message) {
       
        if (angular.isString(message)) {
        ws.send(message);
      }
      else if (angular.isObject(message)) {
        ws.send(JSON.stringify(message));
      }
    }

  };
})

.config(['$routeProvider', function($routeProvider){
        $routeProvider.
                when('/Login',{templateUrl:'modules/Connexion/login.html', controller:'eTaxiLogin'}).
                when('/Acceuil',{templateUrl:'modules/Acceuil/acceuil.html', controller:'eTaxiAcceuil'}).
                when('/Client',{templateUrl:'modules/Client/index.html', controller:'eTaxiClient'}).
                when('/Gestion',{templateUrl:'modules/Gestion/index.html', controller:'eTaxiGestion'}).
                when('/About',{templateUrl:'modules/About/index.html', controller:'eTaxiAbout'}).
                when('/Admin',{templateUrl:'modules/Administration/index.html', controller:'eTaxiAdmin'}).
                when('/New',{templateUrl:'modules/Client/nouveau.html', controller:'eTaxiNew'}).
                otherwise({redirectTo: '/Acceuil'});
}])

.controller('eTaxiLogin', function($scope,$timeout,Messages){
    $scope.Title = "Authentification";
    
    $scope.typeconnexion="";
    $scope.statusConnexion="";
    $scope.statusUser="connexion";
    
    $scope.Pass="";
    $scope.confirmPass="";
    $scope.checkType= 'proprietaire';
    
    $scope.User = {
        etat:false,
        id_users:0,
        nom_users:"",
        prenom_users:"",
        log_users:"",
        pass_users:"",
        profil_users:"",
        datecreation:"",
        domaine:"A",
        datemodif:"",
        statut:"",
        geler:""
    };
    
    $scope.initialise = function(){
        //$scope.getConfig();
    }
    
    $scope.Connect=function(){
        //alert($scope.User.log_users + $scope.User.pass_users);
        //alert($scope.checkAdmin);
        
        $scope.User.profil_users = $scope.checkType;
        
        
        if ($scope.User.log_users!="" && $scope.User.pass_users!="") 
        {
            

            var data = {'action':"connexion",'pass':$scope.User.pass_users,'login':$scope.User.log_users,'type':$scope.User.profil_users};
            Messages.send(data);
            //$scope.submit(data);
            
            
            $timeout(function() {
                //console.log("res", JSON.stringify(res));
            
                //alert(res);
                if(typeof (res) == 'undefined')
                {
                    //alert('indefini');
                    $scope.User.nom_users = 'anonymous';
                } else{
                    
                    //alert(res.info.nom);
                    $scope.User.nom_users = res.info.nom;
                    if(($scope.User.nom_users != 'anonymous') || ($scope.User.nom_users != '') ){
                        $scope.statusConnexion="succes";
                        
                        $scope.Succes();
                    }
                }
                
            }, 3000);
          
            
        } else {
            $scope.statusConnexion="echec";
            
        }
    }
    
    $scope.Succes=function(){
        //$scope.checkUser();
        if($scope.User.profil_users == 'client' ){
            location.href="#Client";
        } else if($scope.User.profil_users == 'proprietaire'){
            location.href="#Gestion";
        } else if($scope.User.profil_users == 'admin'){
            location.href="#Admin";
        }
       
    }
    
    $scope.checkUser=function(){
        
        if($scope.User.statut==="0" && $scope.User.geler==="non"){
              $scope.statusUser="passe";
              $scope.Infos.etat=true;
              $scope.Infos.message=["Vous etes a votre premiere authentification, veuillez changer votre mot de passe ."];
        }
        
        if($scope.User.statut==="1" && $scope.User.geler==="non"){
     
				if($scope.User.domaine=="H" && $scope.typeconnexion=="Agence"){
					$scope.statusUser="selectAgence";
				}
				
				if($scope.User.domaine=="H" && $scope.typeconnexion=="Holding"){
					location.href="../Holding/index.html";
				}
				
                                  
				if($scope.User.domaine=="A"){
					location.href="index.html";
					
				}
        }
        
        if($scope.User.statut==="1" && $scope.User.geler==="oui"){
               $scope.statusUser="bloque";
        }
        
        if($scope.User.statut==="0" && $scope.User.geler==="oui"){
               $scope.statusUser="expire";
        }
        
    }
    
    /**
     * 
     * new add 
     * ***/
    
  $scope.username = 'anonymous';

  $scope.Messages = Messages;

  $scope.submit = function(new_message) {
    if (!new_message) { return; }
    Messages.send({
      username: $scope.username,
      message: new_message
    });
    $scope.new_message = '';
  };
})

.controller('eTaxiAcceuil', function($scope,Messages){
            
})

.controller('eTaxiClient', function($scope,Messages){
            
})

.controller('eTaxiGestion', function($scope,$timeout,Messages){
    $scope.gestionPanel = false;
    $scope.addChauffeurPanel = true;
    $scope.addVehiculePanel = true;
    $scope.tabChauff = true; 
    $scope.chauffeurs = [];
    $scope.vehicules = [];
    
    var data1 = {'action':"listechauffeur",'info':{"idproprietaire":1}};
    Messages.send(data1);
    
    $timeout(function() {
        //console.log("res", JSON.stringify(res));

        //alert(res);
        if(typeof (res) == 'undefined')
        {
            //alert('indefini');
            
        } else{

            console.log("data1",JSON.stringify(res));

        }
        var data2 = {'action':"listeVehicule",'info':{"idproprietaire":1}};
        Messages.send(data2);
        
        $timeout(function() {
            //console.log("res", JSON.stringify(res));

            //alert(res);
            if(typeof (res) == 'undefined')
            {
                //alert('indefini');

            } else{

                console.log("data2",JSON.stringify(res));

            }

        }, 1000);
    }, 2000);
    
    
    
    
            
         
    $scope.infosChauffClose = function(){
        $('#infosChauff').removeClass('show');
        $('#infosChauff').addClass('hide');
    }
    $scope.modalInfosChauff = function(){
        //alert('click');
        
        $('#infosChauff').removeClass('hide');
        $('#infosChauff').addClass('show');
    }
    $scope.showPanelGestion = function(){
        $scope.gestionPanel = false;
        $scope.addChauffeurPanel = true;
        $scope.addVehiculePanel = true;
    }
    $scope.showPanelAddChauffeur = function(){
        $scope.gestionPanel = true;
        $scope.addChauffeurPanel = false;
        $scope.addVehiculePanel = true;
    }
    $scope.showPanelAddVehicule = function(){
        $scope.gestionPanel = true;
        $scope.addChauffeurPanel = true;
        $scope.addVehiculePanel = false;
    }
            
})

.controller('eTaxiAbout', function($scope,Messages){
            
})

.controller('eTaxiAdmin', function($scope,Messages){
      $scope.submitPro = function(){
          alert('sub');
      }      
})

.controller('eTaxiNew', function($scope,Messages){
            
})

