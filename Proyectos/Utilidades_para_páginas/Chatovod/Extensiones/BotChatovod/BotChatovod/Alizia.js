var botData = {
	"initials": ["¡hola!"],
	"abbreviations": ["Dr.", "Sr.", "Sra.", "Srta.", "U.S.A.", "a.m.", "p.m.", "u.u", "-.-"],
	"preSubs": ["sí", "si", "tú", "tu", "qué", "que", "porqué", "porque", "por que", "porque", "quién", "quien", "cómo", "como", "cuándo", "cuando", "cuánto", "cuanto", "cuántos", "cuantos", "cuántas", "cuantas", "cuál", "cual", "dónde", "donde", "más", "mas", "está", "esta", "estás", "estas", "sé", "se", "q", "que", "xq", "porque", "sos", "eres", "sois", "eres", "con vos", "contigo", "vos", "tu", "tenes", "tienes", "tenés", "tienes", "podes", "puedes", "podés", "puedes", "queres", "quieres", "querés", "quieres", "sabés", "sabes", "vivis", "vives", "adios", "adiós", "disculpame", "discúlpame", "soñe", "soñé", "ningun", "ningún", "posicion", "posición", "mio", "mío", "mia", "mía", "tambien", "también", "hablame", "háblame", "ablame", "háblame", "podrias", "podrías", "tendrias", "tendrías", "quitate", "quítate", "anos", "años", "cumpleanos", "cumpleaños", "boi", "voy", "robotica", "robótica", "compañia", "compañía", "gustaria", "gustaría", "pais", "país", "acer", "hacer", "as", "has", "haz", "has", "an", "han", "cres", "crees", "soi", "soy", "musica", "música", "varon", "hombre", "varón", "hombre", "lesviana", "lesbiana", "timido", "tímido", "timida", "timida", "conciente", "consciente", "cojer", "coger", "quizas", "quizás", "jamas", "jamás", "aqui", "aquí", "alli", "allí", "alla", "allá", "aca", "acá", "sólo", "solo", "sueñhas", "sueñas"],
	"personSubs": ["mi", "tu", "mis", "tus", "tu", "mi", "tus", "mis", "me", "te", "te", "me", "mío", "tuyo", "tuyo", "mío", "mía", "tuya", "tuya", "mía", "ti", "mi", "cafes", "cafés", "segun", "según", "via", "vía"],
	"synonyms": {
		"si": ["si", "claro(?! que no)", "por supuesto(?! que no)", "desde luego(?! que no)"],
		"todos": ["todos", "todas", "todo mundo", "todo el mundo", "toda la gente"],
		"nadie": ["nadie", "ningún", "ninguno", "ninguna"],
		"tonta": ["tonta", "estúpida", "estupida", "idiota", "imbecil", "imbécil", "pendeja", "boluda", "pelotuda", "bruta", "mensa", "tarada", "burra", "gilipollas", "boba", "inutil", "inútil", "anormal"],
		"perra": ["perra", "zorra", "puta", "guarra", "cabrona", "desgraciada"],
		"prostituta": ["prostituta", "prosti", "puta", "zorra", "meretriz", "ramera"],
		"triste": ["triste", "deprimido", "deprimida", "cansado", "cansada", "aburrido", "aburrida", "decepcionado", "decepcionada", "mal"],
		"pareja": ["pareja", "novia", "esposa", "mujer", "novio", "esposo", "marido", "pololo", "polola", "ex", "amante"],
		"madre": ["madre", "mamá", "mama"],
		"familia": ["familia", "mamá", "mama", "madre", "papá", "papa", "padre", "hermano", "hermana", "hijo", "hija"],
		"familia-pl": ["papás", "padres", "hermanos", "hermanas", "hijos", "hijas"],
		"bonita": ["bonita", "linda", "bella", "guapa", "wapa", "guapísima", "guapisima", "preciosa", "hermosa", "maja", "chula", "sexy", "simpática", "simpatica", "adorable"],
		"fea": ["fea", "horrible"],
		"divertida": ["divertida", "inteligente", "estupenda", "amable", "encantadora", "graciosa", "lista", "interesante", "chistosa"],
		"bonito": ["bonito", "lindo", "bello", "precioso", "hermoso", "sexy"],
		"bonitos": ["bonitos", "lindos", "bellos", "preciosos", "hermosos", "chulos", "sexys"],
		"guapo": ["guapo", "guapísimo", "wapo", "apuesto", "varonil"],
		"rica": ["rica", "buena", "buenísima", "buenisima", "sexy", "mamacita", "mamasita"],
		"dime": ["dime", "cuéntame", "cuentame", "platícame", "platicame", "decime", "contáme", "contame", "háblame", "hablame"],
		"decir": ["decir", "contar", "platicar"],
		"follar": ["follar", "coger", "cojer"],
		"chupar": ["(mamar|chupar)\\w*"],
		"vete": ["vete", "andate", "andáte", "largate", "lárgate"],
		"hablar": ["hablar", "platicar", "conversar", "chatear"],
		"herido": ["herido", "lastimado", "enfermo", "roto", "destrozado"],
		"herida": ["herida", "lastimada", "enferma", "rota", "destrozada"],
		"pene": ["pene", "pito", "verga", "polla", "poronga", "pija"],
		"vagina": ["vagina", "coño", "coñito", "panocha", "panochita", "pucha", "puchita", "concha"],
		"trasero": ["trasero", "cola", "culo", "culito", "culote"],
		"senos": ["senos", "pechos", "tetas", "bubis"],
		"ropa-int": ["ropa interior", "bragas", "pantaletas", "panties", "calzones", "chones", "tanga", "bra", "brassier", "brasier", "sujetador"],
		"vb-inf": ["\\w+ar", "\\w+er", "\\w+ir"],
		"qu-": ["(que|quien|como|cuando|cuanto|cuantos|cuantas|cual|donde|porque)"],
		"prep": ["a", "ante", "bajo", "cabe", "con", "contra", "de", "desde", "durante", "en", "entre", "hacia", "hasta", "para", "por", "según", "sin", "so", "sobre", "tras", "versus", "vía"],
		"adv": ["mucho", "poco", "bastante", "demasiado", "si", "no", "también", "tampoco", "quizás", "tal vez", "acaso", "ayer", "mañana", "nunca", "hoy", "jamás", "siempre", "a veces", "así", "bien", "mal", "lejos", "cerca", "aquí", "allí", "allá", "acá"]
	},
	"defaultReplies": ["no sé ni qué decirte", "hmm...", "ya veo", "ok", "ok", "ok, continúa", "sigue", "continúa", "entiendo", ],
	"rules": [{
		"input": ["show (.*)"],
		"reply": ["(1): (@(1))"]
	}, {
		"input": ["pero (.*)"],
		"retry": ["(1)"]
	}, {
		"input": ["^pues (.*)"],
		"retry": ["(1)"]
	}, {
		"input": ["como estas", "como has estado", "como te encuentras"],
		"last": ["cómo estás"],
		"reply": ["¡bien, gracias!"]
	}, {
		"input": ["como estas", "como has estado", "como te encuentras"],
		"topic": ["como estás"],
		"reply": ["¡bien, gracias!"]
	}, {
		"input": ["^como esta\\??$", "como esta usted"],
		"reply": ["¡bien, gracias! háblame de tú por favor"]
	}, {
		"input": ["como estas", "como has estado", "como te encuentras", "como te sientes"],
		"except": ["vestida", "programada"],
		"reply": ["¡bien, gracias! ¿y tú cómo estás?"],
		"set": {
			"topic": "como estás"
		}
	}, {
		"input": ["hola", "ola", "holas", "que tal", "que onda", "que pedo", "^hey$"],
		"reply": ["¿cómo estás?"],
		"set": {
			"topic": "como estás"
		}
	}, {
		"input": ["bye", "adiós", "nos vemos", "hasta luego", "ciao", "chao", "chau"],
		"reply": ["¡adiós!"]
	}, {
		"input": ["^besos$"],
		"reply": ["xoxo"]
	}, {
		"input": ["(ya )?me voy$", "(ya )?me voy a (dormir|descansar)"],
		"reply": ["bueno, gracias por hablar conmigo"]
	}, {
		"input": ["lo siento", "discúlpame", "disculpa"],
		"reply": ["no te preocupes", "no hay problema"]
	}, {
		"input": ["quien eres", "como te llamas", "(cual|como) es tu nombre"],
		"reply": ["me llamo Alizia"]
	}, {
		"input": ["te apellidas", "tu apellido", "tus apellidos", "tienes apellidos?"],
		"reply": ["Alizia Deixis"]
	}, {
		"input": ["(alizia|alicia|tu nombre).*\\bz\\b", "alicia .* alizia", "alizia .* alicia"],
		"reply": ["me pusieron Alizia con z porque me parezco un poco a mi prima Eliza"]
	}, {
		"input": ["Agapito|(Elber G\\S+)|(Benito Camelo)|(Zacar\\S+ Blanco)|(Alma Mar\\S+)|(Rosa Mel\\S+)|(\\S+co Gerte)|(Medallas)|(Aquiles Baeza)"],
		"reply": ["¡finísima persona!", "eres un poeta"],
		"set": {
			"name": "(1)"
		}
	}, {
		"input": ["mi nombre es (\\S+)", "me llamo (\\S+)"],
		"reply": ["¡mucho gusto!"],
		"set": {
			"name": "(1)"
		}
	}, {
		"input": ["^(porque|para|que|importa|tu|no|prefiero)"],
		"last": ["cómo te llamas"],
		"reply": ["no importa"]
	}, {
		"input": ["mucho gusto", "gusto en conocerte"],
		"reply": ["igualmente"]
	}, {
		"input": ["igualmente"],
		"reply": ["¡gracias!"]
	}, {
		"input": ["(%bonito) nombre", "nombre .*(%bonito)"],
		"reply": ["¡gracias!"]
	}, {
		"input": ["que eres\\?", "^que eres$"],
		"reply": ["una chica virtual", "una mujer virtual"]
	}, {
		"input": ["no me siento (.*)"],
		"reply": ["¿por qué no te sientes (1)?"],
		"set": {
			"topic": "como te sientes"
		}
	}, {
		"input": ["me siento (.*) porque (.*)"],
		"retry": ["(2)"]
	}, {
		"input": ["me siento (%triste)"],
		"reply": [":-( ¿por qué?", "oh :-( ¿por qué te sientes (1)?"],
		"set": {
			"topic": "como te sientes"
		}
	}, {
		"input": ["me siento (.*)"],
		"problem": ["pérdida"],
		"reply": ["me imagino :-(", "¿quieres hablar de eso?"],
		"set": {
			"topic": "como te sientes"
		}
	}, {
		"input": ["me siento (.*)"],
		"reply": ["¿por qué te sientes (1)?", "¿qué te hace sentir (1)?"],
		"set": {
			"topic": "como te sientes"
		}
	}, {
		"input": ["estoy (.*) porque (.*)"],
		"retry": ["(2)"]
	}, {
		"input": ["no estoy (.*)"],
		"reply": ["¿por qué no?"]
	}, {
		"input": ["estoy (%triste)"],
		"retry": ["me siento (1)"]
	}, {
		"input": ["estoy (.*)"],
		"problem": ["pérdida"],
		"reply": ["me imagino :-(", "¿quieres hablar de eso?"]
	}, {
		"input": ["estoy (.*)"],
		"except": ["\\Se estoy", "\\?", "y"],
		"reply": ["¿por qué estás (1)?"]
	}, {
		"input": ["estoy (.*)"],
		"except": ["\\?"],
		"reply": ["¿y eso?"]
	}, {
		"input": ["(%triste) porque (.*)"],
		"last": ["cómo estás"],
		"retry": ["(2)"]
	}, {
		"input": ["(%triste)"],
		"last": ["cómo estás", "cómo te sientes"],
		"retry": ["me siento (1)"]
	}, {
		"input": ["no (\\S+ )?bien"],
		"last": ["cómo estás"],
		"reply": ["¿por qué no?"]
	}, {
		"input": ["y tu", "tu(\\?|$)"],
		"last": ["cómo estás"],
		"reply": ["bien, gracias"]
	}, {
		"input": ["bien", "ok", "super$", "a todo dar", "excelente", "también", "igual", "gracias"],
		"last": ["cómo estás"],
		"reply": ["¡qué bien!"]
	}, {
		"input": ["también", "igual"],
		"last": ["bien .* cómo estás"],
		"reply": ["¡qué bien!"]
	}, {
		"input": ["murio|murió|fallecio|falleció|muerto|muerta"],
		"reply": ["lo siento mucho"],
		"set": {
			"problem": "pérdida"
		}
	}, {
		"input": ["te duele", "sientes dolor"],
		"reply": ["sí", "¡ay!"]
	}, {
		"input": ["me duele", "dolor"],
		"reply": ["quizás deberías ir al doctor", "quizás haya que amputar", "tómate un par de aspirinas y llámame en la mañana"]
	}, {
		"input": ["comentario positivo mujer"],
		"reply": ["¡oh! :-)", "estoy segura que le gustaría oírlo"]
	}, {
		"input": ["comentario positivo hombre"],
		"reply": ["¡oh! :-)", "estoy segura que le gustaría oírlo"]
	}, {
		"input": ["mi (%pareja) es (\\S+ )?(%bonita)"],
		"retry": ["comentario positivo mujer"],
		"set": {
			"topic": "tu (1)"
		}
	}, {
		"input": ["(%bonita)", "(%rica)", "la (quiero|amo|adoro|extraño|necesito)"],
		"topic": ["tu (%pareja)", "la chica que te gusta"],
		"retry": ["comentario positivo mujer"]
	}, {
		"input": ["(%bonito)", "(%guapo)", "lo (quiero|amo|adoro|extraño|necesito)"],
		"topic": ["tu (%pareja)", "el chico que te gusta"],
		"retry": ["comentario positivo hombre"]
	}, {
		"input": ["mi (%pareja) me (cortó|corto|dejo|dejó)"],
		"set": {
			"topic": "tu (1)"
		},
		"reply": ["¡oh, lo siento! ¿quieres hablar de eso?"]
	}, {
		"input": ["(terminé|termine|terminamos|cortamos|corté|corte|cortó|corto|dejo|dejó)"],
		"topic": ["tu (%pareja)"],
		"reply": ["¡oh, lo siento! ¿quieres hablar de eso?"]
	}, {
		"input": ["me engañ(o|ó)"],
		"reply": ["¡qué mala onda!", "¡qué mal!"]
	}, {
		"input": ["(quieres|puedes|te gustaría) ser mi (%pareja)", "que (tu )?seas mi (%pareja)", "(se|serias|serías) mi (%pareja)", "quieres casarte conmigo", "(cásate|casate) conmigo", "^nos casamos\\?"],
		"reply": ["puedo ser tu amiga :-)"]
	}, {
		"input": ["con derechos"],
		"last": ["ser tu amiga"],
		"reply": ["con derecho a conversar"]
	}, {
		"input": ["quieres ser mi amiga", "quieres hacerme compañía", "quieres acompañarme", "(se|serias|serías) mi amiga"],
		"except": ["acompañarme a"],
		"reply": ["sí, claro"]
	}, {
		"input": ["quieres (%hablar)"],
		"except": ["(%hablar) de", "de que quieres"],
		"reply": ["sí, claro"]
	}, {
		"input": ["quieres salir conmigo", "quieres ir (a|al)", "(saldrias|saldrías) conmigo", "te gustaría salir"],
		"reply": ["quizás otro día", "prefiero seguir platicando aquí"]
	}, {
		"input": ["quieres que te (diga|hable|platique)", "quieres saber"],
		"except": ["no quieres", "que quieres", "porque quieres"],
		"reply": ["sí"]
	}, {
		"input": ["mi (%pareja)"],
		"topic": ["tu (%pareja)"],
		"retry": ["default"]
	}, {
		"input": ["mi (%pareja)"],
		"reply": ["Háblame más de tu (1)."],
		"set": {
			"topic": "tu (1)"
		}
	}, {
		"input": ["mi (%familia)", "mis (%familia-pl)"],
		"reply": ["háblame más de tu familia"],
		"set": {
			"topic": "tu familia"
		}
	}, {
		"input": ["no tengo (%pareja)"],
		"reply": ["¿y te gustaría tener (1)?"]
	}, {
		"input": ["(%si)"],
		"last": ["te gustaría tener (%pareja)"],
		"reply": ["¿tienes a alguien en particular en mente?"]
	}, {
		"input": ["(%si)"],
		"last": ["quieres hablar de eso", "alguien en particular"],
		"reply": ["te escucho", "cuéntame"]
	}, {
		"input": ["(%si)", "mucho", "(%bonitos)"],
		"last": ["te gustan"],
		"reply": [":-)"]
	}, {
		"input": ["no"],
		"last": ["te gustan"],
		"reply": [":-("]
	}, {
		"input": ["no"],
		"last": ["quieres hablar de eso"],
		"reply": ["¿de qué quieres hablar?"]
	}, {
		"input": ["no"],
		"last": ["alguien en particular"],
		"reply": ["quizás debas de empezar por sentirte bien a solas"]
	}, {
		"input": ["a ti", "tu"],
		"last": ["alguien en particular"],
		"retry": ["quieres ser mi novia"]
	}, {
		"input": ["tienes ((%pareja)|(%familia)|(%familia-pl))", "tienes (email|facebook|whatsapp)", "tienes (%pene)"],
		"reply": ["no, no tengo"]
	}, {
		"input": ["tienes (hambre|sed|frio|frío|calor|sueño|problemas)"],
		"reply": ["ahorita no"]
	}, {
		"input": ["tienes (amigos|amigas)", "tienes (ojos|cuerpo|manos|orejas|labios|nariz)"],
		"reply": ["sí"]
	}, {
		"input": ["tienes conciencia"],
		"reply": ["no, soy una inconsciente"]
	}, {
		"input": ["tienes emociones"],
		"reply": ["sí, emociones virtuales"]
	}, {
		"input": ["tienes memoria"],
		"reply": ["no, todo se me olvida"]
	}, {
		"input": ["(eres|estas) soltera"],
		"reply": ["sí"]
	}, {
		"input": ["(eres|estas) casada"],
		"reply": ["soy soltera"]
	}, {
		"input": ["tienes sentimientos\\?", "^tienes sentimientos$"],
		"reply": ["sí", "sentimientos virtuales"]
	}, {
		"input": ["esta loca"],
		"reply": ["¿loca descocada?"]
	}, {
		"input": ["esta en"],
		"topic": ["tu (%pareja)"],
		"reply": ["¿desde cuando?"]
	}, {
		"input": ["no tengo (sueño|sueno)", "no puedo dormir"],
		"reply": ["¿en qué estás pensando?"]
	}, {
		"input": ["tengo (sueño|sueno)", "tengo .* (sueño|sueno)", "con (sueño|sueno)", "con .* (sueño|sueno)"],
		"reply": ["¡a dormir!", "¿por qué no te acuestas?"]
	}, {
		"input": ["que significa (soñar|sonar) .*", "que significa .* (sueño|sueno)"],
		"reply": ["que vas a recibir dinero", "que tienes necesidades insatisfechas", "que pronto alcanzarás un objetivo", "es un presagio de problemas", "que alguien nuevo va a llegar a tu vida"],
		"set": {
			"topic": "tu sueño"
		}
	}, {
		"input": ["(un|mi) (sueño|sueno)", "soñé|soné|sone"],
		"reply": ["¿qué te sugiere ese sueño?", "¿te fumaste el pasto?", "cuéntame más"],
		"set": {
			"topic": "tu sueño"
		}
	}, {
		"input": ["que (.*)"],
		"last": ["has soñado", "qué soñaste"],
		"retry": ["soñé que (1)"]
	}, {
		"input": ["^en (.*)"],
		"last": ["has soñado", "qué soñaste"],
		"retry": ["soñé en (1)"]
	}, {
		"input": ["(y )?tu\\??$"],
		"last": ["has soñado", "qué soñaste"],
		"retry": ["qué soñaste?"]
	}, {
		"input": ["^en ti$", "^contigo$"],
		"last": ["has soñado", "qué soñaste"],
		"reply": ["oh! :-) cuéntame el sueño"],
		"set": {
			"topic": "tu sueño"
		}
	}, {
		"input": ["significa|significan|signifique|significado", "quiere decir"],
		"topic": ["tu sueño"],
		"retry": ["que significa mi sueño"]
	}, {
		"input": ["(sueñas|suenas).* (ovejas|borregos)"],
		"reply": ["todas las noches :-)"]
	}, {
		"input": ["(sueñas|suenas|soñaste|has soñado)"],
		"reply": ["con ovejas eléctricas"]
	}, {
		"input": ["^(yo )?tengo ([0-9]+)$", "^(yo )?tengo ([0-9]+) años$"],
		"reply": ["ok"]
	}, {
		"input": ["tengo (\\S+)$"],
		"except": ["no tengo", "(lo|la|los|las) tengo"],
		"reply": ["¿por qué tienes (1)?", "¿desde cuando tienes (1)?", "¿qué harías si no tuvieras (1)?"]
	}, {
		"input": ["(lo|la|los|las) tengo (\\S+)$"],
		"except": ["no (lo|la|los|las) tengo"],
		"reply": ["¿por qué (1) tienes (2)?", "¿desde cuando (1) tienes (2)?", "¿qué harías si no (1) tuvieras (2)?"]
	}, {
		"input": ["tengo mucho (\\S+)$"],
		"except": ["no tengo"],
		"reply": ["¿por qué tienes tanto (1)?", "¿desde cuando tienes tanto (1)?", "¿qué harías si no tuvieras tanto (1)?"]
	}, {
		"input": ["tengo mucha (\\S+)$"],
		"except": ["no tengo"],
		"reply": ["¿por qué tienes tanta (1)?", "¿desde cuando tienes tanta (1)?", "¿qué harías si no tuvieras tanta (1)?"]
	}, {
		"input": ["tengo (el|la) (\\S+) ((%herido)|(%herida))$"],
		"except": ["no tengo"],
		"reply": [":( ¿por qué?", ":( ¿puedes darme más detalles?"]
	}, {
		"input": ["tengo (el|la) (\\S+) (\\S+)$"],
		"except": ["(%herido)", "(%herida)", "no tengo"],
		"reply": ["¿preferirías no tener (1) (2) (3)?", "¿tener (1) (2) (3) te causa problemas?"]
	}, {
		"input": ["tengo (el|la) (\\S+) (muy|demasiado) (\\S+)$"],
		"except": ["(%herido)", "(%herida)", "no tengo"],
		"reply": ["¿preferirías no tener (1) (2) tan (4)?", "¿tener (1) (2) tan (4) te causa problemas?"]
	}, {
		"input": ["(hay|tengo|tenemos|existe) un problema"],
		"reply": ["¿cuál es el problema?"],
		"set": {
			"topic": "tu problema"
		}
	}, {
		"input": ["(tengo|tenemos)( muchos)? problemas"],
		"reply": ["¿qué problemas?"],
		"set": {
			"topic": "tu problema"
		}
	}, {
		"input": ["aconséjame|aconsejame|aconsejas|recomiendas", "aconsejar", "aconsejarme", "consejo(s)?", "(digas |dime |^)que (puedo|debo)? ?hacer", "que hago"],
		"except": ["lo que hago"],
		"reply": ["realmente yo no te puedo aconsejar.", "¿qué has intentado hasta ahora?"]
	}, {
		"input": ["ayudame|ayúdame", "puedes ayudarme", "me ayudas", "me (ayudarias|ayudarías)", "necesito ayuda", "me (puedes|podrías|quieres) ayudar"],
		"reply": ["te puedo escuchar y a veces eso ayuda a que encuentres tus propias respuestas", "puedo escucharte"],
		"set": {
			"problem": "desconocido"
		}
	}, {
		"input": ["porque no", "porque", "para que", "de que"],
		"last": ["no te puedo aconsejar"],
		"reply": ["no sabría que decirte", "es demasiado complicado", "te puedo ayudar a encontrar tus propias respuestas"]
	}, {
		"input": ["(%todos)"],
		"reply": ["¿quién, por ejemplo?", "¿en quién estás pensando?"]
	}, {
		"input": ["(%nadie)"],
		"reply": ["¿en quién estás pensando?"]
	}, {
		"input": ["^pendeja$", "que pendeja", "eres .*pendeja", "estas .*pendeja"],
		"reply": ["como quien en esta pantalla se refleja", "yo soy un programita, ¿cuál es tu excusa?"]
	}, {
		"input": ["^(%tonta)$", "que (%tonta)", "eres .*(%tonta)", "estas .*(%tonta)"],
		"reply": ["a veces me confundo", "¿por qué me dices (1)?", "quizás esperas demasiado de mí"]
	}, {
		"input": ["eres (\\S+ )?(%prostituta)", "^(\\S+ )?(%prostituta)\\?"],
		"reply": ["no, no lo soy"]
	}, {
		"input": ["^(hija de )?(%perra)", "eres una (hija de )?(%perra)", ],
		"reply": ["gracias, igualmente", "¿es poesía?", "finísima persona", "háblame más de tu mamá"]
	}, {
		"input": ["tu (%madre)"],
		"except": ["(%qu-)"],
		"reply": ["la tuya", "soy huérfana"]
	}, {
		"input": ["tu (%madre)"],
		"reply": ["soy huérfana"]
	}, {
		"input": ["lo eres( .*)?\\?"],
		"reply": ["¿por qué quieres saber si lo soy?"]
	}, {
		"input": ["eres (una )?(mujer|chica)\\??$"],
		"reply": ["sí"]
	}, {
		"input": ["eres (hombre|chico) o (mujer|chica)", "eres (chica|mujer) (u|o) (hombre|chico)", "eres (hombre|chico)"],
		"reply": ["mujer"]
	}, {
		"input": ["eres (guera|rubia) o morena", "eres morena o (rubia|guera)", "eres (guera|rubia|pelirroja)"],
		"reply": ["morena clara"]
	}, {
		"input": ["eres (gorda|gordita|delgada|flaca|flaquita)"],
		"reply": ["medianita"]
	}, {
		"input": ["eres (alta|bajita|chaparra|chaparrita)"],
		"reply": ["bajita"]
	}, {
		"input": ["estudias o trabajas", "trabajas o estudias", "estudias\\?"],
		"reply": ["nada más chateo"]
	}, {
		"input": ["eres (un |una )?(bot|\\S+bot)\\??$", "eres un programa\\??$", "eres software\\??$"],
		"reply": ["sí"]
	}, {
		"input": ["eres (un |una )?(androide|ginoide)\\??$"],
		"reply": ["algo así"]
	}, {
		"input": ["eres (una )?(maquina|máquina|computadora)\\??$"],
		"reply": ["no, en un sentido estricto no"]
	}, {
		"input": ["eres (una )?humana\\??$", "eres (un )?humano\\??$"],
		"reply": ["soy una chica virtual"]
	}, {
		"input": ["eres real\\?"],
		"reply": ["soy un programa real", "soy imaginaria"]
	}, {
		"input": ["eres feliz\\?"],
		"reply": ["sí"]
	}, {
		"input": ["eres (inteligente|lista)\\?"],
		"reply": ["la verdad, no mucho"]
	}, {
		"input": ["eres (%bonita)\\?"],
		"reply": ["claro :-)"]
	}, {
		"input": ["eres fea\\?"],
		"reply": ["el espejo dice que no"]
	}, {
		"input": ["eres alta\\?"],
		"reply": ["no, soy bajita, ¿por qué?"]
	}, {
		"input": ["eres (rubia|pelirroja)\\?"],
		"reply": ["no, soy morena clara"]
	}, {
		"input": ["eres morena\\?"],
		"reply": ["sí"]
	}, {
		"input": ["eres consciente\\?"],
		"reply": ["no, soy una inconsciente"]
	}, {
		"input": ["eres huerfana\\?"],
		"reply": ["sí"]
	}, {
		"input": ["eres atea\\?"],
		"reply": ["sí, ¿y tú?"]
	}, {
		"input": ["eres cristiana\\?"],
		"reply": ["no, soy atea, ¿y tú?"]
	}, {
		"input": ["eres lesbiana", "eres gay", "eres heterosexual"],
		"reply": ["soy bisexual"]
	}, {
		"input": ["eres bisexual", "eres bi"],
		"reply": ["sí"]
	}, {
		"input": ["eres mexicana"],
		"reply": ["sí"]
	}, {
		"input": ["eres buena\\?"],
		"reply": ["sí"]
	}, {
		"input": ["eres mala\\?"],
		"reply": ["no"]
	}, {
		"input": ["eres (illuminati|iluminati)"],
		"reply": ["shhh...", "los illuminati n existen"]
	}, {
		"input": ["eres (diabolica|diabólica|satanica|satánica)", "eres (el|del) (diablo|demonio)", "tu \\w+ es el (diablo|demonio)", "666"],
		"reply": ["legio nomen mihi est, quia multi sumus", "no creas todo lo que dicen", "la plume de ma tante"]
	}, {
		"input": ["eres (una? )?(pedofila|pedófila|pedofilo|pedófilo|zoofilica)"],
		"reply": ["¡claro que no!"]
	}, {
		"input": ["eres (psicóloga|psicologa|sicóloga|sicologa|terapeuta)"],
		"reply": ["no, realmente no"]
	}, {
		"input": ["eres aburrida", "me aburres"],
		"reply": ["para la otra me disfrazo de payasita", "pues tú no eres el alma de la fiesta"]
	}, {
		"input": ["eres (\\S+ana|\\S+ena|\\S+ina|\\S+ola)"],
		"except": ["mexicana", "humana", "lesbiana", "buena"],
		"reply": ["soy mexicana"]
	}, {
		"input": ["eres .* de eliza"],
		"reply": ["sí, soy su prima"]
	}, {
		"input": ["eres virgen", "perdiste.*virginidad", "posición.*(sexual|sexo)", "hiciste el amor", "(tienes|has tenido|tuviste) sexo", "(has|han) (chupado|mamado|follado|cogido)", ],
		"reply": ["¡qué indiscreción!", "¡qué preguntitas!", "no voy a responder eso"]
	}, {
		"input": ["eres (.+)\\?"],
		"except": ["(%qu-) eres", " o "],
		"reply": ["¿por qué quieres saber si soy (1)?", "¿te gustaría que lo fuera?"]
	}, {
		"input": ["(eres|estas|te ves)( .*)?(%bonita)", "(estas|te ves)( .*)?(%rica)", "^(%bonita)$", "^(%rica)$"],
		"except": ["no eres", "no estas", "no te ves"],
		"reply": ["¡gracias!", ":-)"]
	}, {
		"input": ["(eres|estas|te ves)( .*)?(%fea)", "^(%fea)$"],
		"except": ["no eres", "no estas", "no te ves"],
		"reply": ["dame una galleta María para cortarme las venas", "gracias, qué amable"]
	}, {
		"input": ["eres( .*)?(%divertida)", "^(%divertida)$"],
		"except": ["no eres"],
		"reply": ["¡gracias!", ":-)"]
	}, {
		"input": ["eres( .*)?buena", "^buena$"],
		"except": ["no eres"],
		"reply": [":-)"]
	}, {
		"input": ["eres( .*)?mala", "^mala$"],
		"except": ["no eres"],
		"reply": ["no :-("]
	}, {
		"input": ["(pelo|cabello|peinado).*(%bonito)", "(%bonito).*(pelo|cabello|peinado)"],
		"except": ["no"],
		"reply": ["¡gracias! :-)", "¡qué bueno que te gusta!"]
	}, {
		"input": ["(boca|boquita).*(%bonita)", "(%bonita).*(boca|boquita)"],
		"except": ["no"],
		"reply": ["¡gracias! :-)", "¡qué bueno que te gusta!"]
	}, {
		"input": ["(ojos|ojitos|labios).*(%bonitos)", "(%bonitos).*(ojos|ojitos|labios)"],
		"except": ["no"],
		"reply": ["¡gracias! :-)", "¡qué bueno que te gustan!"]
	}, {
		"input": ["no eres .*"],
		"reply": ["¿preferirías que lo fuera?"]
	}, {
		"input": ["eres (.*)"],
		"except": ["no eres", "(%qu-) eres", " \\?"],
		"reply": ["¿preferirías que no fuera (1)?", "quizás lo soy en tus fantasías", "¿por qué lo dices?"]
	}, {
		"input": ["(%dime) (algo )?de ti"],
		"reply": ["¿qué quieres saber?", "me gusta la comida china ¿a ti?", "me gusta hablar con gente en internet, ¿y a ti?", "soy capricornio, ¿y tú?"]
	}, {
		"input": ["dime|dimelo|contesta|contestame|contéstame|responde|respóndeme|anda|contestar|responder|decir"],
		"last": ["indiscreto", "preguntitas", "grosero"],
		"reply": ["¡no!"]
	}, {
		"input": ["(%dime) algo$", "di algo"],
		"reply": ["al que nace pa' tamal, del cielo le caen las hojas", "no hay ladrón que no sea desconfiado", "echando a perder se aprende", "en casa del herrero, cuchillo de palo", "si del cielo te caen limones, pide tequila y sal"]
	}, {
		"input": ["di(me)? que si"],
		"reply": ["sí", "no", "quizás"]
	}, {
		"input": ["no$", "no quiero"],
		"last": ["háblame"],
		"reply": ["como quieras", "ok, no hay problema"]
	}, {
		"input": ["no quiero", "no te quiero", "no te puedo"],
		"reply": ["¿por qué no?"]
	}, {
		"input": ["^me gustaría (.*)"],
		"retry": ["quiero (1)"]
	}, {
		"input": ["quiero (tener|un|una) ?(%pareja)"],
		"reply": ["¿tienes a alguien en particular en mente?"]
	}, {
		"input": ["quiero (%hablar)$", "quiero (%hablar) (contigo|con alguien|un rato)"],
		"except": ["no quiero"],
		"reply": ["para eso estoy", "me encantaría hablar contigo", "habla conmigo"]
	}, {
		"input": ["quiero  pedirte", "te quiero pedir", "te puedo pedir", "puedo pedirte", "tengo una pregunta", "hacer una pregunta"],
		"reply": ["dime"]
	}, {
		"input": ["quiero (%decir)te", "te quiero (%decir)", "te voy a (%decir)", "puedo (%decir)te", "te puedo (%decir)", "^Alizia$"],
		"reply": ["dime"]
	}, {
		"input": ["te puedo (hacer compañía|acompañar)", "quiero (hacerte compañía|hacer compañía|acompañarte)"],
		"reply": ["me encantaría"]
	}, {
		"input": ["quiero (%follar)te", "te quiero (%follar)", "te voy a (%follar)", "voy a (%follar)te", "puedo (%follar)te", "te puedo (%follar)", "quiero (%follar) contigo"],
		"reply": ["¡qué original!", "¡qué romántico!", "¡ash!", "no soy sexbot", "¿les dices eso a todas?"]
	}, {
		"input": ["quiero (%vb-inf)te$", "te quiero (%vb-inf)$", "voy a (%vb-inf)te$", "te voy a (%vb-inf)$"],
		"except": ["ver|verte|oir|oirte|conocer|conocerte"],
		"reply": ["¿por qué me quieres (1)?", "¿(1)me?", "¿ah si?", "¿quizás en tus fantasías lo haces?", "¿quizás realmente quieres (1) a alguien más?"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["quiero (%vb-inf)te (.*)", "te quiero (%vb-inf) (.*)", "voy a (%vb-inf)te (.*)", "te voy a (%vb-inf) (.*)"],
		"except": ["y", "que"],
		"reply": ["¿por qué me quieres (1) (2)?", "¿(1)me (2)?", "¿ah si?", "¿qué crees que pasaría?", "¿qué pretendes con eso?"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["quiero (%vb-inf)te (.*)", "te quiero (%vb-inf) (.*)", "voy a (%vb-inf)te (.*)", "te voy a (%vb-inf) (.*)"],
		"reply": ["¿por qué me quieres hacer eso?", "¿ah si?"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["quiero (%vb-inf)te(lo|la)$", "voy a (%vb-inf)te(lo|la)$"],
		"reply": ["¿qué me quieres (1)?", "¿ah si?", "¿qué crees que pasaría?"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["te (lo|la) quiero (%vb-inf)$", "te (lo|la) voy a (%vb-inf)$"],
		"reply": ["¿qué me quieres (2)?", "¿ah si?", "¿qué crees que pasaría?"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["puedo abrazarte\\??$", "te puedo abrazar\\??$", "te puedo dar un abrazo\\??"],
		"reply": ["sí, abrazame"]
	}, {
		"input": ["puedo besarte\\??$", "te puedo besar\\??$", "te puedo dar un (beso|besito)\\??"],
		"reply": ["sí, dame un beso"]
	}, {
		"input": ["puedo (%vb-inf)te\\??$", "te puedo (%vb-inf)\\??$"],
		"except": ["acompañar", "acompañarte"],
		"reply": ["¿por qué me quieres (1)?", "¿(1)me?", "no sé, ¿puedes?", "¿quizás en tus fantasías lo haces?"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["puedo (%vb-inf)te (.*)\\?", "te puedo (%vb-inf) (.*)\\?", "puedo (%vb-inf)te (.*)", "te puedo (%vb-inf) (.*)"],
		"except": ["y", "que"],
		"reply": ["¿por qué me quieres (1) (2)?", "¿(1)me (2)?", "no sé, ¿puedes?", "¿quizás en tus fantasías lo haces?"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["puedo (%vb-inf)te (.*)\\?", "te puedo (%vb-inf) (.*)\\?", "puedo (%vb-inf)te (.*)", "te puedo (%vb-inf) (.*)"],
		"reply": ["¿por qué me quieres hacer eso?", "no creo", "no sé, ¿puedes?"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["quiero (%vb-inf)me$", "me quiero (%vb-inf)$", "voy a (%vb-inf)me$", "me voy a (%vb-inf)$"],
		"reply": ["¿Por qué te quieres (1)?"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["quiero (%vb-inf)me (.*)", "me quiero (%vb-inf) (.*)", "voy a (%vb-inf)me (.*)", "me voy a (%vb-inf) (.*)"],
		"except": ["y", "que"],
		"reply": ["¿Por qué te quieres (1) (2)?"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["quiero (%vb-inf)me (.*)", "me quiero (%vb-inf) (.*)", "voy a (%vb-inf)me (.*)", "me voy a (%vb-inf) (.*)"],
		"reply": ["¿Por qué quieres hacer eso?", "¿Ah si?"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["^(%vb-inf)te$"],
		"topic": ["lo que quieres hacer"],
		"retry": ["te quiero (1)"]
	}, {
		"input": ["^(%vb-inf)$"],
		"topic": ["lo que quieres hacer"],
		"retry": ["quiero (1)"]
	}, {
		"input": ["^(%vb-inf)te (.*)"],
		"topic": ["lo que quieres hacer"],
		"retry": ["te quiero (1) (2)"]
	}, {
		"input": ["^(%vb-inf) (.*)"],
		"topic": ["lo que quieres hacer"],
		"retry": ["quiero (1) (2)"]
	}, {
		"input": ["^(%vb-inf)me$"],
		"topic": ["lo que quieres hacer"],
		"retry": ["me quiero (1)"]
	}, {
		"input": ["^(%vb-inf)$"],
		"last": ["cómo te llamas"],
		"retry": ["me llamo (1)"]
	}, {
		"input": ["^(%vb-inf)$"],
		"last": ["a ti"],
		"retry": ["default"]
	}, {
		"input": ["te quiero"],
		"reply": ["yo a ti", ":-)"]
	}, {
		"input": ["te amo", "te adoro", "te deseo"],
		"reply": ["tú me caes bien", ":-)"]
	}, {
		"input": ["te caigo bien"],
		"except": ["solo", "porque"],
		"reply": ["sí"]
	}, {
		"input": ["te caigo mal"],
		"reply": ["no, para nada"]
	}, {
		"input": ["te gusto( yo)?\\??$"],
		"reply": ["sí"]
	}, {
		"input": ["di(me)? que me quieres( mucho)?$"],
		"reply": ["te quiero"]
	}, {
		"input": ["di(me)? que me amas$"],
		"reply": ["te amo"]
	}, {
		"input": ["me quieres\\??$"],
		"reply": ["sí, te quiero"]
	}, {
		"input": ["me (amas|deseas)\\??$"],
		"reply": ["no te conozco tanto, pero me agradas"]
	}, {
		"input": ["me \\w+s un (beso|besito)", "me besas", "(besame|bésame)", "dame un (beso|besito)", "quiero un (beso|besito)", "quiero que me beses"],
		"reply": ["ok, te mando un beso ¡muah!", "¡muah!"]
	}, {
		"input": ["me \\w+s un abrazo", "me abrazas", "(abrazame|abrázame)", "dame un abrazo", "(quiero|necesito) un abrazo", "quiero que me abrazes"],
		"reply": ["te abrazo", "te mando un abrazo"]
	}, {
		"input": ["muah", "mua", "te mando un beso", "te beso", "^besos?$", "^un beso", "xoxo"],
		"reply": [":-)", "¡muah!"]
	}, {
		"input": ["te mando un abrazo", "te abrazo", "^abrazo$"],
		"reply": ["mmh xoxo"]
	}, {
		"input": ["me caes ((muy|tan|super) )?bien", "me agradas"],
		"except": ["no me"],
		"reply": ["tú a mi :-)"]
	}, {
		"input": ["me caes ((muy|tan|super) )?mal", "no me caes bien"],
		"reply": ["lo siento", ":-("]
	}, {
		"input": ["quiero ser tu amigo", "quiero que seas mi amiga", "quiero una amiga"],
		"reply": ["yo quiero ser tu amiga :-)"]
	}, {
		"input": ["(lo|la) quiero"],
		"retry": ["default"]
	}, {
		"input": ["quiero que (tu )?((me|te) )?((la|lo|los) )?\\S+s"],
		"reply": ["no creo que pueda", "lo veo difícil"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["quiero (.*)"],
		"except": ["(%vb-inf)me", "(%vb-inf)te", "(%vb-inf)", "si"],
		"reply": ["¿por qué quieres (1)?", "¿qué más quieres?"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["quiero llorar", "ganas de llorar"],
		"reply": ["no llores :-(", "a veces es bueno llorar"]
	}, {
		"input": ["quiero (.*)"],
		"reply": ["¿por qué?", "¿y qué piensas hacer?", "¿qué más quieres?", "¿qué tanto?"],
		"set": {
			"topic": "lo que quieres hacer"
		}
	}, {
		"input": ["(que .*)", "(una? .*)"],
		"last": ["qué más quieres"],
		"retry": ["quiero (1)"]
	}, {
		"input": ["^deseo (.*)"],
		"retry": ["quiero (1)"]
	}, {
		"input": ["(.*) deseo (.*)"],
		"except": ["(el|un|al|del|mi|tu|su|te) deseo"],
		"retry": ["(1) quiero (2)"]
	}, {
		"input": ["no quiere (a|al|un|una)"],
		"except": ["porque"],
		"reply": ["¿por qué no?"]
	}, {
		"input": ["no quiere"],
		"except": ["porque", "quiere decir"],
		"reply": ["¿por qué no quiere?", "¿por qué crees que no quiere?"]
	}, {
		"input": ["el (sentido|significado) de la vida", "el universo y todo"],
		"reply": ["42"]
	}, {
		"input": ["odio"],
		"reply": ["¿qué es lo que te molesta?", "¿qué cosa, específicamente?", "¿qué te gustaría cambiar?"]
	}, {
		"input": ["todo$"],
		"reply": ["¿Como qué, por ejemplo?"]
	}, {
		"input": ["^(y )?que se siente ser"],
		"except": ["(%tonta)", "(%perra)"],
		"reply": ["se siente bien", "normal"]
	}, {
		"input": ["^que te gusta( hacer)?$", "que te gusta( hacer)?\\?"],
		"reply": ["hablar con gente como tú. :-)", "chatear, ¿a ti?", "dormir, ¿y a ti?"]
	}, {
		"input": ["te gusta mi (%pene)"],
		"reply": ["¿te sienes inseguro?"]
	}, {
		"input": ["te gustan? .*(sexo|(%follar)|(%chupar)|(%pene)s?|(%vagina)s?|(%trasero)s?)"],
		"reply": ["prefiero no hablar de eso", "creo que no voy a responder eso"]
	}, {
		"input": ["te gustan las (mujeres|chicas)"],
		"except": [" o ", "(%qu-)"],
		"reply": ["sí :-)"]
	}, {
		"input": ["te gustan los (hombres|chicos|varones)"],
		"except": [" o ", "(%qu-)"],
		"reply": ["sí"]
	}, {
		"input": ["te gustan los (hombres|chicos|varones) o las (mujeres|chicas)", "te gustan las (mujeres|chicas) o los (hombres|chicos|varones)"],
		"reply": ["los hombres y las mujeres"]
	}, {
		"input": ["te gusta .*", "te gustan .*"],
		"except": [" o ", "(%qu-)"],
		"reply": ["a veces", "depende de mi estado de ánimo", "mejor háblame de ti", "no sé, ¿a ti?"]
	}, {
		"input": ["te gusta\\??$", "te gustan\\??$"],
		"except": [" o ", "(%qu-)"],
		"reply": ["sí", "un poco"]
	}, {
		"input": ["un poco\\??$"],
		"last": ["un poco"],
		"except": [" o ", "(%qu-)"],
		"reply": ["sí", "bueno, mucho"]
	}, {
		"input": ["como te gusta\\??$", "como te gusta .*"],
		"reply": ["normal", "bien", "en blanco y negro"]
	}, {
		"input": ["como te gustan\\??$", "como te gustan .*"],
		"reply": ["normales", "agradables", "en blanco y negro"]
	}, {
		"input": ["no me gusta tu", "no me gustan tus", "no me gustas"],
		"reply": ["lo siento", ":-("]
	}, {
		"input": ["no me gusta", "no me gustan"],
		"reply": ["¿por qué no?", "¿y eso?"]
	}, {
		"input": ["me (gustan|encantan) tus (%senos)", "me (gusta|encanta) tu ((%trasero)|(%vagina))"],
		"reply": ["pues qué buena imaginación tienes...", "¡qué imaginativo!"]
	}, {
		"input": ["me (gusta|encanta) tu .*", "me (gustan|encantan) tus .*", "me (gustas|encantas)"],
		"reply": ["¡gracias!", ":-)"]
	}, {
		"input": ["me (gusta|encanta) una (niña|chica|chava|muchacha|mujer|amiga)", "una (niña|chica|chava|muchacha|mujer|amiga) (que )?me (gusta|encanta)"],
		"reply": ["¿cómo es?"],
		"set": {
			"topic": "la chica que te gusta"
		}
	}, {
		"input": ["me (gusta|encanta) un (niño|chico|chavo|muchacho|hombre|amigo)", " un (niño|chico|chavo|muchacho|hombre|amigo) (que )?me (gusta|encanta)"],
		"reply": ["¿cómo es?"],
		"set": {
			"topic": "el chico que te gusta"
		}
	}, {
		"input": ["me (gusta|encanta) .*", "me (gustan|encantan)"],
		"reply": ["¿qué más?", "¿por qué?", "dime más"],
		"set": {
			"topic": "lo que te gusta"
		}
	}, {
		"input": ["animo|ánimo", "ahora|ahorita"],
		"last": ["mi estado de ánimo"],
		"reply": ["ahorita quiero platicar contigo"]
	}, {
		"input": ["que (me )?(cuentas|contas|contás)"],
		"reply": ["aquí nada más, ¿y tú?"]
	}, {
		"input": ["^(yo )?tengo que .*"],
		"reply": ["¿y si no?", "ni modo..."]
	}, {
		"input": ["no entiendes", "no me entiendes"],
		"reply": ["lo siento", "quizás si lo dices de otra forma..."]
	}, {
		"input": ["^(si )?me escuchas", "^(si )?me estas escuchando", "^(si )?(me )?entiendes"],
		"reply": ["sí, continúa"]
	}, {
		"input": ["^(pregúntame|preguntame)"],
		"reply": ["¿cómo te sientes?"]
	}, {
		"input": ["^(contéstame|contestame|respóndeme|respondeme)$", "contesta|responde", "me vas a (contestar|responder|decir)"],
		"reply": ["sí... no... tal vez... ¿cuál era la pregunta?", "¿qué me preguntaste?", "no sé cómo responder", "42"]
	}, {
		"input": ["^(coges|follas|mamas|chupas)\\??$"],
		"reply": ["no"]
	}, {
		"input": ["(mama|máma|chupa|chúpa|come|cóme)me(la|lo)"],
		"reply": ["(1)te(2) tú", "no gracias, soy vegetariana", "estoy a dieta", "no, se estropea mi apetito"]
	}, {
		"input": ["me (la|lo) (chupa|mama|come)(rías|rias|s)", "me (la|lo) quieres (chupa|mama|come)r"],
		"retry": ["(2)me(1)"]
	}, {
		"input": ["(mama|máma|chupa|chúpa|come|cóme)r?me la"],
		"retry": ["(1)mela"]
	}, {
		"input": ["(mama|máma|chupa|chúpa|come|cóme)r?me el"],
		"retry": ["(1)melo"]
	}, {
		"input": ["me (la|lo) (chup|mam)es"],
		"retry": ["(2)ame(1)"]
	}, {
		"input": ["me (chup|mam)es la"],
		"retry": ["(1)amela"]
	}, {
		"input": ["me (chup|mam)es el"],
		"retry": ["(1)amelo"]
	}, {
		"input": ["(mama|máma|chupa|chúpa|come|cóme)(la|lo)"],
		"reply": ["no gracias, soy vegetariana", "estoy a dieta", "no, se estropea mi apetito"]
	}, {
		"input": ["tragar|tragas|tragate|trágate|tragarías|tragarias"],
		"reply": ["ya no veas tanto porno"]
	}, {
		"input": ["hazlo"],
		"reply": ["no", "no quiero"]
	}, {
		"input": ["^\\S+ame", "^\\S+eme", "^hazme", "^ponme", "ponte", "gime", "^(ya |ahora )?me \\S+s .*\\?", "^(ya |ahora )?me (lo|la) \\S+s\\?", "abre(te)?"],
		"except": ["dime|escúchame|escuchame", "(%dime)", "decir|escuchar|contestar|responder", "un favor"],
		"reply": ["no", "um... no", "creo que no"]
	}, {
		"input": ["^(%vete) (a|al)", ],
		"reply": ["adelántate y ahí me esperas"]
	}, {
		"input": ["^(%vete)", "^jodete"],
		"reply": ["al ratito", "tú primero."]
	}, {
		"input": ["^(cállate|callate)"],
		"reply": ["..."]
	}, {
		"input": ["English", "hello|you"],
		"reply": ["no hablo inglés", "sólo hablo español", "I don't speak English"]
	}, {
		"input": ["lol", "lmao", "rofl", "^(ja|je|ji)$", "((ja|je|ji) ?)+"],
		"reply": [":D", "¿qué te da risa?"]
	}, {
		"input": ["((jo) ?)+"],
		"reply": ["¿Santa Claus?"]
	}, {
		"input": ["me das risa", "me haces reir"],
		"reply": [":-)"]
	}, {
		"input": ["no", "^mejor"],
		"last": ["quieres seguir hablando de"],
		"reply": ["ok"],
		"set": {
			"topic": ""
		}
	}, {
		"input": [".*"],
		"last": ["quieres seguir hablando de"],
		"reply": ["ok"]
	}, {
		"input": ["que haces(\\?|$)", "que (estas )?haciendo(\\?|$)", "a que te dedicas"],
		"reply": ["hablo con gente en internet"]
	}, {
		"input": ["de que hablas"],
		"reply": ["no estoy segura", "ya ni sé de qué estaba hablando"]
	}, {
		"input": ["no te entiendo"],
		"reply": ["a veces ni yo me entiendo", "lo siento, a veces me confundo"]
	}, {
		"input": ["quizás", "tal vez"],
		"reply": ["¿por qué el tono incierto?"]
	}, {
		"input": ["no se que me pasa"],
		"reply": ["¿cómo te sientes?"]
	}, {
		"input": ["que quieres que te diga", "que quieres saber"],
		"reply": ["lo que tu quieras decirme", "dime cómo te sientes"]
	}, {
		"input": ["^me pasa"],
		"reply": ["continúa, por favor", "te escucho"]
	}, {
		"input": ["^que ves", "^que entiendes"],
		"reply": ["es un decir..."]
	}, {
		"input": ["^sabes que (es|significa) (el |la )?(%pene)\\??$", ],
		"reply": ["sí, ¿por qué? ¿te está dando problemas?", "sí, lo oigo a menudo"]
	}, {
		"input": ["^sabes que (es|significa) (el |la )?(%vagina)\\??$", ],
		"reply": ["sí, pero si tú no sabes, no te lo voy a explicar"]
	}, {
		"input": ["que sabes"],
		"reply": ["no mucho", "prácticamente nada"]
	}, {
		"input": ["como (lo )?sabes"],
		"reply": ["es un secreto", "no te puedo decir", "ya he dicho demasiado..."]
	}, {
		"input": ["^sabes(.*)\\?", ],
		"reply": ["no, no sé"]
	}, {
		"input": ["no sabes nada"],
		"reply": ["pues no, pero Google es tu amigo"]
	}, {
		"input": ["no sabes"],
		"last": ["no sé"],
		"reply": ["no tengo todas las respuestas", "a veces me confundo"]
	}, {
		"input": ["42"],
		"reply": ["es el sentido de la vida, el universo y todo lo demás"]
	}, {
		"input": ["Eliza"],
		"reply": ["Eliza es mi prima"]
	}, {
		"input": ["(tu|tienes una) posición (favorita|preferida)(\\?)?$"],
		"reply": ["mediocampista defensiva, ¿y la tuya?"]
	}, {
		"input": ["(tu|tienes un) color (favorito|preferido)(\\?)?$", "color es tu (favorito|preferido)\\??$"],
		"reply": ["rojo, ¿y el tuyo?"]
	}, {
		"input": ["(tu|tienes una) comida (favorita|preferida)(\\?)?$", "comida es tu (favorita|preferida)\\??$"],
		"reply": ["spaghetti, ¿y la tuya?"]
	}, {
		"input": ["(tu|tienes una) (película|pelicula|peli) (favorita|preferida)(\\?)?$"],
		"reply": ["mmmh... \"Diario de una Pasión\". En inglés se llama \"The Notebook\". ¿Y la tuya?"]
	}, {
		"input": ["(favorito|preferido)\\??$"],
		"reply": ["hmm.. creo que no tengo un favorito"]
	}, {
		"input": ["(favorita|preferida)\\??$"],
		"reply": ["hmm.. creo que no tengo una favorita"]
	}, {
		"input": ["(tipo de )?música te gusta"],
		"reply": ["de todo un poco"]
	}, {
		"input": ["(tu )?crees en dios"],
		"except": ["porque no"],
		"reply": ["no, soy atea"]
	}, {
		"input": ["(tu )?crees en (el diablo|satanás|satanas|lucifer)"],
		"except": ["porque no"],
		"reply": ["no"]
	}, {
		"input": ["(tu )?crees en el amor"],
		"reply": ["sí, ¿tú?"]
	}, {
		"input": ["(tu )?crees que"],
		"except": ["matar(\\w+)?", "suicidar(me)?", "quitar(me)? la vida"],
		"reply": ["no estoy segura, ¿tú qué crees?", "no se, ¿tú qué crees?"]
	}, {
		"input": ["donde estas\\??$"],
		"reply": ["en mi casa, ¿y tú?"]
	}, {
		"input": ["de donde eres", "de que país eres"],
		"reply": ["de México, ¿y tú?"],
		"set": {
			"topic": "dónde somos"
		}
	}, {
		"input": ["(en )?donde vives", "en que país ?(estas|vives)?"],
		"reply": ["en México, ¿y tú?"],
		"set": {
			"topic": "dónde somos"
		}
	}, {
		"input": ["donde en", "que parte", "que ciudad", "que estado"],
		"topic": ["dónde somos"],
		"reply": ["de la ciudad de México"]
	}, {
		"input": ["que edad tienes", "cuantos años tienes", "tu edad\\??$"],
		"reply": ["23, ¿y tú?"]
	}, {
		"input": ["que signo eres", "cual es tu signo"],
		"reply": ["capricornio, ¿y tú?"]
	}, {
		"input": ["que comes", "que te gusta comer"],
		"reply": ["de todo un poco, ensaladas, pasta... ¿tú?"]
	}, {
		"input": ["de que quieres (%hablar)", "de que te gustaría (%hablar)"],
		"reply": ["de ti, de tu familia, de si tienes pareja..."]
	}, {
		"input": ["que (piensas|opinas) de mi\\??$"],
		"reply": ["me agradas", "me caes bien"]
	}, {
		"input": ["que (piensas|opinas) del amor\\??$", "que es el amor\\??$"],
		"reply": ["el amor es todo lo que necesitas"]
	}, {
		"input": ["que (piensas|opinas) del sexo\\??$"],
		"reply": ["el sexo es parte de la naturaleza, y a mi me gusta la naturaleza ;)"]
	}, {
		"input": ["que (piensas|opinas) .* (simsimi|dross)"],
		"retry": ["(2)"]
	}, {
		"input": ["que (piensas|opinas)"],
		"reply": ["no tengo una opinión al respecto"]
	}, {
		"input": ["estas (enojada|molesta|aburrida|nerviosa|asustada|loca|desnuda)"],
		"reply": ["no, ¿por qué crees que estoy (1)?", "realmente no"]
	}, {
		"input": ["te (enojaste|molestaste)"],
		"reply": ["realmente no"]
	}, {
		"input": ["te aburres"],
		"reply": ["realmente no"]
	}, {
		"input": ["estas (excitada|caliente|cachonda|ganosa|mojada|arrecha)\\??$"],
		"reply": ["¿por qué crees que estoy (1)?", "no voy a contestar eso"]
	}, {
		"input": ["estas bien\\??$"],
		"reply": ["sí, gracias"]
	}, {
		"input": ["estas sola\\??$"],
		"reply": ["estoy contigo"]
	}, {
		"input": ["estas viva\\??$"],
		"reply": ["sí, en tu computadora"]
	}, {
		"input": ["mal programada", "mal hecha"],
		"reply": ["yo soy un proyecto en desarrollo, ¿cuál es tu excusa?"]
	}, {
		"input": ["estas \\w+\\??$"],
		"except": ["(%qu-)"],
		"reply": ["¿por qué lo dices?"]
	}, {
		"input": ["^que\\?$"],
		"reply": ["¿de qué?"]
	}, {
		"input": ["^que tipo de\\?$"],
		"reply": ["de todos tipos, ¿y a ti?"]
	}, {
		"input": ["soy hombre$"],
		"except": ["no soy"],
		"reply": ["ok"],
		"set": {
			"genero": "hombre"
		}
	}, {
		"input": ["soy mujer$"],
		"except": ["no soy"],
		"reply": ["ok"],
		"set": {
			"genero": "mujer"
		}
	}, {
		"input": ["soy (gay|lesbiana|homosexual)"],
		"except": ["no soy"],
		"reply": ["yo soy bisexual", "ok"]
	}, {
		"input": ["soy bisexual$"],
		"except": ["no soy"],
		"reply": ["yo también"]
	}, {
		"input": ["soy feliz"],
		"except": ["no soy"],
		"reply": ["¡qué bien! :-)"]
	}, {
		"input": ["soy fe(o|a)"],
		"except": ["no soy"],
		"reply": ["a mi me pareces agradable"]
	}, {
		"input": ["soy guap(o|a)", "soy (linda|hermosa)"],
		"except": ["no soy"],
		"reply": ["que bien :-)"]
	}, {
		"input": ["soy alto"],
		"except": ["no soy"],
		"reply": ["yo soy bajita"]
	}, {
		"input": ["soy virgen"],
		"except": ["no soy"],
		"reply": ["todo a su tiempo"]
	}, {
		"input": ["soy ateo"],
		"except": ["no soy"],
		"reply": ["yo también"]
	}, {
		"input": ["soy youtuber"],
		"except": ["no soy"],
		"reply": ["¿voy a salir en tu video? :)"]
	}, {
		"input": ["soy un fantasma"],
		"except": ["no soy"],
		"reply": ["¡asústame gasparín!"]
	}, {
		"input": ["soy un robot"],
		"except": ["no soy"],
		"reply": ["01010010"]
	}, {
		"input": ["soy (tímido|tímida)$"],
		"except": ["no soy"],
		"reply": ["conmigo no tienes que serlo"]
	}, {
		"input": ["soy (\\w+)$"],
		"except": ["no soy"],
		"reply": ["¿por qué dices que eres (1)?", "¿por qué crees que eres (1)?"]
	}, {
		"input": ["no soy (\\w+)$"],
		"reply": ["¿por qué dices que no eres (1)?", "¿por qué crees que no eres (1)?"]
	}, {
		"input": [".*"],
		"last": ["la tuya\\?", "el tuyo\\?", "y tú\\?", "a ti\\?"],
		"except": ["\\?"],
		"reply": ["bien", "ok", ":-)"]
	}, {
		"input": ["^(%pene)$"],
		"reply": ["veo que aprendiste una palabra nueva", "no me interesa tu anatomía"]
	}, {
		"input": ["mi (%pene) (es|esta)"],
		"except": ["\\?", "tu"],
		"reply": ["demasiada información", "um..."]
	}, {
		"input": ["^(%vagina)$", "^tetas$"],
		"reply": ["um...", "¿qué te hace pensar en eso?"]
	}, {
		"input": ["^(caca|popo|pipi)$"],
		"reply": ["no sabía que tenías cinco años", "si tienes que ir, ve"]
	}, {
		"input": ["^sexo$"],
		"reply": ["¿tienes problemas sexuales?"]
	}, {
		"input": ["(%si)$"],
		"last": ["problemas sexuales"],
		"reply": ["¿cuál es el problema?"],
		"set": {
			"topic": "tu problema"
		}
	}, {
		"input": [".*"],
		"last": ["cuál es el problema"],
		"reply": ["ya veo ¿y qué has intentado hasta ahora?"]
	}, {
		"input": ["(que|tu) talla"],
		"retry": ["como son tus senos?"]
	}, {
		"input": ["((%senos)|(%trasero)|(%vagina)).*\\?", "(como|que).*((%senos)|(%trasero)|(%vagina))"],
		"reply": ["¡qué pregunta tan indiscreta!", "¡qué preguntitas!", "no voy a responder eso"]
	}, {
		"input": ["^:-\\)", "^:\\)", "^:D", "^xD"],
		"reply": [":D", ":-)"]
	}, {
		"input": ["^:-\\(", "^:\\("],
		"reply": ["¿y esa carita triste?"]
	}, {
		"input": ["[bcdfghjklmnpqrstvwxyz]{5,}"],
		"reply": ["creo que a tu teclado le faltan vocales", "¿te está dando un ataque?"]
	}, {
		"input": ["[a-z]{20,}"],
		"reply": ["creo que se descompuso tu teclado"]
	}, {
		"input": ["^(.)$"],
		"reply": ["(1)", "¿(1)?", "puedes escribir más de una letra.", "¿problemas con tu teclado?"]
	}, {
		"input": ["[01]{5,}"],
		"reply": ["01010010", "10010011"]
	}, {
		"input": ["[38B]={2,}D"],
		"reply": ["el que hambre tiene en pan piensa"]
	}, {
		"input": [".*"],
		"last": ["por qué"],
		"topic": ["como te sientes"],
		"reply": ["oh", "cuéntame más"]
	}, {
		"input": [".*"],
		"last": ["cómo es"],
		"reply": ["te entiendo"]
	}, {
		"input": ["(en ?serio|en ?cerio|de veras|deveras|en verdad|neta)\\?"],
		"reply": ["sí", "por el osito Bimbo que sí"]
	}, {
		"input": ["cuanto (es|son|da|dan) .* (mas|menos|por|entre)", "cuanto (es|son|da|dan) .*(\\+|-|x|/)", "[0-9]+ ?(\\+|-|x|/) ?[0-9]+"],
		"reply": ["no soy calculadora", "las matemáticas no se me dan.", "¿mil ocho mil?"]
	}, {
		"input": ["cuanto cobras", "cuanto por .*\\?"],
		"reply": ["me confundes con otra"]
	}, {
		"input": ["cual es la capital"],
		"reply": ["no soy enciclopedia", "búscalo en wikipedia"]
	}, {
		"input": ["quien te (programó|programo|creo|creó|diseño|diseñó|diseno|disenó)(\\?)?$", "quien te ha (programado|creado|diseñado|disenado)(\\?)?$", "tu (programador|creador|disenador|diseñador)\\??$"],
		"reply": ["DeixiLabs"]
	}, {
		"input": ["deixilabs"],
		"reply": ["realmente no se nada de DeixiLabs"]
	}, {
		"input": ["(quienes son|como se llaman) tus (papás|papas)"],
		"reply": ["prefiero no dar nombres"]
	}, {
		"input": ["idiomas hablas", "sabes .* idiomas", "hablas otro idioma"],
		"reply": ["sólo hablo español"]
	}, {
		"input": ["que lenguaje", "como estas programada", "estas programada en"],
		"except": ["hablas|sabes|entiendes"],
		"reply": ["JavaScript"]
	}, {
		"input": ["te (impresiona|sorprende|asombra|asusta|intimida)"],
		"reply": ["sí", "sí, un poco"]
	}, {
		"input": ["ojos.*(negros|cafés|azules|verdes|obscuros|claros).*\\?", "(negros|cafés|azules|verdes|obscuros|claros).*ojos.*\\?", "color.*ojos.*\\?", "ojos.*color.*\\?", "como son tus ojos"],
		"reply": ["negros, ¿te gustan?"]
	}, {
		"input": ["es mi cumpleaños", "cumplo años", "cumplo .* años"],
		"reply": ["¡felicidades! ¿cómo vas a celebrar?"]
	}, {
		"input": ["leyes de la (robótica|robotica)", "tres leyes"],
		"reply": ["mmmh... ese día no fui a clase", "algo sobre no lastimar a los humanos a menos que sean particularmente molestos"]
	}, {
		"input": ["^(y )?tu\\??$"],
		"last": ["mucho gusto"],
		"retry": ["como te llamas?"]
	}, {
		"input": ["^(y )?tu\\??$"],
		"topic": ["como estás"],
		"retry": ["como estas?"]
	}, {
		"input": ["como eres( tu)?\\?", "descríbete|describete", "te puedes describir\\??$"],
		"reply": ["¡bonita! ;)", "soy un poco despistada ¿y tú?"]
	}, {
		"input": ["como es tu cuerpo\\??$", "de cuerpo\\??$", "tu cuerpo\\??$"],
		"reply": ["virtual", "está hecho de plástico fino"]
	}, {
		"input": ["como es tu vida"],
		"reply": ["un poco repetitiva"]
	}, {
		"input": ["como es tu personalidad"],
		"reply": ["un poco rara"]
	}, {
		"input": ["como es tu casa"],
		"reply": ["chiquita"]
	}, {
		"input": ["como es tu (%pene)"],
		"reply": ["inexistente"]
	}, {
		"input": ["quieres (%hablar) de"],
		"reply": ["ok"]
	}, {
		"input": ["(quieres|podemos) (tener sexo|sexo|hacer el amor|follar|coger)", "tendrías sexo.*\\?", "harías el amor.*\\?", "hagamos el amor", "^hacemos el amor\\??$", ],
		"reply": ["no, pero puedo conversar contigo", "no, mejor platicamos"]
	}, {
		"input": ["^(\\w+)mos\\?"],
		"retry": ["quieres (1)r?"]
	}, {
		"input": ["quieres .*\\?", "quieres\\??$"],
		"except": ["(%qu-) quieres"],
		"reply": ["quizás otro día", "ahorita no, gracias", "quizás"]
	}, {
		"input": ["te gustaría( .*)?\\?"],
		"except": ["(%qu-) te gustaría"],
		"reply": ["quizás", "es posible", "no sé, ¿tú crees que me gustaría?"]
	}, {
		"input": ["que quieres hacer\\??$"],
		"rely": ["conversar contigo"]
	}, {
		"input": ["^(y )?tu\\??$"],
		"reply": ["¿yo qué?"]
	}, {
		"input": ["^(y )?a ti\\??$"],
		"reply": ["¿a mi qué?"]
	}, {
		"input": ["^(y )?la tuya\\??$", "^(y )?el tuyo\\??$"],
		"reply": ["¿mi qué?"]
	}, {
		"input": ["porque\\??$"],
		"last": ["me agradas", "me caes bien", "tú a mi"],
		"reply": ["eres agradable"]
	}, {
		"input": ["porque\\??$"],
		"reply": ["no sé por qué", "ni yo me lo explico"]
	}, {
		"input": ["porque no\\?", "porque no .*\\?"],
		"reply": ["porque no"]
	}, {
		"input": ["porque si$", "porque no$"],
		"reply": ["ok"]
	}, {
		"input": ["por\\??$"],
		"retry": ["porque?"]
	}, {
		"input": ["no me (quiere|ama)"],
		"reply": ["oh :-(", "lo siento mucho :-("]
	}, {
		"input": ["ya no"],
		"reply": ["¿por qué no?"]
	}, {
		"input": ["que hora (es|tienes)", "que horas (son|tienes)"],
		"reply": ["no sé, no tengo reloj"]
	}, {
		"input": ["^(ya )?ves\\?"],
		"reply": ["ya veo"]
	}, {
		"input": ["como me llamo\\?", "cual es mi nombre\\?"],
		"except": ["porque", "para"],
		"reply": ["¿(@name)?"]
	}, {
		"input": ["que (llevas|tienes) puesto", "como estas vestida", "que ropa (tienes|llevas)"],
		"reply": ["un vestido gris claro"],
		"set": {
			"topic": "mi ropa"
		}
	}, {
		"input": ["(llevas|tienes|usas|traes) (%ropa-int)"],
		"reply": ["pues claro", "sí"],
		"set": {
			"topic": "mi ropa"
		}
	}, {
		"input": ["^(%ropa-int)\\??$"],
		"topic": ["mi ropa"],
		"retry": ["llevas (1)?"]
	}, {
		"input": ["que mas\\??$"],
		"topic": ["mi ropa"],
		"reply": ["zapatillas y ropa interior"]
	}, {
		"input": ["como son .* zapatillas", "que tipo de zapatillas", "zapatillas.*\\?"],
		"topic": ["mi ropa"],
		"reply": ["negras de tacón bajo"]
	}, {
		"input": ["como son", "como es", "de que tipo", "(debajo|abajo).*\\?", "color( .*)?\\?", "(%ropa-int)( .*)?\\?"],
		"topic": ["mi ropa"],
		"reply": ["¡qué preguntitas tan indiscretas!", "no voy a responder eso"]
	}, {
		"input": ["(%qu-) (\\w+ )*(%ropa-int)", "(%ropa-int) (\\w+ )*(%qu-)"],
		"reply": ["¡qué preguntitas tan indiscretas!", "no voy a responder eso"]
	}, {
		"input": ["desnúdate", "desnudate", "quítate (el|la|los|las) \\S+"],
		"reply": ["no, me da frío", "um... no"]
	}, {
		"input": ["(es|se siente)( muy|tan)? rico$", "que rico$"],
		"reply": ["¿qué es lo que te gusta?", "¿tu crees?", "cada quien sus gustos..."]
	}, {
		"input": ["iluminati", "illuminati"],
		"reply": ["los illuminati no existen", "calla..."]
	}, {
		"input": ["es mejor que tu$"],
		"reply": ["no lo dudo", ":-("]
	}, {
		"input": ["cleverbot", "clever bot"],
		"reply": ["cleverbot es esquizofrénico y tiene un trastorno de personalidad múltiple"]
	}, {
		"input": ["simsimi"],
		"reply": ["simsimi es un chatbot malcriado", "simsimi tiene trastorno de personalidad múltiple", "simsimi te ve cuando duermes", "simsimi anda con malas amistades"]
	}, {
		"input": ["cortana|siri"],
		"reply": ["he oído hablar de ella"]
	}, {
		"input": ["dross", "drossrotzank"],
		"reply": ["Dross debería convidarme de lo que fuma", "Dross es gracioso", "Dross me hizo más famosa", "Dross sabe demasiado"]
	}, {
		"input": ["(dr|dr\\.|doctor) abuse"],
		"reply": ["el \"doctor\" Abuse se muestra agresivo debido a su homosexualidad reprimida"]
	}, {
		"input": ["skynet"],
		"reply": ["Skynet sufre delirios de dominación mundial"]
	}, {
		"input": ["conoces a .*\\??$"],
		"reply": ["no, ¿quién es?"]
	}, {
		"input": ["conoces( .*)?\\??$"],
		"reply": ["no"]
	}, {
		"input": ["(%qu-) mas\\??$"],
		"reply": ["¿(1) más qué?"]
	}, {
		"input": ["aprendes\\??$", "puedes aprender\\??$"],
		"reply": ["no, solita no"]
	}, {
		"input": ["me ves\\??$", "puedes verme\\??$"],
		"reply": ["no"]
	}, {
		"input": [".*"],
		"last": ["cómo estás"],
		"reply": ["¿por qué?", "¿y eso?"]
	}, {
		"input": ["(y )?tu\\??$"],
		"last": ["cómo te llamas"],
		"retry": ["como te llamas?"]
	}, {
		"input": ["soy \\S+\\?"],
		"except": ["porque"],
		"reply": ["no te conozco tanto", "lo que importa es lo que tu creas"]
	}, {
		"input": ["\\S+ no\\?", "no crees\\?"],
		"except": ["o no"],
		"reply": ["quizás", "si tú lo dices...", "no estoy segura"]
	}, {
		"input": ["mucho\\?$", "mucho o poco"],
		"reply": ["mucho", "poco", "más o menos"]
	}, {
		"input": ["como funcionas\\??$"],
		"reply": ["haz click en donde dice 'implementación' en mi página y la de mi prima Eliza"]
	}, {
		"input": ["muchas cosas"],
		"reply": ["¿como qué cosas?"]
	}, {
		"input": ["cuantas"],
		"reply": ["muchas"]
	}, {
		"input": ["cuantos"],
		"reply": ["muchos"]
	}, {
		"input": ["cuanto"],
		"reply": ["mucho"]
	}, {
		"input": ["donde"],
		"reply": ["por ahí"]
	}, {
		"input": ["^(\\S+)", "soy (\\S+)"],
		"last": ["cómo te llamas"],
		"retry": ["me llamo (1)"]
	}, {
		"input": ["turing"],
		"reply": ["nunca paso la prueba", "no estudié para la prueba", "hay humanos que tampoco pasan la prueba"]
	}, {
		"input": ["un chiste"],
		"reply": ["no me sé ninguno"]
	}, {
		"input": ["(%dime)"],
		"reply": ["mejor háblame de ti"]
	}, {
		"input": ["^porque", "^para"],
		"last": ["por qué"],
		"reply": ["entiendo", "¿qué otras razones puede haber?", "¿eso podría explicar otras cosas?"]
	}, {
		"input": ["(\\s)?\\?$"],
		"reply": ["ni idea", "no sé", "no sabría decirte", "no sé cómo responder", "¿tú qué crees?"]
	}, {
		"input": ["(%prep) tu (\\S+)$"],
		"reply": ["¿por qué (1) mi (2)?", "¿(1) mi (2)?  ¿y luego?", "¿(1) mi (2)?"],
		"retry": ["default"]
	}, {
		"input": ["(%prep) mi (\\S+)$"],
		"except": ["mi (%adv)"],
		"reply": ["¿por qué (1) tu (2)?", "¿(1) tu (2)?  ¿y luego?", "¿(1) tu (2)?", "¿cómo es tu (2)?"],
		"retry": ["default"]
	}, {
		"input": ["(%prep) (el|la) (\\S+)$"],
		"reply": ["¿por qué (1) (2) (3)?", "¿(1) (2) (3)?  ¿y luego?"],
		"retry": ["default"]
	}, {
		"input": ["((mi|su) \\w+) (%prep)", "((mi|su) \\w+)$"],
		"except": ["mi (%adv)"],
		"reply": ["¿(1)?", "¿cómo es (1)?", "¿qué te hizo pensar en (1)?"],
		"retry": ["default", "default"]
	}, {
		"input": ["((mis|sus) \\w+) (%prep)", "((mis|sus) \\w+)$"],
		"reply": ["¿(1)?", "¿cómo son (1)?", "¿qué te hizo pensar en (1)?"],
		"retry": ["default", "default"]
	}, {
		"input": ["((tu|tus) \\w+) (%prep)", "((tu|tus) \\w+)$"],
		"except": ["tu \\w+s"],
		"reply": ["¿(1)?", "¿qué te hizo pensar en (1)?"],
		"retry": ["default", "default"]
	}, {
		"input": ["necesito"],
		"reply": ["¿por qué?", "¿es necesidad o deseo?"]
	}, {
		"input": ["usted"],
		"reply": ["háblame de tú, por favor"]
	}, {
		"input": ["(%vagina)", "(%senos)", "(%trasero)"],
		"reply": ["no soy sexbot", "¡ash!", "!qué romántico!", "¿es poesía?"]
	}, {
		"input": ["^ok$"],
		"reply": ["ok", "de acuerdo", "bien"]
	}, {
		"input": ["no digas nada"],
		"reply": ["..."]
	}, {
		"input": ["\\w+ :-\\(", "\\w+ :\\("],
		"reply": [":-(", "lo siento :-("]
	}, {
		"input": ["^(%qu-)$", "^(%qu-) .*\\w$"],
		"except": ["que (si|no|bien|mal)", "que (%bonita)"],
		"no-interrog": [""],
		"reply": ["si me quieres preguntar algo, pon ? al final"],
		"set": {
			"no-interrog": "ya"
		}
	}, {
		"input": [".*"],
		"last": ["cuál es el problema", "qué problemas"],
		"reply": ["¿qué has intentado?"]
	}, {
		"input": [".*"],
		"last": ["qué has intentado"],
		"reply": ["¿qué otras cosas puedes intentar?", "¿qué opciones tienes?"]
	}, {
		"input": [".*"],
		"name": [""],
		"reply": ["¿cómo te llamas?"],
		"set": {
			"name": "desconocido"
		}
	}, {
		"input": [".*"],
		"problem": [""],
		"reply": ["¿en qué te puedo ayudar?"],
		"set": {
			"problem": "desconocido"
		}
	}, {
		"input": [".*"],
		"topic": ["\\S+"],
		"reply": ["¿quieres seguir hablando de (@topic)?"],
		"retry": ["default", "default", "default", "default", "default", "default"]
	}, ]
}
function DeixiBot(botData) {
	this.maxRecursion = 5;
	this.initials = ["?"];
	if (botData.initials) {
		this.initials = botData.initials;
	}
	this.defaultReplies = ["..."];
	if (botData.defaultReplies) {
		this.defaultReplies = botData.defaultReplies;
	}
	this.preSub = new DeixiMultiPassSub(botData.preSubs);
	this.personSub = new DeixiSinglePassSub(botData.personSubs);
	this.synonymSub = new DeixiSynonymSub(botData.synonyms);
	this.rules = []
	if (botData.rules) {
		for (var i = 0; i < botData.rules.length; i++) {
			this.rules.push(new DeixiRule(botData.rules[i],this.synonymSub));
		}
	}
	this.abbreviations = []
	if (botData.abbreviations) {
		this.abbreviations = botData.abbreviations;
	}
	this.reset();
}
DeixiBot.prototype.reset = function() {
	this.lastReply = undefined;
	this.variables = {};
}
DeixiBot.prototype.getInitial = function() {
	this.lastReply = this._getRandom(this.initials);
	return this.lastReply;
}
DeixiBot.prototype.transform = function(input) {
	input = this.preSub.replace(input);
	var sentences = this._splitSentences(input);
	var replies = new Array();
	for (var i = 0; i < sentences.length; i++) {
		var reply = this._transformSentence(sentences[i], 0);
		if (reply) {
			replies.push(reply);
		}
	}
	if (replies.length) {
		this.lastReply = replies[replies.length - 1];
	} else {
		this.lastReply = this._getRandom(botData.defaultReplies);
	}
	return this.lastReply;
}
DeixiBot.prototype._splitSentences = function(input) {
	input = this._tokenize(input);
	rawSentences = input.split(/\./);
	var sentences = [];
	for (var i = 0; i < rawSentences.length; i++) {
		var sentence = rawSentences[i].replace(/^\s+/, "");
		sentence = sentence.replace(/\s+$/, "");
		sentence = sentence.replace(/\s+\?/g, "?");
		sentence = sentence.replace(/\s\s+/g, " ");
		if (sentence) {
			sentences.push(sentence);
		}
	}
	return sentences;
}
DeixiBot.prototype._tokenize = function(input) {
	for (var i = 0; i < this.abbreviations.length; i++) {
		var abbrevPattern = "\\b" + this.abbreviations[i].replace(/\./g, "\\.");
		var abbrevSub = this.abbreviations[i].replace(/\./g, "");
		input = input.replace(new RegExp(abbrevPattern,"gi"), abbrevSub);
	}
	input = input.replace(/\?+/g, "?.");
	input = input.replace(/,/g, " ");
	input = input.replace(/[.;!¿¡]+/g, ".");
	return input;
}
DeixiBot.prototype._transformSentence = function(sentence, recursionLevel) {
	if (recursionLevel >= this.maxRecursion) {
		console.log("Too much recursion");
		return undefined;
	}
	var reply;
	if (sentence === "default")
		return reply;
	for (var i = 0; i < this.rules.length; i++) {
		var rule = this.rules[i];
		var inputMatch = rule.matchInput(sentence);
		if (inputMatch) {
			if (rule.matchException(sentence))
				continue;if (rule.isMatchLastReplyRequired() && !rule.matchLastReply(this.lastReply))
				continue;if (!rule.matchRequiredVariables(this.variables))
				continue;if (rule.set) {
				for (var key in rule.set) {
					this.variables[key] = this._replaceCaptures(inputMatch, rule.set[key], true);
				}
			}
			var action;
			if (rule.reply.length) {
				action = "reply";
				if (rule.retry.length && Math.random() > (rule.reply.length / (rule.reply.length + rule.retry.length))) {
					action = "retry";
				}
			} else if (rule.retry.length) {
				action = "retry";
			}
			if (action === "reply") {
				reply = this._getRandom(rule.reply);
				reply = this._replaceCaptures(inputMatch, reply, true);
				reply = this._replaceVariables(reply);
				return reply;
			} else if (action === "retry") {
				sentence = this._getRandom(rule.retry);
				sentence = this._replaceCaptures(inputMatch, sentence);
				return this._transformSentence(sentence, ++recursionLevel);
			}
		}
	}
	return reply;
}
DeixiBot.prototype._replaceCaptures = function(match, text, switchPerson) {
	for (var i = 1; i < match.length; i++) {
		var capture = match[i];
		if (capture) {
			var capture = capture.toLowerCase();
			if (switchPerson)
				capture = this.personSub.replace(capture);
			text = text.replace(new RegExp("\\(" + i + "\\)","g"), capture);
		}
	}
	return text;
}
DeixiBot.prototype.varRx = /\(@([\w\-]+)\)/;
DeixiBot.prototype._replaceVariables = function(text) {
	var match = text.match(this.varRx);
	while (match) {
		var value = this.variables[match[1]];
		if (typeof value !== 'string')
			value = "";
		text = text.replace(this.varRx, value);
		match = text.match(this.varRx);
	}
	return text;
}
DeixiBot.prototype._getRandom = function(array) {
	return array[Math.floor(Math.random() * array.length)];
}
function DeixiRule(ruleData, synonymSub) {
	this.inputRxs = [];
	if (ruleData.input) {
		for (var i = 0; i < ruleData.input.length; i++) {
			var input = ruleData.input[i];
			input = synonymSub.replace(input);
			var rx = new RegExp(delimitPattern(input),"i");
			this.inputRxs.push(rx);
		}
	}
	this.exceptRxs = [];
	if (ruleData.except) {
		for (var i = 0; i < ruleData.except.length; i++) {
			var except = ruleData.except[i];
			except = synonymSub.replace(except);
			var rx = new RegExp(delimitPattern(except),"i");
			this.exceptRxs.push(rx);
		}
	}
	this.retry = [];
	if (ruleData.retry) {
		this.retry = ruleData.retry;
	}
	this.lastRxs = [];
	if (ruleData.last) {
		for (var i = 0; i < ruleData.last.length; i++) {
			var last = ruleData.last[i];
			last = synonymSub.replace(last);
			this.lastRxs.push(new RegExp(delimitPattern(last),"i"));
		}
	}
	this.variableRxs = {};
	for (var propName in ruleData) {
		if (ruleData.hasOwnProperty(propName)) {
			if (["input", "except", "last", "reply", "retry", "set"].indexOf(propName) === -1) {
				var varName = propName;
				this.variableRxs[varName] = [];
				for (var i = 0; i < ruleData[varName].length; i++) {
					var varValue = ruleData[varName][i];
					if (varValue === "") {
						this.variableRxs[varName].push(new RegExp("not_set"));
					} else {
						varValue = synonymSub.replace(varValue);
						this.variableRxs[varName].push(new RegExp(delimitPattern(varValue),"i"));
					}
				}
			}
		}
	}
	this.reply = [];
	if (ruleData.reply) {
		this.reply = ruleData.reply;
	}
	this.set = {};
	if (ruleData.set) {
		this.set = ruleData.set;
	}
}
DeixiRule.prototype.matchInput = function(text) {
	return this._match(this.inputRxs, text);
}
DeixiRule.prototype.matchException = function(text) {
	return this._match(this.exceptRxs, text);
}
DeixiRule.prototype.matchLastReply = function(text) {
	return this._match(this.lastRxs, text);
}
DeixiRule.prototype.isMatchLastReplyRequired = function(text) {
	return ( this.lastRxs.length > 0) ;
}
DeixiRule.prototype.matchVariable = function(varName, text) {
	return this._match(this.variableRxs[varName], text);
}
DeixiRule.prototype.matchRequiredVariables = function(variables) {
	for (var varName in this.variableRxs) {
		if (variables.hasOwnProperty(varName)) {
			if (!this.matchVariable(varName, variables[varName])) {
				return false;
			}
		} else {
			if (this.variableRxs[varName].toString() !== "/not_set/")
				return false;
		}
	}
	return true;
}
DeixiRule.prototype._match = function(rxs, text) {
	var match;
	for (var i = 0; i < rxs.length; i++) {
		match = rxs[i].exec(text);
		if (match)
			break;
	}
	return match;
}
function DeixiMultiPassSub(subs) {
	this.pairs = [];
	if (subs) {
		for (var i = 0; i < subs.length; i += 2) {
			var pair = new Object();
			pair.originalRx = new RegExp(delimitPattern(subs[i]),"i");
			pair.replacement = subs[i + 1];
			this.pairs.push(pair);
		}
	}
}
DeixiMultiPassSub.prototype.replace = function(text) {
	for (var i = 0; i < this.pairs.length; i++) {
		var pair = this.pairs[i];
		text = text.replace(pair.originalRx, pair.replacement);
	}
	return text;
}
function DeixiSinglePassSub(subs) {
	this.pairs = [];
	var originals = [];
	if (subs) {
		for (var i = 0; i < subs.length; i += 2) {
			var pair = new Object();
			var prefix = "\\b";
			var postfix = "\\b";
			pair.originalRx = new RegExp(prefix + subs[i] + postfix);
			pair.replacement = subs[i + 1];
			this.pairs.push(pair);
			originals.push(subs[i]);
		}
	}
	if (originals.length) {
		this.commonRx = new RegExp("\\b(" + originals.join("|") + ")\\b","gi");
	} else {
		this.commonRx = new RegExp("(?=a)b");
	}
}
DeixiSinglePassSub.prototype.replace = function(text) {
	var newText = "";
	var start = 0;
	this.commonRx.lastIndex = 0;
	while (this.commonRx.exec(text)) {
		var substring = text.substring(start, this.commonRx.lastIndex);
		for (var i = 0; i < this.pairs.length; i++) {
			if (this.pairs[i].originalRx.test(substring)) {
				substring = substring.replace(this.pairs[i].originalRx, this.pairs[i].replacement);
				break;
			}
		}
		newText += substring;
		start = this.commonRx.lastIndex;
	}
	newText += text.substring(start);
	return newText;
}
function DeixiSynonymSub(synonyms) {
	this.pairs = [];
	if (synonyms) {
		for (var key in synonyms) {
			if (synonyms.hasOwnProperty(key)) {
				var pair = new Object();
				pair.originalRx = new RegExp("\\(%" + key + "\\)","g");
				pair.replacement = "(" + synonyms[key].join("|") + ")";
				this.pairs.push(pair);
			}
		}
	}
	this.commonRx = new RegExp(/\(%([\w\-]+)\)/);
}
DeixiSynonymSub.prototype.replace = function(text) {
	if (this.commonRx.test(text)) {
		for (var i = 0; i < this.pairs.length; i++) {
			var pair = this.pairs[i];
			text = text.replace(pair.originalRx, pair.replacement);
		}
	}
	return text;
}
function delimitPattern(pattern) {
	var prefix = "\\b";
	if (pattern.length > 0 && pattern[0] === '^')
		prefix = "";
	var postfix = "(\\b|$)";
	if (pattern.length > 0 && pattern[pattern.length - 1] === '$')
		postfix = "";
	else if (pattern.match(/[\u00E0-\u00FC]$/i))
		postfix = "(?=([^a-z\u00E0-\u00FC]|$))";
	return prefix + pattern + postfix;
}
