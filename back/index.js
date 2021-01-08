const express = require('express');

const app = express();

const server = app.listen(3001, function()
{
	console.log('server running on port 3001');
});

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', function(socket)
{
	socket.on('CARD_RETURNED', function({ name, isBack })
	{
		console.log(name, isBack, socket.id);
		io.emit('CARD_RETURNED_' + name, isBack);
	});
});
