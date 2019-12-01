#Cofonedor
Cofonedor (Proyecto fon): Conversor de textos a fonética.

Los reemplazos son los siguientes:

Algunas cosas a considerar: ¿Qué pasa al convertir y reconvertir ciertas palabras? La R normal queda igual, mientras que la doble R, es decir, RR, se convierte en Z, ya que se pronuncian diferente. Tanto la Z, como CE y CI pasa a S, mientras que CA, CO y CU QUE QUI pasan a K. Es importante que antes de convertir, se escriba con la diéresis, por ejemplo, GÜ pasa a GU. GE y GI pasa a J, mientras que GA, GO y GU se quedan igual. CH sería TLL, pero ya que LL pasa a Y, queda TY. La H no se pronuncia. Tanto la W como la V pasa a B, la Ñ pasa a NI, la X pasa a KS.

	["V","B"],
	["Z","S"],["RR","Z"],
		
	["GE","JE"],["GI","JI"],
	["GUE","GE"],["GUI","GI"],
	["GÜE","GUE"],["GÜI","GUI"],
		
	["CH","TY"],["SH","Y"],["LL","Y"],["H",""],
		
	["WA","BUA"],["WE","BUE"],["WI","BUI"],["WO","BUO"],["WU","BU"],
	["ÑA","NIA"],["ÑE","NIE"],["ÑO","NIO"],["ÑU","NIU"],["ÑI","NI"],
		
	["CA","KA"],["CO","KO"],["CU","KU"],["CE","SE"],["CI","SI"],["C","K"],
	["X","KS"],["QU","K"]
