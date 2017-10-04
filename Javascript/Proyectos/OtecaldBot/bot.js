function bot_otecald(noRandomFlag)
{
	this.noRandom=(noRandomFlag)?true:false
	this.capitalizar_primera_letra=true
	this.debug=false
	//this.debug=true
	this.memSize=20
	this.version="1.4"
	bot_otecald.prototype.iniciado=this.iniciar()
	this.reiniciar()
}
bot_otecald.prototype.reiniciar = function() {
	this.quit=false
	this.mem=[]
	this.lastchoice=[]
	for (var i in bot.palabras_clave) {
		this.lastchoice[i]=[]
		var rules=bot.palabras_clave[i][2]
		for (var j in rules){
			this.lastchoice[i][j]=-1
		}
	}
}
bot_otecald.prototype.iniciar = function() {
	var synPatterns={}
	for (var i in bot.sinónimos)
	{
		synPatterns[i]='('+i+'|'+bot.sinónimos[i].join('|')+')'
	}
	var sre=/@(\S+)/
	var are=/(\S)\s*\*\s*(\S)/
	var are1=/^\s*\*\s*(\S)/
	var are2=/(\S)\s*\*\s*$/
	var are3=/^\s*\*\s*$/
	var wsre=/\s+/g
	for (var i in bot.palabras_clave) {
		var rules=bot.palabras_clave[i][2]
		bot.palabras_clave[i][3]=i
		for (var j in rules){
			var r=rules[j]
			if (r[0].charAt(0)=='$') {
				var ofs=1
				while (r[0].charAt[ofs]==' ') ofs++
				r[0]=r[0].substring(ofs)
				r[2]=true
			}
			else {
				r[2]=false
			}
			var m=sre.exec(r[0])
			while (m) {
				var sp=(synPatterns[m[1]])? synPatterns[m[1]]:m[1]
				r[0]=r[0].substring(0,m.index)+sp+r[0].substring(m.index+m[0].length)
				m=sre.exec(r[0])
			}
			if (are3.test(r[0])) {
				r[0]='\\s*(.*)\\s*'
			}
			else {
				m=are.exec(r[0])
				if (m) {
					var lp=''
					var rp=r[0]
					while (m) {
						lp+=rp.substring(0,m.index+1)
						if (m[1]!=')') lp+='\\b'
						lp+='\\s*(.*)\\s*'
						if ((m[2]!='(') && (m[2]!='\\')) lp+='\\b'
						lp+=m[2]
						rp=rp.substring(m.index+m[0].length)
						m=are.exec(rp)
					}
					r[0]=lp+rp
				}
				m=are1.exec(r[0])
				if (m) {
					var lp='\\s*(.*)\\s*'
					if ((m[1]!=')') && (m[1]!='\\')) lp+='\\b'
					r[0]=lp+r[0].substring(m.index-1+m[0].length)
				}
				m=are2.exec(r[0])
				if (m) {
					var lp=r[0].substring(0,m.index+1)
					if (m[1]!='(') lp+='\\b'
					r[0]=lp+'\\s*(.*)\\s*'
				}
			}
			r[0]=r[0].replace(wsre, '\\s+')
			wsre.lastIndex=0
		}
	}
	bot.palabras_clave.sort(this.criterio_palabras_claves)
	procesar(["primero","segundo"])	
	return true
}
bot_otecald.prototype.criterio_palabras_claves = function(a,b) {
	if (a[1]>b[1]) return -1
	else if (a[1]<b[1]) return 1
	else if (a[3]>b[3]) return 1
	else if (a[3]<b[3]) return -1
	else return 0;
}
bot_otecald.prototype.responder = function(text) {
	var rpl='';
	this.fin=false;
	text=text.toLowerCase();
	text=text.replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, ' ');
	text=text.replace(/\s+-+\s+/g, '.');
	text=text.replace(/\s*[,\.\?!;]+\s*/g, '.');
	text=text.replace(/\s*\bbut\b\s*/g, '.');
	text=text.replace(/\s{2,}/g, ' ');
	var parts=text.split('.');
	for (var i=0; i<parts.length; i++) {
		var part=parts[i];
		if (part!='') {
			for (var j in bot.chau) {
				if (bot.chau[j]==part)
				{
					this.fin=true
					return this.obtener_mensaje_final()
				}
			}
			var m=this.primeroExp.exec(part);
			if (m) {
				var lp='';
				var rp=part;
				while (m) {
					lp+=rp.substring(0,m.index)+this.primero[m[1]];
					rp=rp.substring(m.index+m[0].length);
					m=this.primeroExp.exec(rp);
				}
				part=lp+rp;
			}
			this.sentence=part;
			for (var j in bot.palabras_clave) {
				if (part.search(new RegExp('\\b'+bot.palabras_clave[j][0]+'\\b', 'i'))>=0) {
					rpl = this.execRule(j);
				}
				if (rpl!='') return rpl;
			}
		}
	}
	rpl=this.memGet();
	if (rpl=='') {
		this.sentence=' ';
		var k=this.getRuleIndexByKey('xnone');
		if (k>=0) rpl=this.execRule(k);
	}
	return (rpl!='')? rpl : 'I am at a loss for words.';
}
bot_otecald.prototype.execRule = function(j) {
	var rule=bot.palabras_clave[j]
	var decomps=rule[2]
	var paramre=/\(([0-9]+)\)/
	for (var i=0; i<decomps.length; i++) {
		var m=this.sentence.match(decomps[i][0])
		if (m!=null) {
			var reasmbs=decomps[i][1]
			var memflag=decomps[i][2]
			var ri= (this.noRandom)? 0 : posición_aleatoria(reasmbs)
			if (((this.noRandom) && (this.lastchoice[j][i]>ri)) || (this.lastchoice[j][i]==ri)) {
				ri= ++this.lastchoice[j][i]
				if (ri>=reasmbs.length) {
					ri=0
					this.lastchoice[j][i]=-1
				}
			}
			else {
				this.lastchoice[j][i]=ri
			}
			var rpl=reasmbs[ri]
			if (this.debug) alert('match:\nkey: '+bot.palabras_clave[j][0]+
				'\nrank: '+bot.palabras_clave[j][1]+
				'\ndecomp: '+decomps[i][0]+
				'\nreasmb: '+rpl+
				'\nmemflag: '+memflag)
			if (rpl.search('^ir a ', 'i')==0) {
				ki=this.getRuleIndexByKey(rpl.substring(5))
				if (ki>=0) return this.execRule(ki)
			}
			var m1=paramre.exec(rpl)
			if (m1) {
				var lp=''
				var rp=rpl
				while (m1) {
					var param = m[parseInt(m1[1])]
					var m2=this.segundoExp.exec(param)
					if (m2) {
						var lp2=''
						var rp2=param;
						while (m2) {
							lp2+=rp2.substring(0,m2.index)+this.posts[m2[1]]
							rp2=rp2.substring(m2.index+m2[0].length)
							m2=this.segundoExp.exec(rp2)
						}
						param=lp2+rp2
					}
					lp+=rp.substring(0,m1.index)+param
					rp=rp.substring(m1.index+m1[0].length)
					m1=paramre.exec(rp)
				}
				rpl=lp+rp
			}
			rpl=this.postTransform(rpl)
			if (memflag) this._memSave(rpl)
			else return rpl
		}
	}
	return ''
}
bot_otecald.prototype.postTransform = function(s) {
	s=s.replace(/\s{2,}/g, ' ');
	s=s.replace(/\s+\./g, '.');
	for (var i in bot.tercero) {
		s=s.replace(bot.tercero[i][0],bot.tercero[i][1])
		bot.tercero[i][0].lastIndex=0
	}
	if (this.capitalizar_primera_letra) {
		var re=/^([a-z])/
		var m=re.exec(s)
		if (m) s=m[0].toUpperCase()+s.substring(1)
	}
	return s
}
bot_otecald.prototype.getRuleIndexByKey = function(key) {
	for (var i in bot.palabras_clave) {
		if(bot.palabras_clave[i][0]==key){return i}
	}
	return -1;
}
bot_otecald.prototype.memSave = function(t) {
	this.mem.push(t);
	if (this.mem.length>this.memSize) this.mem.shift();
}
bot_otecald.prototype.memGet = function() {
	if (this.mem.length) {
		if (this.noRandom) return this.mem.shift();
		else {
			var n=posición_aleatoria(this.mem);
			var rpl=this.mem[n];
			for (var i=n+1; i<this.mem.length; i++) this.mem[i-1]=this.mem[i];
			this.mem.length--;
			return rpl;
		}
	}
	else return '';
}
bot_otecald.prototype.obtener_mensaje_final=function(){return elemento_aleatorio(bot.fin)}
bot_otecald.prototype.obtener_mensaje_inicial=function(){return elemento_aleatorio(bot.inicio)}
