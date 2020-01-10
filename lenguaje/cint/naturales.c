/*
	caracter: char
	texto: char*
	
	salto_de_linea: "\n"
	nuevo: Crea nuevos textos o enteros.
	natural: Es un texto que representa un número natural incluyendo el 0.
	es: int que representa un booleano
	
	textitud: Es longitud de un string convertida a texto. La longitud de un
	 string es pasada con strlen, devuelve un size_t, y lo transforma a int.
*/

char* nuevo_texto()                   {return "";}
char* nuevo_salto_de_linea()          {return "\n";}
char* nuevo_espacio()                 {return "\x20";}
char* nuevo_natural()                 {return "";}
char* texto_desde_texto(char* texto)  {return texto;}
int es_caracter_decimal(char caracter){return caracter>='0' && caracter<='9';}
int longitud_como_entero(char* texto) {return (int)((size_t)strlen(texto));}
void mostrar_texto(char* texto)       {printf("%s",texto);}

char* obtener_longitud_de_texto_como_texto(char* texto){
	int longitud = longitud_como_entero(texto);
	int longitud_longitud = sizeof(longitud);
	char* int_texto = malloc( longitud_longitud + 1 );
	for(int i=longitud_longitud;i>0;--i){
		int_texto[i-1] = '0'+longitud%10;
		longitud /= 10;
	}
	int_texto[8] = '\x00';
	return int_texto;
}
char* textitud_de_natural(char* natural){
	int longitud = longitud_como_entero(natural);
	int longitud_longitud = sizeof(longitud);
	char* int_texto = malloc( longitud_longitud + 1 );
	for(int i=longitud_longitud;i>0;--i){
		int_texto[i-1] = '0'+longitud%10;
		longitud /= 10;
	}
	int_texto[8] = '\x00';
	return int_texto;
}
void mostrar_natural(char* texto){
	int puede_mostrar = 0;
	int longitud = longitud_como_entero(texto);
	for(int i=0;i<longitud;++i){
		char actual = texto[i];
		if(!puede_mostrar){
			if( actual!='0' ){
				puede_mostrar = 1;
			}
		}
		if(puede_mostrar){
			printf("%c",actual);
		}
	}
	if(!puede_mostrar){
		printf("0");	
	}
	return;
}
char* natural_desde_texto(char* texto){
	int longitud = longitud_como_entero(texto);
	char* natural = malloc( longitud + 1 );
	int cantidad_decimales = 0;
	for(int i=0;i<longitud;++i){
		if( es_caracter_decimal(texto[i])  ){
			natural[cantidad_decimales] = texto[i];
			++cantidad_decimales;
		}
	}
	natural[cantidad_decimales] = '\x00';
	return natural;
}
int main(int argc, char *argv[])
{
	mostrar_texto("Texto: '");
	char* cadena = nuevo_texto();
	mostrar_texto(cadena);
	mostrar_texto( "'\n" );
	for(int i=1;i<argc;++i){
		char* actual = argv[i];
		mostrar_texto("Entero: ");
		char* natural = natural_desde_texto(actual);
		mostrar_texto(natural);
		mostrar_texto( "\n" );

		char* la_textitud_de_natural = textitud_de_natural(natural);	
		mostrar_texto("longitud de natural: ");
		mostrar_natural(la_textitud_de_natural);
		mostrar_texto( "\n" );
	}
	return 0;	
}

