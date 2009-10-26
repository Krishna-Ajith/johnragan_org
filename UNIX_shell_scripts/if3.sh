# You can run this in debug mode, as follows:
# bash -x if3.sh one two three

echo -n "word 1: "
read word1
echo -n "word 2: "
read word2
echo -n "word 3: "
read word3
# -a is AND
if [ "$word1" = "$word2" -a "$word2" = "$word3" ]
  then
    echo "Match: words 1, 2, & 3"
  elif [ "$word1" = "$word2" ]
  then
    echo "Match: words 1 & 2"
  elif [ "$word1" = "$word3" ]
  then
    echo "Match: words 1 & 3"
  elif [ "$word2" = "$word3" ]
  then
    echo "Match: words 2 & 3"
  else
    echo "No match"
fi