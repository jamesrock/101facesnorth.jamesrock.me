(function() {

	var
	suits = [
		["&clubs;", 1],
		["&hearts;", 1],
		["&spades;", 1],
		["&diams;", 1]
	],
	suitIndex = 0,
	valueToLabelMap = [
		"A", 
		"2", 
		"3", 
		"4", 
		"5", 
		"6", 
		"7", 
		"8", 
		"9", 
		"10", 
		"J", 
		"Q", 
		"K"
	],
	value = 1,
	maxValue = 13,
	numberOfCards = 52,
	inc = 0,
	createStack = function() {

		var
		stack = [];

		while(stack.length<52) {

			stack.push([suitIndex, value, "", false]);

			if(value===maxValue) {
				value = 1;
				suitIndex ++;
			}
			else {
				value ++;
			};

		};

		return stack;

	},
	getLabel = function(value) {

		return valueToLabelMap[value-1];

	},
	stackToHTML = function(stack) {

		var
		stackString = [];

		for(var card in stack) {

			var
			_card = stack[card],
			suit = _card[0],
			suitIcon = suits[suit][0],
			value = _card[1],
			label = getLabel(value),
			red = (suit===1||suit===3),
			name = [label, suitIcon].join(""),
			count = _card[2];

			stackString.push("<div class=\"card\" data-red=\"" + red + "\" data-index=\"" + card + "\" data-selected=\"" + _card[3] + "\"><div class=\"card-name\">" + name + "</div><div class=\"card-count\">" + count + "</div></div>");

		};

		return stackString.join("");

	};

	var
	stack = createStack(),
	stackNode = $("#stack");

	stackNode.html(stackToHTML(stack));

	stackNode.on("click", ".card", function(e) {

		var
		index = $(this).data("index"),
		item = stack[index];

		if(item[3]) {
			return;
		};

		inc ++;

		item[2] = inc;
		item[3] = true;
		stackNode.html(stackToHTML(stack));

		return false;

	});

})();
