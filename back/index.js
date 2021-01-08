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

var cardsOnBoard   = [];
var cardsOnPick    = [];
var cardsOnDiscard = [];

io.on('connection', function(socket)
{
	if (!hasBeenInit())
	{
		// TODO: found a better way, this code smells ...
		socket.emit('CARD_INIT_REQUIRED');
	}
	else
	{
		socket.emit('CARD_STACKS', { cardsOnBoard: cardsOnBoard, cardsOnPick: cardsOnPick, cardsOnDiscard: cardsOnDiscard });
	}

	socket.on('CARD_RETURNED', function({ name, isBack })
	{
		io.emit('CARD_RETURNED_' + name, isBack);
	});

	socket.on('INIT_STACK', cards =>
	{
		cardsOnPick = cards;
	});
});

const hasBeenInit = function()
{
	return cardsOnBoard.length + cardsOnPick.length + cardsOnDiscard.length > 0;
};
