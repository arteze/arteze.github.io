function bot_otecald(noRandomFlag)
{
	this.noRandom=(noRandomFlag)?true:false;
	this.capitalizeFirstLetter=true;
	this.debug=false;
	this.memSize=20;
	this.version="1.3";
	if (!this._dataParsed) this._init();
	this.reiniciar();
}
bot_otecald.prototype.reiniciar = function() {
	this.fin=false;
	this.mem=[];
	this.lastchoice=[];
	for (var k=0; k<elizaKeywords.length; k++) {
		this.lastchoice[k]=[];
		var rules=elizaKeywords[k][2];
		for (var i=0; i<rules.length; i++) this.lastchoice[k][i]=-1;
	}
}
bot_otecald.prototype._dataParsed = false;
bot_otecald.prototype._init = function() {
	var global=bot_otecald.prototype.global=self;
	var synPatterns={};
	if ((global.elizaSynons) && (typeof elizaSynons == 'object')) {
		for (var i in elizaSynons) synPatterns[i]='('+i+'|'+elizaSynons[i].join('|')+')';
	}
	if ((!global.elizaKeywords) || (typeof elizaKeywords.length == 'undefined')) {
		elizaKeywords=[['###',0,[['###',[]]]]];
	}
	var sre=/@(\S+)/;
	var are=/(\S)\s*\*\s*(\S)/;
	var are1=/^\s*\*\s*(\S)/;
	var are2=/(\S)\s*\*\s*$/;
	var are3=/^\s*\*\s*$/;
	var wsre=/\s+/g;
	for (var k=0; k<elizaKeywords.length; k++) {
		var rules=elizaKeywords[k][2];
		elizaKeywords[k][3]=k;
		for (var i=0; i<rules.length; i++) {
			var r=rules[i];
			if (r[0].charAt(0)=='$') {
				var ofs=1;
				while (r[0].charAt[ofs]==' ') ofs++;
				r[0]=r[0].substring(ofs);
				r[2]=true;
			}
			else {
				r[2]=false;
			}
			var m=sre.exec(r[0]);
			while (m) {
				var sp=(synPatterns[m[1]])? synPatterns[m[1]]:m[1];
				r[0]=r[0].substring(0,m.index)+sp+r[0].substring(m.index+m[0].length);
				m=sre.exec(r[0]);
			}
			if (are3.test(r[0])) {
				r[0]='\\s*(.*)\\s*';
			}
			else {
				m=are.exec(r[0]);
				if (m) {
					var lp='';
					var rp=r[0];
					while (m) {
						lp+=rp.substring(0,m.index+1);
						if (m[1]!=')') lp+='\\b';
						lp+='\\s*(.*)\\s*';
						if ((m[2]!='(') && (m[2]!='\\')) lp+='\\b';
						lp+=m[2];
						rp=rp.substring(m.index+m[0].length);
						m=are.exec(rp);
					}
					r[0]=lp+rp;
				}
				m=are1.exec(r[0]);
				if (m) {
					var lp='\\s*(.*)\\s*';
					if ((m[1]!=')') && (m[1]!='\\')) lp+='\\b';
					r[0]=lp+r[0].substring(m.index-1+m[0].length);
				}
				m=are2.exec(r[0]);
				if (m) {
					var lp=r[0].substring(0,m.index+1);
					if (m[1]!='(') lp+='\\b';
					r[0]=lp+'\\s*(.*)\\s*';
				}
			}
			r[0]=r[0].replace(wsre, '\\s+');
			wsre.lastIndex=0;
		}
	}
	elizaKeywords.sort(this._sortKeywords);
	bot_otecald.prototype.pres={};
	bot_otecald.prototype.posts={};
	if ((global.elizaPres) && (elizaPres.length)) {
		var a=new Array();
		for (var i=0; i<elizaPres.length; i+=2) {
			a.push(elizaPres[i]);
			bot_otecald.prototype.pres[elizaPres[i]]=elizaPres[i+1];
		}
		bot_otecald.prototype.preExp = new RegExp('\\b('+a.join('|')+')\\b');
	}
	else {
		bot_otecald.prototype.preExp = /####/;
		bot_otecald.prototype.pres['####']='####';
	}
	if ((global.elizaPosts) && (elizaPosts.length)) {
		var a=new Array();
		for (var i=0; i<elizaPosts.length; i+=2) {
			a.push(elizaPosts[i]);
			bot_otecald.prototype.posts[elizaPosts[i]]=elizaPosts[i+1];
		}
		bot_otecald.prototype.postExp = new RegExp('\\b('+a.join('|')+')\\b');
	}
	else {
		bot_otecald.prototype.postExp = /####/;
		bot_otecald.prototype.posts['####']='####';
	}
	if ((!global.elizaQuits) || (typeof elizaQuits.length == 'undefined')) {
		elizaQuits=[];
	}
	bot_otecald.prototype._dataParsed=true;
}
bot_otecald.prototype._sortKeywords = function(a,b) {
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
			for (var q=0; q<elizaQuits.length; q++) {
				if (elizaQuits[q]==part) {
					this.fin=true;
					return this.finalizar();
				}
			}
			var m=this.preExp.exec(part);
			if (m) {
				var lp='';
				var rp=part;
				while (m) {
					lp+=rp.substring(0,m.index)+this.pres[m[1]];
					rp=rp.substring(m.index+m[0].length);
					m=this.preExp.exec(rp);
				}
				part=lp+rp;
			}
			this.sentence=part;
			for (var k=0; k<elizaKeywords.length; k++) {
				if (part.search(new RegExp('\\b'+elizaKeywords[k][0]+'\\b', 'i'))>=0) {
					rpl = this._execRule(k);
				}
				if (rpl!='') return rpl;
			}
		}
	}
	rpl=this._memGet();
	if (rpl=='') {
		this.sentence=' ';
		var k=this._getRuleIndexByKey('xnone');
		if (k>=0) rpl=this._execRule(k);
	}
	return (rpl!='')? rpl : 'I am at a loss for words.';
}
bot_otecald.prototype._execRule = function(k) {
	var rule=elizaKeywords[k];
	var decomps=rule[2];
	var paramre=/\(([0-9]+)\)/;
	for (var i=0; i<decomps.length; i++) {
		var m=this.sentence.match(decomps[i][0]);
		if (m!=null) {
			var reasmbs=decomps[i][1];
			var memflag=decomps[i][2];
			var ri= (this.noRandom)? 0 : Math.floor(Math.random()*reasmbs.length);
			if (((this.noRandom) && (this.lastchoice[k][i]>ri)) || (this.lastchoice[k][i]==ri)) {
				ri= ++this.lastchoice[k][i];
				if (ri>=reasmbs.length) {
					ri=0;
					this.lastchoice[k][i]=-1;
				}
			}
			else {
				this.lastchoice[k][i]=ri;
			}
			var rpl=reasmbs[ri];
			if (this.debug) alert('match:\nkey: '+elizaKeywords[k][0]+
				'\nrank: '+elizaKeywords[k][1]+
				'\ndecomp: '+decomps[i][0]+
				'\nreasmb: '+rpl+
				'\nmemflag: '+memflag);
			if (rpl.search('^ir a ', 'i')==0) {
				ki=this._getRuleIndexByKey(rpl.substring(5));
				if (ki>=0) return this._execRule(ki);
			}
			var m1=paramre.exec(rpl);
			if (m1) {
				var lp='';
				var rp=rpl;
				while (m1) {
					var param = m[parseInt(m1[1])];
					var m2=this.postExp.exec(param);
					if (m2) {
						var lp2='';
						var rp2=param;
						while (m2) {
							lp2+=rp2.substring(0,m2.index)+this.posts[m2[1]];
							rp2=rp2.substring(m2.index+m2[0].length);
							m2=this.postExp.exec(rp2);
						}
						param=lp2+rp2;
					}
					lp+=rp.substring(0,m1.index)+param;
					rp=rp.substring(m1.index+m1[0].length);
					m1=paramre.exec(rp);
				}
				rpl=lp+rp;
			}
			rpl=this._postTransform(rpl);
			if (memflag) this._memSave(rpl)
			else return rpl;
		}
	}
	return '';
}
bot_otecald.prototype._postTransform = function(s) {
	s=s.replace(/\s{2,}/g, ' ');
	s=s.replace(/\s+\./g, '.');
	if ((this.global.elizaPostTransforms) && (elizaPostTransforms.length)) {
		for (var i=0; i<elizaPostTransforms.length; i+=2) {
			s=s.replace(elizaPostTransforms[i], elizaPostTransforms[i+1]);
			elizaPostTransforms[i].lastIndex=0;
		}
	}
	if (this.capitalizeFirstLetter) {
		var re=/^([a-z])/;
		var m=re.exec(s);
		if (m) s=m[0].toUpperCase()+s.substring(1);
	}
	return s;
}
bot_otecald.prototype._getRuleIndexByKey = function(key) {
	for (var k=0; k<elizaKeywords.length; k++) {
		if (elizaKeywords[k][0]==key) return k;
	}
	return -1;
}
bot_otecald.prototype._memSave = function(t) {
	this.mem.push(t);
	if (this.mem.length>this.memSize) this.mem.shift();
}
bot_otecald.prototype._memGet = function() {
	if (this.mem.length) {
		if (this.noRandom) return this.mem.shift();
		else {
			var n=Math.floor(Math.random()*this.mem.length);
			var rpl=this.mem[n];
			for (var i=n+1; i<this.mem.length; i++) this.mem[i-1]=this.mem[i];
			this.mem.length--;
			return rpl;
		}
	}
	else return '';
}
bot_otecald.prototype.finalizar = function() {
	if (!bot_otecald.prototype.global.elizaFinals) return '';
	return elizaFinals[Math.floor(Math.random()*elizaFinals.length)];
}
bot_otecald.prototype.getInitial = function() {
	if (!bot_otecald.prototype.global.elizaInitials) return '';
	return elizaInitials[Math.floor(Math.random()*elizaInitials.length)];
}

if (typeof Array.prototype.push == 'undefined') {
	Array.prototype.push=function(v) { return this[this.length]=v; };
}
if (typeof Array.prototype.shift == 'undefined') {
	Array.prototype.shift=function() {
		if (this.length==0) return null;
		var e0=this[0];
		for (var i=1; i<this.length; i++) this[i-1]=this[i];
		this.length--;
		return e0;
	};
}
