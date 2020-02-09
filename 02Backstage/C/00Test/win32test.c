#include<stdio.h>
#include<windows.h>

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
    MessageBox(NULL, "Hello! Cruel World!", "NOTE", MB_OK);
    return 0;
}
