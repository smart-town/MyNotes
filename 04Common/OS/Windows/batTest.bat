@echo off
echo "Test About Bash"

:VarTest
echo "About some var..."
echo %%cd%%: %cd%
echo %%~dp0%%: %~dp0%
echo %%~n0%%: %~n0%
echo %%*%: %* [seems all arguments of bat files]
@echo on