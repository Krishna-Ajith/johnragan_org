#!/bin/sh 

echo "Deleting database if it exists"
curl -X DELETE http://127.0.0.1:5984/mydesign

echo "Creating database"
curl -X PUT http://127.0.0.1:5984/mydesign

jsonDoc=`curl -X PUT http://127.0.0.1:5984/mydesign/LivingWithTheLand -d '{"type":"ride","name":"Living With The Land","park":"Epcot","rating":7}'`
echo $jsonDoc
jsonDoc=`curl -X PUT http://127.0.0.1:5984/mydesign/HauntedMansion -d '{"type":"ride","name":"Haunted Mansion","park":"Magic Kingdom","rating":9}'`
echo $jsonDoc
jsonDoc=`curl -X PUT http://127.0.0.1:5984/mydesign/SoundsDangerous -d '{"type":"ride","name":"Sounds Dangerous","park":"Disney Studios","rating":2}'`
echo $jsonDoc
jsonDoc=`curl -X PUT http://127.0.0.1:5984/mydesign/ExpeditionEverest -d '{"type":"ride","name":"Expedition Everest","park":"Animal Kingdom","rating":10}'`
echo $jsonDoc
jsonDoc=`curl -X PUT http://127.0.0.1:5984/mydesign/SplashMountain -d '{"type":"ride","name":"Splash Mountain","park":"Magic Kingdom","rating":9}'`
echo $jsonDoc
jsonDoc=`curl -X PUT http://127.0.0.1:5984/mydesign/Soaring -d '{"type":"ride","name":"Soaring","park":"Epcot","rating":9}'`
echo $jsonDoc
jsonDoc=`curl -X PUT http://127.0.0.1:5984/mydesign/PeterPan -d '{"type":"ride","name":"Peter Pan","park":"Magic Kingdom","rating":7}'`
echo $jsonDoc
jsonDoc=`curl -X PUT http://127.0.0.1:5984/mydesign/Dinosaur -d '{"type":"ride","name":"Dinosaur","park":"Animal Kingdom","rating":9}'`
echo $jsonDoc
jsonDoc=`curl -X PUT http://127.0.0.1:5984/mydesign/CircleOfLife -d '{"type":"ride","name":"Circle of Life","park":"Epcot","rating":6}'`
echo $jsonDoc
jsonDoc=`curl -X PUT http://127.0.0.1:5984/mydesign/PrimevalWhirl -d '{"type":"ride","name":"Primeval Whirl","park":"Animal Kingdom","rating":7}'`
echo $jsonDoc