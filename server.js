var youstream = require('youstream');
var fs = require('fs');
var http = require('http');

//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
    url = "www.youtube.com/watch?v=Wch3gJG2GJ4";
    path = "static/test";
    var video = youstream(url);
  	var output = fs.createWriteStream(path);
  	video.pipe(output);

}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});