# Using brackets instead of 'test' as shown in chkargs.sh
if [ $# -eq 0 ]
	then
		echo "You must supply at least one argument" <&2
		exit 1
fi
echo "Program running."