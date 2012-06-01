# api2pubsub

Simple proof of concept.  Wanted to have regular api calls push content over sockets, based on the needs of the clients that are connecting.

* Client connects and says I need the following things.
* Server has a map of needs to api calls
* Server checks to see if it is already getting that clients needs
* If not it starts getting those call, and pushes to everyone who also needs that data.

In the end you have one api call serving as many clients as you can have sockets, rather than having many clients making duplicate api calls.


## Setup

api.js has all the api methods, to call
main.js is the server, it has the map of needs to api methods

##usage
npm install
node main.js
