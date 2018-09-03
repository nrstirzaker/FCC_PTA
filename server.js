'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const dbFunc = require('./db.js');
const ServerConfig = require('./server-config.js');
const Security = require('./security.js');


var port = process.env.PORT || 8080; // set our port


const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({ port: port });
server.register(Inert, () => { });

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

// Add the route
server.route({
    method: 'GET',
    path:'/api/health', 
    handler: function (request, reply) {

        return reply('Health:Server is running');
    }
});

server.route({
    method: 'GET',
    path:'/api', 
    handler: function (request, reply) {

        return reply('Root:Server is running');
    }
});

server.route({
    method: 'POST',
    path:'/api/add', 
    handler: function (request, reply) {

        var fullname = request.payload.fullname;
        var email = request.payload.email;
        var ip = request.payload.ip;

        var encryptedEmail = Security.crypto.encrypt( email ); 
        var encryptedFullname = Security.crypto.encrypt( fullname );
        dbFunc.insertData( encryptedFullname,encryptedEmail,ip );

        reply({'status':'success','message':'Thank you for registering'});
    }
});


// Start the server
server.register(
    {
        register: require('inert')
    },
    function (err) {
        if (err) throw err

        server.start(function (err) {
            console.log('Server started at: ' + server.info.uri)
        })
    }
)


