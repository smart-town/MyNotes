#include<stdio.h>
void f();

static int gall;
int main(){
    f();
    f();
    f();
    printf("&gall=%p",&gall);
    return 0;
}

void f(){
    static int all = 1;
    printf("in %s all=%d----&all=%p\n",__func__,all,&all);
    all += 2;
    printf("agn in %s all=%d\n",__func__,all);
}