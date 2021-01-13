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

// Card list by scenario
const scenario = {
	demo: [{ x: 100, y: 100, name: '69', isBack: true, position: 1 },
		   { x: 100, y: 100, name: '42', isBack: true, position: 1 },
		   { x: 100, y: 100, name: '46', isBack: true, position: 1 },
		   { x: 100, y: 100, name: '16', isBack: true, position: 1 },
		   { x: 100, y: 100, name: '35', isBack: true, position: 1 },
		   { x: 100, y: 100, name: '25', isBack: true, position: 1 },
		   { x: 100, y: 100, name: '48', isBack: true, position: 1 },
		   { x: 100, y: 100, name: '21', isBack: true, position: 1 },
		   { x: 100, y: 100, name: '11', isBack: true, position: 1 }],
};

var cardsOnBoard   = [];
var cardsOnPick    = [];
var cardsOnDiscard = [];

io.on('connection', function(socket)
{
	if (!hasBeenInit())
	{
		cardsOnPick  = scenario.demo;
		cardsOnBoard = [{ x: 100, y: 100, name: 'start', isBack: true, position: 1 }];
	}
	socket.emit('CARD_STACKS', { cardsOnBoard: cardsOnBoard, cardsOnPick: cardsOnPick, cardsOnDiscard: cardsOnDiscard });

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

	socket.on('CARD_FROM_PICK_TO_BOARD', cardName =>
	{
		// TODO: improve => change array to key/value array
		for (let key = 0; key < cardsOnPick.length; key ++)
		{
			if (cardName === cardsOnPick[key].name)
			{
				const card = cardsOnPick[key];
				card.x     = 100;
				card.y     = 100;
				cardsOnBoard.push(cardsOnPick[key]);
				cardsOnPick.splice(key, 1);

				const result = { cardsOnBoard: cardsOnBoard, cardsOnPick: cardsOnPick, cardsOnDiscard: cardsOnDiscard };
				io.emit('CARD_STACKS', result);
				return;
			}
		}
	});

	socket.on('CARD_FROM_BOARD_TO_PICK', cardName =>
	{
		// TODO: improve => change array to key/value array
		for (let key = 0; key < cardsOnBoard.length; key ++)
		{
			if (cardName === cardsOnBoard[key].name)
			{
				cardsOnPick.push(cardsOnBoard[key]);
				cardsOnBoard.splice(key, 1);

				const result = { cardsOnBoard: cardsOnBoard, cardsOnPick: cardsOnPick, cardsOnDiscard: cardsOnDiscard };
				io.emit('CARD_STACKS', result);
				return;
			}
		}
	});

	socket.on('CARD_FROM_BOARD_TO_DISCARD', cardName =>
	{
		// TODO: improve => change array to key/value array
		for (let key = 0; key < cardsOnBoard.length; key ++)
		{
			if (cardName === cardsOnBoard[key].name)
			{
				cardsOnDiscard.push(cardsOnPick[key]);
				cardsOnBoard.splice(key, 1);

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
