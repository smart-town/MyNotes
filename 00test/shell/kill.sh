
if [ -z $1 ]
then
    echo -e "Usage:[$0 name]"
    exit 1
fi
ps -ef | grep $1 > temp.ps
#cat temp.ps
index=0
allPID=0 #record all pid
while read LINE
do
    nowArr=($LINE) #put line content as array,default split with whitespace
    printf "\e[1;32m[%d]\e[0m---%s\n" $index "$LINE"
    allPID[$index]=${nowArr[1]}
    let "index++"
    #echo PID:${nowArr[1]}
done < ./temp.ps
read -p "input order which you want to kill:" choose

case "$choose" in
[0-9]*)
	if test $choose -lt ${#allPID[@]}
	then
		echo -e "You will kill PID:\e[1;31m[${allPID[choose]}]\e[0m"
		read -p "Are you sure?[Y/N]" answer
		if test $answer=Y
		then
			kill -9 ${allPID[choose]}
		fi
	else
		echo "Your num outnumber ${#allPID[@]}"
	fi
	;;
esac
rm -f temp.ps
