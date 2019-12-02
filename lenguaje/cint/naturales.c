char* nuevo_texto()         {return "";}
char* nuevo_salto_de_linea(){return "\n";}
char* nuevo_espacio()       {return "\x20";}
char* nuevo_natural()       {return "";}

char* natural_desde_texto(char* texto){
	return texto;
}

void mostrar_string(char* string){
	printf("%s",string);
	return;
}
long obtener_longitud_de_string_como_long(char* string){
	size_t longitud = strlen(string);
	long longitud_como_long = longitud;
	return longitud_como_long;
}
void mostrar_natural(char* string){
	int puede_mostrar = 0;
	long longitud = obtener_longitud_de_string_como_long(string);
	for(long i=0;i<longitud;++i){
		char actual = string[i];
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
char* obtener_longitud_como_string(char* string){
	long longitud = obtener_longitud_de_string_como_long(string);
	int longitud_longitud = sizeof(longitud);
	char* long_string = malloc( longitud_longitud + 1 );
	for(int i=longitud_longitud;i>0;--i){
		long_string[i-1] = '0'+longitud%10;
		longitud /= 10;
	}
	long_string[8] = '\x00';
	return long_string;
}
int main(int argc, char *argv[])
{
	mostrar_string("Texto: '");
	char* cadena = nuevo_texto();
	char* salto_de_linea = nuevo_salto_de_linea();
	mostrar_string(cadena);
	mostrar_string( "'\n" );
	for(int i=1;i<argc;++i){
		char* actual = argv[i];
		mostrar_string("Entero: ");
		char* natural = natural_desde_texto(actual);
		mostrar_natural(natural);
		mostrar_string( salto_de_linea );

		char* longitud_de_natural = obtener_longitud_como_string(natural);	
		mostrar_string("Longitud de natural: ");
		mostrar_natural(longitud_de_natural);
		mostrar_string( salto_de_linea );
	}
	return 0;	
}

