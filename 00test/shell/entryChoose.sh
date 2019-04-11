:<<EOF
mytest about ps-ef choose delte...
EOF
echo CURRENT FILE:$0
choose=begin
while test $choose != "q" 
do
	~/Desktop/tip.sh
	read -p "Enter Your Choose:" choose
	echo You have choosed $choose

	#
	case $choose in
	1)
		read -p "param:" param
		~/Desktop/kill.sh $param
		;;
	2)
		echo "waiting..."
		;;
	esac
done
printf "%s\n" "You exit..."
