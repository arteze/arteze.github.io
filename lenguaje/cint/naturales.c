char* nuevo_texto()                   {return "";}
char* nuevo_salto_de_linea()          {return "\n";}
char* nuevo_espacio()                 {return "\x20";}
char* nuevo_natural()                 {return "";}
char* texto_desde_texto(char* texto)  {return texto;}
int es_caracter_decimal(char caracter){return caracter>='0' && caracter<='9';}

void mostrar_texto(char* texto){
	printf("%s",texto);
	return;
}
long obtener_longitud_como_long(char* texto){
	size_t longitud = strlen(texto);
	long longitud_como_long = longitud;
	return longitud_como_long;
}
char* obtener_longitud_de_texto_como_texto(char* texto){
	long longitud = obtener_longitud_como_long(texto);
	int longitud_longitud = sizeof(longitud);
	char* long_texto = malloc( longitud_longitud + 1 );
	for(int i=longitud_longitud;i>0;--i){
		long_texto[i-1] = '0'+longitud%10;
		longitud /= 10;
	}
	long_texto[8] = '\x00';
	return long_texto;
}
char* obtener_longitud_de_natural_como_texto(char* natural){
	long longitud = obtener_longitud_como_long(natural);
	int longitud_longitud = sizeof(longitud);
	char* long_texto = malloc( longitud_longitud + 1 );
	for(int i=longitud_longitud;i>0;--i){
		long_texto[i-1] = '0'+longitud%10;
		longitud /= 10;
	}
	long_texto[8] = '\x00';
	return long_texto;
}
void mostrar_natural(char* texto){
	int puede_mostrar = 0;
	long longitud = obtener_longitud_como_long(texto);
	for(long i=0;i<longitud;++i){
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
	long longitud = obtener_longitud_como_long(texto);
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
	char* salto_de_linea = nuevo_salto_de_linea();
	mostrar_texto(cadena);
	mostrar_texto( "'\n" );
	for(int i=1;i<argc;++i){
		char* actual = argv[i];
		mostrar_texto("Entero: ");
		char* natural = natural_desde_texto(actual);
		mostrar_natural(natural);
		mostrar_texto( salto_de_linea );

		char* longitud_de_natural = obtener_longitud_de_natural_como_texto(natural);	
		mostrar_texto("Longitud de natural: ");
		mostrar_natural(longitud_de_natural);
		mostrar_texto( salto_de_linea );
	}
	return 0;	
}

