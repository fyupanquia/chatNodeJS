var express = require('express'),
	app 	= express(),
	server  = require('http').Server(app),
	io		= require('socket.io')(server)
	
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });
    
	app.use(express.static('client'))

	var messages =[{
		id:1,
		text:'Welcome to the jungle',
		nickname:'fyupanquia'
	}]

	io.on('connection',function(socket){
		console.log(`EL nodo con IP ${socket.handshake.address} se a conectado ...`)
		socket.emit('messages',messages)


		socket.on('add-message',function(data){
			messages.push(data)

			io.sockets.emit('messages',messages)
		})
	})

	server.listen(6677,function(){
		console.log(`Servidor corriendo en http://localhost:6677/`)
	})