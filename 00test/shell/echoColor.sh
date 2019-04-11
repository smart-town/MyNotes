# printf something with color
:<<EOF
color pattern: "\033[33;36;5m CHARS \033[0m"
\033
"m" means set attribute and end special chars
"33" "36" "5" "0"  is really speal chars
change "44;36;5" can generate different colors, the order of values has no relationship
EOF
printColor(){
	# param 1 is color, param 2 is which need to print
	if test -n $2
	then
		printf "\e[1;$1m%s\e[0m" "$2"
	fi
}
printRed(){
	printColor 31 $1
}
printGreen(){
	printColor 32 $1
}
