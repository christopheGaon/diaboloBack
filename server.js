/**
 * Created by christophegaon on 15/10/2016.
 */


//Lets require/import the HTTP module
var http = require('http');
var fs = require("fs"),
    path = require("path"),
    util = require("util");


//Lets define a port we want to listen to
const PORT=8080;



//Create a server
var server = http.createServer();


//Lets start our server
server.listen(PORT, function(){

    console.log("Server listening on: http://localhost:%s", PORT);
    //red log file
    fs.readFile(path.join(__dirname,"logs","log.data"), 'utf8',function (err,data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }


        start = [];// start array of  logs
        end = [];// end array of logs
        // format data in tw0 list start , end list
        data.split("\n").forEach(function (val) {
            val = val.substr(1,val.length-2);
            i = val.indexOf(":");
            start.push(Number(val.substr(0,i)));
            end.push(Number(val.substr(i+1,val.length-1)));
        });


        var i=0,j=0,current=0, max =0;

        while( i < start.length && j < end.length )
        {
            if( start[i] < end[j] )
            {
                current++;
                max = Math.max( current, max);
                i++;
            }
            else
            {
                current--;
                j++;
            }
        }
        console.log(max +" simultaneous calls")
    });

});