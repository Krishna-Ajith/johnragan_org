# This goes through all the files in the current directory
for i in *
do
  # Tests to see if this is a directory
  if [ -d "$i" ]
    then
      echo "$i"
  fi
done