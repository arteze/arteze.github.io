// initialize with argument 'true': no random choices
var eliza = new ElizaBot(true);

var exampleLines= [
"Men are all alike.",
"They're always bugging us about something or other.",
"Well, my boyfriend made me come here.",
"He says I'm depressed much of the time.",
"It's true. I am unhappy.",
"I need some help, that much seems certain.",
"Perhaps I could learn to get along with my mother.",
"My mother takes care of me.",
"My father.",
"You are like my father in some ways.",
"You are not very aggressive but I think you don't want me to notice that.",
"You don't argue with me.",
"You are afraid of me.",
"My father is afraid of everybody.",
"Bullies."
];

var exampleCursor=0;

function elizaReset() {
	eliza.reset();
	exampleCursor=0;
}

function elizaNext() {
	if (exampleCursor >= exampleLines.length) {
		alert('Last entry reached.\nClick "Reset" to start over again.');
		return;
	}
	var userinput = exampleLines[exampleCursor++];
	document.forms.eform.edisplay.value += 'USER:  ' + userinput + '\n';
	document.forms.eform.edisplay.value += 'ELIZA: ' + eliza.transform(userinput) + '\n';
}

