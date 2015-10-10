
var fs = require('fs');
var http = require('http');
var ytdl = require('ytdl-core');

//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(req, res){

var fs = require('fs');
url = 'www.youtube.com/watch?v=a1Y73sPHKxw';
save_as = url.split('?')[1].split('=')[1]+'.mp4';
test = "10-minute tour of pandas-59324550.mp4";
/*
// code to download the video
ytdl(url, { filter: function(format) { return format.container === 'mp4'; } })
  .pipe(fs.createWriteStream('static/'+save_as));
*/
/*
var range = req.headers.range;
var positions = range.replace(/bytes=/, "").split("-");
var start = parseInt(positions[0], 10);
var end = partialend ? parseInt(partialend, 10) : total - 1;
var chunksize = (end-start)+1;
var total = movie_mp4.length;

if(reqResource == "/movie.mp4"){
  res.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total, 
                        "Accept-Ranges": "bytes",
                        "Content-Length": chunksize,
                        "Content-Type":"video/mp4"});
  res.end(movie_mp4.slice(start, end+1), "binary");
}

fs.readFile(__dirname + '/static/' + test, function(err, data){
        response.end(data);
    });
*/
//COMMENT AFTER THIS WORKS:
/*
// The filename is simple the local directory and tacks on the requested url
var filename = __dirname+'/static/'+ test; //req.url;

// This line opens the file as a readable stream
var readStream = fs.createReadStream(filename);

// This will wait until we know the readable stream is actually valid before piping
readStream.on('open', function () {
// This just pipes the read stream to the response object (which goes to the client)
readStream.pipe(res);
});

// This catches any errors that happen while creating the readable stream (usually invalid names)
readStream.on('error', function(err) {
res.end(err);
});
*/

//TILL HERE

var path = __dirname + '/static/' + test
    , stat = fs.statSync(path)
    , total = stat.size

  if (req.headers['range']) {
    var range = req.headers.range
      , parts = range.replace(/bytes=/, "").split("-")
      , partialstart = parts[0]
      , partialend = parts[1]
      , start = parseInt(partialstart, 10)
      , end = partialend ? parseInt(partialend, 10) : total-1
      , chunksize = (end-start)+1

    //console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize)

    var file = fs.createReadStream(path, {start: start, end: end})

    res.writeHead(206
                 , { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total
                   , 'Accept-Ranges': 'bytes', 'Content-Length': chunksize
                   , 'Content-Type': 'video/mp4'
                   })
    file.pipe(res)
  }
  else {
    console.log('ALL: ' + total)
    res.writeHead(200
                 , { 'Content-Length': total
                   , 'Content-Type': 'video/mp4'
                   })
    fs.createReadStream(path).pipe(res)
  }



}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

/*
var http = require("http");
var vidStreamer = require("vid-streamer");

var newSettings = {
    rootPath: "static/",
}

var app = http.createServer(vidStreamer.settings(newSettings));
app.listen(8080);
console.log("VidStreamer.js up and running on port 8080");*/