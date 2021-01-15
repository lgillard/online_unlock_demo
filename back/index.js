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

const buildCard = name =>
{
	return { x: 100, y: 100, name: name, isBack: true, position: 1 };
};

// Card list by scenario
const scenarii = {
	demo: [buildCard('69'),
		   buildCard('42'),
		   buildCard('46'),
		   buildCard('16'),
		   buildCard('35'),
		   buildCard('25'),
		   buildCard('48'),
		   buildCard('21'),
		   buildCard('11')],
	christmas: [buildCard('2'),
				buildCard('51'),
				buildCard('5'),
				buildCard('67'),
				buildCard('14'),
				buildCard('34'),
				buildCard('39'),
				buildCard('69'),
				buildCard('42'),
				buildCard('84'),
				buildCard('92'),
				buildCard('35'),
				buildCard('93'),
				buildCard('86'),
				buildCard('50'),
				buildCard('52'),
				buildCard('63'),
				buildCard('68'),
				buildCard('72'),
				buildCard('99'),
				buildCard('19'),
				buildCard('23'),
				buildCard('78'),
				buildCard('65'),
				buildCard('97')],

};

var cardsOnBoard   = [];
var cardsOnPick    = [];
var cardsOnDiscard = [];

io.on('connection', function(socket)
{
	scenario = '';
	socket.on('SCENARIO_CHOSEN', scenarioChosen =>
	{
		scenario = scenarioChosen;
		if (!hasBeenInit())
		{
			cardsOnPick  = scenarii[scenario];
			cardsOnBoard = [{ x: 100, y: 100, name: 'start', isBack: true, position: 1 }];
		}
		socket.emit('CARD_STACKS', { cardsOnBoard: cardsOnBoard, cardsOnPick: cardsOnPick, cardsOnDiscard: cardsOnDiscard });
	});

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
		moveCardIntoStack(cardsOnPick, cardsOnBoard, cardName);
	});

	socket.on('CARD_FROM_BOARD_TO_PICK', cardName =>
	{
		moveCardIntoStack(cardsOnBoard, cardsOnPick, cardName);
	});

	socket.on('CARD_FROM_BOARD_TO_DISCARD', cardName =>
	{
		moveCardIntoStack(cardsOnBoard, cardsOnDiscard, cardName);
	});

	socket.on('CARD_FROM_DISCARD_TO_BOARD', cardName =>
	{
		moveCardIntoStack(cardsOnDiscard, cardsOnBoard, cardName);
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

				io.emit('CARD_' + name + '_MOVED', card);
			}
			else if (card.position > position)
			{
				card.position = card.position - 1;
			}
		}
		io.emit('CARD_GO_FRONT', { name, position });
	});
});

const hasBeenInit = function()
{
	return cardsOnBoard.length + cardsOnPick.length + cardsOnDiscard.length > 0;
};

const moveCardIntoStack = (from, to, cardName) =>
{
	// TODO: improve => change array to key/value array
	for (let key = 0; key < from.length; key ++)
	{
		if (cardName === from[key].name)
		{
			const card    = from[key];
			card.x        = 100;
			card.y        = 100;
			card.isBack   = true;
			card.position = 1;
			to.push(card);
			from.splice(key, 1);

			const result = { cardsOnBoard: cardsOnBoard, cardsOnPick: cardsOnPick, cardsOnDiscard: cardsOnDiscard };
			io.emit('CARD_STACKS', result);
			return;
		}
	}
};
