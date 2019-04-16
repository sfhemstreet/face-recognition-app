#! /usr/bin/bash
# Name: Nyawade Sidigu
# Cors: CS160B
# File: assign.sh
# Date: 11 April 2019
# Desc: Flow Control, Loops, and Documentation
fileToCheck="test.sh"
if [ -f "$fileToCheck" ]; then
  stat $fileToCheck --printf="Regular file %n exists and is %s bytes in size\n"
else
  echo "$fileToCheck not found"
fi

dirToCheck="temp"
if [ -d "$dirToCheck" ]; then
  echo "Directory $dirToCheck exists"
else
  echo "Making directory $dirToCheck"
  mkdir $dirToCheck
fi

read -p "Enter a number: " numGiven
if [ $numGiven -lt 10 ]; then
  echo "A- that's less than 10"
elif [ $numGiven -ge 50 ] && [ $numGiven -le 100 ]; then
  echo "A- that's between 50 and 100"
elif [ $numGiven -gt 500 ]; then
  echo "A- that's greater than 500"
else
  echo "A- that's between 10 and 50, or between almost 100 and 500"
fi

# had to be more explicit about what's being sought than with if-elif-else
case $numGiven in
  -[0-9]) echo "B- that's less than 10";;
  [0-9]) echo "B- that's less than 10";;
  [1-4][0-9]) echo "B- that's betweeen 10 and almost 50";;
  ([5-9][0-9]|100) echo "B- that's between 50 and 100";;
  [1][0-9][1-9]) echo "B- that's between almost 100 and 500";;
  ([2-4][0-9][0-9]|500) echo "B- that's between almost 100 and 500";;
  * ) echo "B- that's greater than 500"  # other number must now be 501 plus / or is -10 minus
esac

for fileInDir in *?; do
  if [ -d "$fileInDir" ]; then
    echo "found directory $fileInDir"
  else
    echo "found regular file $fileInDir"
  fi
done

for i in {7..38..3}; do
  echo -n "$i "
done
echo

input=0
until [ $input -ge 11 ]; do
  read -p "Enter a number greater than 10: " input
done

input="no"
while [[ ! $input = "yes" ]]; do
  read -p "Enter yes: " input
done
