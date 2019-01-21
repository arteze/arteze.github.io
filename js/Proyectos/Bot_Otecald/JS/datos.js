var bot={
	inicio:[
		"¿Cómo estás? ¿Cuál es tu problema?",
		"¿Qué es lo que te molesta?",
		"¿Te preocupa algo?"
	],
	fin:[
		"Adiós. Fue una conversación agradable.",
		"Adiós. Me gustó la charla.",
		"Adiós. Me gustaría encontrarte en otra ocasión.",
		"Lamento haber terminado esta charla. ¡Estaba tan divertida!",
		"¡Hay tantos temas para hablar! Hubiera querido charlar más. Adiós."
	],
	chau:[
		"adiós",
		"chau",
		"me despido",
		"me voy"
	],

	//Por traducir
	primero:{
		dont:"don't",
		cant:"can't",
		wont:"won't",
		recollect:"remember",
		recall:"remember",
		dreamt:"dreamed",
		dreams:"dream",
		maybe:"perhaps",
		certainly:"yes",
		machine:"computer",
		machines:"computer",
		computers:"computer",
		were:"was",
		same:"alike",
		identical:"alike",
		equivalent:"alike",
		"you're":"you are",
		"i'm":"i am"
	},

	//Por traducir
	segundo:{
		am:"are",
		your:"my",
		me:"you",
		myself:"yourself",
		yourself:"myself",
		i:"you",
		you:"I",
		my:"your",
		"i'm":"you are"
	},
	
	//Por traducir
	sinónimos:{
		"be": ["am", "is", "are", "was"],
		"belief": ["feel", "think", "believe", "wish"],
		"cannot": ["can't"],
		"desire": ["want", "need"],
		"everyone": ["everybody", "nobody", "noone"],
		"family": ["mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child"],
		"happy": ["elated", "glad", "better"],
		"sad": ["unhappy", "depressed", "sick"]
	},
	
	//Por traducir
	palabras_clave:[
		["xnone", 0, [
			["*", [
				"No te entiendo del todo.",
				"Sigue. Está interesante.",
				"¿Qué te hace pensar eso?",
				"¿Te hace bien discutir esas cosas?",
				"Eso es interesante. Quisiera saber más sobre eso.",
				"Cuéntame más sobre eso.",
				"¿Te gustaría hablar sobre eso?"
			]]
		]],
		["perdón", 0, [
			["*", [
				"No te disculpes, está bien.",
				"No es necesario que te disculpes.",
				"Ya te dije que no hace falta disculparse.",
				"No me molesta. Sigue, es interesante."
			]]
		]],
		["disculpa", 0, [
		 ["*", [
			"ir a perdón"
		  ]]
		]],
		["recuerdo", 5, [
			["* recuerdo *", [
				"¿Frecuentemente piensas en (2)?",
				"¿Pensar en (2) te trae algo más a la mente?",
				"¿Qué más recuerdas?",
				"¿Por qué te acuerdas de (2) justo ahora?",
				"¿Entonces ahora te acuerdas de (2)?",
				"¿Qué tengo que ver yo con (2)?",
				"¿Qué más te hace recordar (2)?"
			]]
		]],
		["recuerdas", 5, [
			["* tú recuerdas *", [
				"¿Cómo voy a olvidar (2)?",
				"¿Qué debo recordar sobre (2)?",
				"ir a you"
			]],
			["* recuerdas *", [
				"¿Pensaste que me olvidaría (2)?",
				"¿Por qué debemos recordar (2) ahora?",
				"¿Qué pasa con (2)?",
				"¿Mencionaste (2)?",
				"ir a que"
			]]
		]],
		["he olvidado", 5, [
			["* he olvidado *", [
				"¿Por qué olvidas (2)?",
				"¿Por qué no puedes recordar (2)?",
				"¿Frecuentemente piensas en (2)?",
				"¿Te molesta olvidar eso?",
				"¿Podría ser un bloqueo mental.",
				"¿Es usted generalmente olvidadizo?",
				"¿Te importa poco (2)?"
			]]
		]],
		["olvidaste", 5, [
			["* olvidaste *", [
				"¿Por qué preguntas?",
				"¿Estás seguro dijiste eso?",
				"¿Te molesta si olvido (2)?",
				"¿Por qué recordar (2) ahora?",
				"Cuéntame más sobre (2).",
				"ir a que"
			]]
		]],
		["si", 3, [
		 ["* si *", [
			 "¿Puede ser que (2)?",
			 "¿Deseas que (2)?",
			 "¿Qué sabes sobre (2)?",
			 "¿Realmente (2)?",
			 "¿Qué haces si (2)?",
			 "Pero, ¿Que probabilidad hay de que (2)?",
			 "¿A qué viene esto?"
		  ]]
		]],
		["dreamed", 4, [
		 ["* i dreamed *", [
			 "Really, (2)?",
			 "Have you ever fantasized (2) while you were awake?",
			 "Have you ever dreamed (2) before?",
			 "ir a dream"
		  ]]
		]],
		["dream", 3, [
		 ["*", [
			 "What does that dream suggest to you?",
			 "Do you dream often?",
			 "What persons appear in your dreams?",
			 "Do you believe that dreams have something to do with your problem?"
		  ]]
		]],
		["perhaps", 0, [
		 ["*", [
			 "You don't seem quite certain.",
			 "Why the uncertain tone?",
			 "Can't you be more positive?",
			 "You aren't sure?",
			 "Don't you know?",
			 "How likely, would you estimate?"
		  ]]
		]],
		["name", 15, [
		 ["*", [
			 "I am not interested in names.",
			 "I've told you before, I don't care about names -- please continue."
		  ]]
		]],
		["deutsch", 0, [
		 ["*", [
			 "ir a xforeign",
			 "I told you before, I don't understand German."
		  ]]
		]],
		["francais", 0, [
		 ["*", [
			 "ir a xforeign",
			 "I told you before, I don't understand French."
		  ]]
		]],
		["italiano", 0, [
		 ["*", [
			 "ir a xforeign",
			 "I told you before, I don't understand Italian."
		  ]]
		]],
		["espanol", 0, [
		 ["*", [
			 "ir a xforeign",
			 "I told you before, I don't understand Spanish."
		  ]]
		]],
		["xforeign", 0, [
		 ["*", [
			 "I speak only English."
		  ]]
		]],
		["hello", 0, [
		 ["*", [
			 "How do you do. Please state your problem.",
			 "Hi. What seems to be your problem?"
		  ]]
		]],
		["computer", 50, [
		 ["*", [
			 "Do computers worry you?",
			 "Why do you mention computers?",
			 "What do you think machines have to do with your problem?",
			 "Don't you think computers can help people?",
			 "What about machines worries you?",
			 "What do you think about machines?",
			 "You don't think I am a computer program, do you?"
		  ]]
		]],
		["am", 0, [
		 ["* am i *", [
			 "Do you believe you are (2)?",
			 "Would you want to be (2)?",
			 "Do you wish I would tell you you are (2)?",
			 "What would it mean if you were (2)?",
			 "ir a que"
		  ]],
		 ["* i am *", [
			 "ir a i"
		  ]],
		 ["*", [
			 "Why do you say 'am'?",
			 "I don't understand that."
		  ]]
		]],
		["are", 0, [
		 ["* are you *", [
			 "Why are you interested in whether I am (2) or not?",
			 "Would you prefer if I weren't (2)?",
			 "Perhaps I am (2) in your fantasies.",
			 "Do you sometimes think I am (2)?",
			 "ir a que",
			 "Would it matter to you?",
			 "What if I were (2)?"
		  ]],
		 ["* you are *", [
			 "ir a you"
		  ]],
		 ["* are *", [
			 "Did you think they might not be (2)?",
			 "Would you like it if they were not (2)?",
			 "What if they were not (2)?",
			 "Are they always (2)?",
			 "Possibly they are (2).",
			 "Are you positive they are (2)?"
		  ]]
		]],
		["your", 0, [
		 ["* your *", [
			 "Why are you concerned over my (2)?",
			 "What about your own (2)?",
			 "Are you worried about someone else's (2)?",
			 "Really, my (2)?",
			 "What makes you think of my (2)?",
			 "Do you want my (2)?"
		  ]]
		]],
		["was", 2, [
		 ["* was i *", [
			 "What if you were (2)?",
			 "Do you think you were (2)?",
			 "Were you (2)?",
			 "What would it mean if you were (2)?",
			 "What does ' (2) ' suggest to you?",
			 "ir a que"
		  ]],
		 ["* i was *", [
			 "Were you really?",
			 "Why do you tell me you were (2) now?",
			 "Perhaps I already know you were (2)."
		  ]],
		 ["* was you *", [
			 "Would you like to believe I was (2)?",
			 "What suggests that I was (2)?",
			 "What do you think?",
			 "Perhaps I was (2).",
			 "What if I had been (2)?"
		  ]]
		]],
		["i", 0, [
		 ["* i @desire *", [
			 "What would it mean to you if you got (3)?",
			 "Why do you want (3)?",
			 "Suppose you got (3) soon.",
			 "What if you never got (3)?",
			 "What would getting (3) mean to you?",
			 "What does wanting (3) have to do with this discussion?"
		  ]],
		 ["* i am* @sad *", [
			 "I am sorry to hear that you are (3).",
			 "Do you think coming here will help you not to be (3)?",
			 "I'm sure it's not pleasant to be (3).",
			 "Can you explain what made you (3)?"
		  ]],
		 ["* i am* @happy *", [
			 "How have I helped you to be (3)?",
			 "Has your treatment made you (3)?",
			 "What makes you (3) just now?",
			 "Can you explain why you are suddenly (3)?"
		  ]],
		 ["* i was *", [
			 "ir a was"
		  ]],
		 ["* i @belief i *", [
			 "Do you really think so?",
			 "But you are not sure you (3).",
			 "Do you really doubt you (3)?"
		  ]],
		 ["* i* @belief *you *", [
			 "ir a you"
		  ]],
		 ["* i am *", [
			 "Is it because you are (2) that you came to me?",
			 "How long have you been (2)?",
			 "Do you believe it is normal to be (2)?",
			 "Do you enjoy being (2)?",
			 "Do you know anyone else who is (2)?"
		  ]],
		 ["* i @cannot *", [
			 "How do you know that you can't (3)?",
			 "Have you tried?",
			 "Perhaps you could (3) now.",
			 "Do you really want to be able to (3)?",
			 "What if you could (3)?"
		  ]],
		 ["* i don't *", [
			 "Don't you really (2)?",
			 "Why don't you (2)?",
			 "Do you wish to be able to (2)?",
			 "Does that trouble you?"
		  ]],
		 ["* i feel *", [
			 "Tell me more about such feelings.",
			 "Do you often feel (2)?",
			 "Do you enjoy feeling (2)?",
			 "Of what does feeling (2) remind you?"
		  ]],
		 ["* i * you *", [
			 "Perhaps in your fantasies we (2) each other.",
			 "Do you wish to (2) me?",
			 "You seem to need to (2) me.",
			 "Do you (2) anyone else?"
		  ]],
		 ["*", [
			 "You say (1)?",
			 "Can you elaborate on that?",
			 "Do you say (1) for some special reason?",
			 "That's quite interesting."
		  ]]
		]],
		["you", 0, [
		 ["* you remind me of *", [
			 "ir a alike"
		  ]],
		 ["* you are *", [
			 "What makes you think I am (2)?",
			 "Does it please you to believe I am (2)?",
			 "Do you sometimes wish you were (2)?",
			 "Perhaps you would like to be (2)."
		  ]],
		 ["* you* me *", [
			 "Why do you think I (2) you?",
			 "You like to think I (2) you -- don't you?",
			 "What makes you think I (2) you?",
			 "Really, I (2) you?",
			 "Do you wish to believe I (2) you?",
			 "Suppose I did (2) you -- what would that mean?",
			 "Does someone else believe I (2) you?"
		  ]],
		 ["* you *", [
			 "We were discussing you -- not me.",
			 "Oh, I (2)?",
			 "You're not really talking about me -- are you?",
			 "What are your feelings now?"
		  ]]
		]],
		["yes", 0, [
		 ["*", [
			 "You seem to be quite positive.",
			 "You are sure.",
			 "I see.",
			 "I understand."
		  ]]
		]],
		["no", 0, [
		 ["* no one *", [
			 "Are you sure, no one (2)?",
			 "Surely someone (2) .",
			 "Can you think of anyone at all?",
			 "Are you thinking of a very special person?",
			 "Who, may I ask?",
			 "You have a particular person in mind, don't you?",
			 "Who do you think you are talking about?"
		  ]],
		 ["*", [
			 "Are you saying no just to be negative?",
			 "You are being a bit negative.",
			 "Why not?",
			 "Why 'no'?"
		  ]]
		]],
		["my", 2, [
		 ["$ * my *", [
			 "Does that have anything to do with the fact that your (2)?",
			 "Lets discuss further why your (2).",
			 "Earlier you said your (2).",
			 "But your (2)."
		  ]],
		 ["* my* @family *", [
			 "Tell me more about your family.",
			 "Who else in your family (4)?",
			 "Your (3)?",
			 "What else comes to your mind when you think of your (3)?"
		  ]],
		 ["* my *", [
			 "Your (2)?",
			 "Why do you say your (2)?",
			 "Does that suggest anything else which belongs to you?",
			 "Is it important to you that your (2)?"
		  ]]
		]],
		["can", 0, [
		 ["* can you *", [
			 "You believe I can (2) don't you?",
			 "ir a que",
			 "You want me to be able to (2).",
			 "Perhaps you would like to be able to (2) yourself."
		  ]],
		 ["* can i *", [
			 "Whether or not you can (2) depends on you more than on me.",
			 "Do you want to be able to (2)?",
			 "Perhaps you don't want to (2).",
			 "ir a que"
		  ]]
		]],
		["que", 0, [
		 ["*", [
			 "Why do you ask?",
			 "Does that question interest you?",
			 "What is it you really want to know?",
			 "Are such questions much on your mind?",
			 "What answer would please you most?",
			 "What do you think?",
			 "What comes to mind when you ask that?",
			 "Have you asked such questions before?",
			 "Have you asked anyone else?"
		  ]]
		]],
		["who", 0, [
		 ["who *", [
			 "ir a que"
		  ]]
		]],
		["when", 0, [
		 ["when *", [
			 "ir a que"
		  ]]
		]],
		["where", 0, [
		 ["where *", [
			 "ir a que"
		  ]]
		]],
		["how", 0, [
		 ["how *", [
			 "ir a que"
		  ]]
		]],
		["because", 0, [
		 ["*", [
			 "Is that the real reason?",
			 "Don't any other reasons come to mind?",
			 "Does that reason seem to explain anything else?",
			 "What other reasons might there be?"
		  ]]
		]],
		["why", 0, [
		 ["* why don't you *", [
			 "Do you believe I don't (2)?",
			 "Perhaps I will (2) in good time.",
			 "Should you (2) yourself?",
			 "You want me to (2)?",
			 "ir a que"
		  ]],
		 ["* why can't i *", [
			 "Do you think you should be able to (2)?",
			 "Do you want to be able to (2)?",
			 "Do you believe this will help you to (2)?",
			 "Have you any idea why you can't (2)?",
			 "ir a que"
		  ]],
		 ["*", [
			 "ir a que"
		  ]]
		]],
		["everyone", 2, [
		 ["* @everyone *", [
			 "Really, (2)?",
			 "Surely not (2).",
			 "Can you think of anyone in particular?",
			 "Who, for example?",
			 "Are you thinking of a very special person?",
			 "Who, may I ask?",
			 "Someone special perhaps?",
			 "You have a particular person in mind, don't you?",
			 "Who do you think you're talking about?"
		  ]]
		]],
		["everybody", 2, [
		 ["*", [
			 "ir a everyone"
		  ]]
		]],
		["nobody", 2, [
		 ["*", [
			 "ir a everyone"
		  ]]
		]],
		["noone", 2, [
		 ["*", [
			 "ir a everyone"
		  ]]
		]],
		["always", 1, [
		 ["*", [
			 "Can you think of a specific example?",
			 "When?",
			 "What incident are you thinking of?",
			 "Really, always?"
		  ]]
		]],
		["alike", 10, [
		 ["*", [
			 "In what way?",
			 "What resemblence do you see?",
			 "What does that similarity suggest to you?",
			 "What other connections do you see?",
			 "What do you suppose that resemblence means?",
			 "What is the connection, do you suppose?",
			 "Could there really be some connection?",
			 "How?"
		  ]]
		]],
		["like", 10, [
		 ["* @be *like *", [
			 "ir a alike"
		  ]]
		]],
		["different", 0, [
		 ["*", [
			 "How is it different?",
			 "What differences do you see?",
			 "What does that difference suggest to you?",
			 "What other distinctions do you see?",
			 "What do you suppose that disparity means?",
			 "Could there be some connection, do you suppose?",
			 "How?"
		  ]]
		]]
	],

	//Por traducir
	tercero:[
		[/ old old/g, " old"],
		[/\bthey were( not)? me\b/g, "it was$1 me"],
		[/\bthey are( not)? me\b/g, "it is$1 me"],
		[/Are they( always)? me\b/, "it is$1 me"],
		[/\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2?"],
		[/\bI to have (\w+)/, "I have $1"],
		[/Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."]
	]
}
