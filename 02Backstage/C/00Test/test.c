#include <stdio.h>

void testAddressOpe(int);
void testEnumType();
int main(){
    printf("Hello,smalltown\n");
    testAddressOpe(12);
    testEnumType();
}
void testAddressOpe(int param) {
    printf("&i:0x%x\n", &param);
}
void testEnumType() {
    enum Status { NORMAL, ERROR, EXCEPTION };
    int status = 0;
    char *statusName = NULL;
    switch(status) {
        case NORMAL: statusName = "NORMAL"; break;
	case ERROR: statusName = "ERROR"; break;
	default: statusName = "EXCEPTION"; break;
    };
    printf("status:%s", statusName);
}
