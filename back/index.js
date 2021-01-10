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
		for (const card of cardsOnBoard)
		{
			if (card.name === name)
			{
				card.isBack = isBack;

				io.emit('CARD_RETURNED_' + name, isBack);
				return;
			}
		}
	});

	socket.on('INIT_STACK', cards =>
	{
		cardsOnPick = cards;
	});

	socket.on('CARD_FROM_PICK_TO_BOARD', cardName =>
	{
		// TODO: improve => change array to key/value array
		for (let key = 0; key < cardsOnPick.length; key ++)
		{
			if (cardName === cardsOnPick[key].name)
			{
				cardsOnBoard.push(cardsOnPick[key]);
				cardsOnPick.splice(key, 1);

				io.emit('CARD_STACKS', { cardsOnBoard: cardsOnBoard, cardsOnPick: cardsOnPick, cardsOnDiscard: cardsOnDiscard });
				return;
			}
		}
	});

	socket.on('CARD_MOVED', ({ name, x, y, isBack, position }) =>
	{
		for (const card of cardsOnBoard)
		{
			if (card.name === name)
			{
				card.x        = x;
				card.y        = y;
				card.isBack   = isBack;
				card.position = cardsOnBoard.length;

				io.emit('CARD_GO_FRONT', { name, position });
				io.emit('CARD_' + name + '_MOVED', card);
			}
			else if (card.position > position)
			{
				card.position = card.position - 1;
			}
		}
	});
});

const hasBeenInit = function()
{
	return cardsOnBoard.length + cardsOnPick.length + cardsOnDiscard.length > 0;
};
