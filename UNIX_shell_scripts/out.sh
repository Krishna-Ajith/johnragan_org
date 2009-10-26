if [ $# -eq 0 ]
  then
    echo "Usage: out [-v] filenames..." 1>&2
    exit 1
fi
if [ "$1" = "-v" ]
  then
    #shift the "$1" argument to get rid of the "-v" argument
    shift
    # looks like "$@" is all of the arguments
    less -- "$@"
  else
    # -- says there are no more options, so leading dashes on file names are legal
    cat -- "$@"
fi