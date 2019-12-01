#include <iostream>

using namespace std;

void incremento(int binario[],int base)
{
	binario[3]++;
	for(int i=3;i>0;i--)
	{
		if(binario[i]==base)
		{
			binario[i]=0;
			binario[i-1]++;
		}
		else
		{
			break;
		}
	}
}
int obtener_aciertos(int array_1[],int array_2[])
{
	int devuelve=0;
	int acertados[]={0,0,0,0};
	for(int i=0;i<4;i++)
	{
		for(int j=0;j<4;j++)
		{
			if(array_1[i]==array_2[j]&acertados[j]==0)
			{
				acertados[j]=1;
				devuelve++;
				break;
			}
		}
	}
	return devuelve;
}
void mostrar(int i,int divide,long long devuelve[])
{
	cout
		<<i/divide*219<<" "
		<<devuelve[0]<<" "<<devuelve[1]<<" "<<devuelve[2]<<" "<<devuelve[3]<<" "<<devuelve[4]<<" "
		<<"\n";
}
void coincidencia_letras()
{
	long total=0;
	int hasta=(26*26*26*26);
	long long devuelve[]={0,0,0,0,0};
	int array_1[]={0,0,0,0};
	for(int i=0;i<hasta;i++)
	{
		int divide=10;
		if(i%divide==0)
		{
			mostrar(i,divide,devuelve);
		}
		int array_2[]={0,0,0,0};
		for(int j=0;j<hasta;j++)
		{
			int aciertos=obtener_aciertos(array_1,array_2);
			devuelve[aciertos]++;
			total++;
			incremento(array_2,26);
		}
		incremento(array_1,26);
	}
	mostrar(0,1,devuelve);
}

int main()
{
    coincidencia_letras();
    return 0;
}
