echo $$
exec 3> $$.output
echo "$0 PID= $$" >&3
exec 3<&-

echo "$? exit status"
ls pid.sh
echo $?
ls xxx
echo $?
exit 0