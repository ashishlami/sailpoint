let dropdown = document.getElementById('locality-dropdown');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose name';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

//Define headers
var user = "spadmin"; //User must have social group permissions
var password = "admin";
var credentials = window.btoa(user+":"+password);
var url ="http://localhost:8080/identityiq/rest/identities/barack.obama/managedIdentities";
var auth = "Basic "+credentials; //.format(credentials);

//Send get request
var req =  new XMLHttpRequest();
req.open("GET",url, true);
req.setRequestHeader("Content-Type", "application/json");
req.setRequestHeader("Authorization", auth);
req.setRequestHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
req.setRequestHeader("Access-Control-Request-Method", 'PUT, DELETE, POST, GET');
req.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
req.withCredential = true
req.send();
console.log(req)
var data = req.responseText;
console.log(data);
