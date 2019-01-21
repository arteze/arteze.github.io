function capturar_valores(revierte)
{
	var salida=[]
	var tablas=document.getElementsByTagName("table")
	for(var i=0;i<tablas.length;i++)
	{
		var actual=tablas[i]
		if(actual.border=="1")
		{
			var textos=actual.getElementsByTagName("td")
			var título=textos[0].textContent
			if(título.match(/VEINTE/)!=null)
			{
				for(var j=0;j<5;j++)
				{
					for(var k=0;k<20;k++)
					{
						if(revierte)
						{
							salida.push(textos[11+10*k+2*j].textContent.slice(0))
						}
						else
						{
							salida=[textos[11+10*k+2*j].textContent.slice(0)].concat(salida)
						}
					}
				}
			}
		}
	}
	//salida=salida.slice(0,80)
	return salida
}
capturar_valores()
