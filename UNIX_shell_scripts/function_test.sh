function nam () {
typeset shared_var
shared_var=inside
echo $shared_var
echo $myname
myname=zach
}

shared_var=outside
echo $shared_var

myname=alex
nam
echo "$myname"

echo $shared_var