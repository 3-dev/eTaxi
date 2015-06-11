var socket;

function init(){
  var host = "ws://localhost:1011";
  try{
    socket = new WebSocket(host);
   // log('&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;----  Connexion au serveur .... ');
    socket.onopen    = function(msg){ 
      //  log('&nbsp; &nbsp; &nbsp;&nbsp;&nbspConnexion etablie avec succes .... ');
      //$("status").innerHTML=socket.readyState;
    };
    socket.onmessage = function(msg)
    {
       
        var data =JSON.parse(msg.data);
        
        if((data.action)=='connexion')
        {
           
            var info  = (data.info);
            /*$("nom").innerHTML=info.nom;
            $("pren").innerHTML=info.prenom;
            $("cont").innerHTML=info.contact;
            $("pos").innerHTML= info.type;
            
            $("userinfo").style.display='block';
            $("connexion").style.display='none';
            $("message").style.display='block';
            */
        }
        else
        {
             log(data.nom +'  a di : '+data.text);
        }
       
    };
    socket.onclose   = function(msg){ log("Disconnected - status "+this.readyState); };
  }
  catch(ex){ log(ex); }
  //$("msg").focus();
}

function send(){
  var txt,msg,login,loginVal;
  txt = $("msg");
  login = $("login");
  
  msg = txt.value;
  loginVal = login.value;
  
  data = {'action':'message','msg':msg};
  
  if(!msg){ alert("Message can not be empty"); return; }
  txt.value="";
  txt.focus();
  try{ 
      socket.send(JSON.stringify(data));
      log('Envoye: '+msg); 
  } catch(ex){ log(ex); }
}

function connect(){
  var txt,pass,login,loginVal,type,typeVal;
  txt = $("pass");
  login = $("login");
  type = $("type");
  
  pass = txt.value;
  loginVal = login.value;
  typeVal = type.value
  
  var data = {'action':'connexion','pass':pass,'login':loginVal,'type':typeVal};
  try{ 
      socket.send(JSON.stringify(data));
    //  log('Sent: '+data.action); 
  } catch(ex){ log(ex); }
}

function envoyerPosition(){
 
  
  var data = {'action':'positionetaxi',info:{'lat':5.36437,'long':-3.9558,'taxi':'typeVal'}};
  try{ 
      socket.send(JSON.stringify(data));
     // alert(JSON.stringify(data));
    //  log('Sent: '+data.action); 
  } catch(ex){ log(ex); }
}

function connect(){
  var txt,pass,login,loginVal,type,typeVal;
  txt = $("pass");
  login = $("login");
  type = $("type");
  
  pass = txt.value;
  loginVal = login.value;
  typeVal = type.value
  
  data = {'action':'connexion','pass':pass,'login':loginVal,'type':typeVal};
  try{ 
      socket.send(JSON.stringify(data));
    //  log('Sent: '+data.action); 
  } catch(ex){ log(ex); }
}
function quit(){
  log("Goodbye!");
  socket.close();
  socket=null;
}

// Utilities
function $(id){ return document.getElementById(id); }
function log(msg){ $("log").innerHTML+="<br>"+msg; }
function onkey(event){ if(event.keyCode==13){ send(); } }
