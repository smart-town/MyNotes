#include<stdio.h>
// #define SIZ(x) SIZEOF(x)
int main(){
    printf("sizof(int)%ld\n",sizeof(char));

    char a = 127+1;
    printf("%d\n",a);

    char c = 255;
    int i = 255;
    printf("c=%d,i=%d\n",c, i);

    unsigned int maxInt = 0;
    maxInt = 0-1;
    printf("最大的int:%ud\n", maxInt);
    return 0;
}