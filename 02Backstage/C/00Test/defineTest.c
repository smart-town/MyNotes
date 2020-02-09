#include<stdio.h>
#define Mine printf("Hello!\n")
#define DefineFunc(x) (x)

void predefine();
void testDefineFunc();
int main(){
    Mine;
    predefine();
    testDefineFunc();
    return 0;
}

void predefine() {
    printf("__FILE__:%s\n", __FILE__);
    printf("__LINE__:%d\n", __LINE__);
    printf("__DATE__:%s\n", __DATE__);
    printf("__TIME__:%s\n", __TIME__);
    printf("__STDC__:%d\n", __STDC__);
}

void testDefineFunc() {
    printf("\n\n---test define Func---");
    printf("%s\n", DefineFunc("okk"));
}
