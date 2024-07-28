
# ChargePoint Frontend Assignment
---
![](https://imgs.xkcd.com/comics/self_description.png)

This repository holds the ViriCiti Frontend assignment. In this project you will find the description regarding the assignment for you to do. This assignment represent what we do on a day to day basis. We receive raw data from vehicles store it on database then send it to browser app via web socket.

---

## Getting Started
First of all, fork the repository at:

`https://github.com/viriciti/frontend-assignment`

Then open up your terminal and clone the forked repository

<sup>Replace [YOUR_USERNAME] with your name</sup>

`git clone https://github.com/[YOUR_USERNAME]/frontend-assignment.git`

Enter the directory

`cd frontend-assignment`

Install all the dependencies

`npm i`

Run the app

`npm start`

---

## The Assignment
We have provided you with a starter kit that broadcast vehicle data via web socket. You can find the HTTP server on `src/server/app.js`, it's a bare minimum setup containing an express server to serve HTML page and ws server that broadcast raw data. What you need to build is a front end application that should look like below:

![](https://github.com/viriciti/frontend-assignment/raw/master/sketch.png)

The whole front end application should be build with [React.js](https://reactjs.org/) or [Vue.js](https://vuejs.org/), but you're free to choose how it's build and composed. Data that are needed to render all those component is provided via the web socket connection.

As you can see in this repository there are no webpack configuration and frontend server. You're free to create your own configuration, maybe you want different config for production and development.

### Get Creative!
You can also extend the functionality for both front end and back end of the application. For example, making a more informative front end or incident for vehicle that went to fast on the road (this can be done both in the front end and back end, double points for back end implementation ;) )
### FE Framework!
You can use the frontend framework that you want! (but preferably ReactJS or VueJS)

### The data
On websocket stream the data should look like this:

```JS
{
  time: 1511512585495,
  energy: 85.14600000000002,
  gps: ["52.08940124511719","5.105764865875244"],
  odo: 5.381999999997788,
  speed: 12,
  soc: 88.00000000000007
}
```

* time - Unix timestamp of the moment the datapoint was recorder
* energy - Energy used in kWh
* gps - Latitude and longitude where the datapoint was recorded
* odo - The distance driven in km
* speed - The speed the vehicle was going in km/h
* soc - The state of charge (battery) of the vehicle in %

## Read up material
Looking to level up your knowledge and skills? These are some good articles/courses that you can check out.
* [Vue JS](https://vuejs.org/)
* [ReactJS](https://reactjs.org/)
* [Chartjs](https://www.chartjs.org/)
* [Node.js WebSocket](https://flaviocopes.com/node-websockets/)
### General
* Learn [Node.js and it's modules](http://nodeschool.io/#workshoppers)

## Questions
If you have any questions about the assignment or project setup feel free to contact us at <a href='mailto:enrique.tamames@chargepoint.com'>enrique.tamames@chargepoint.com</a> or <a href='mailto:marco.vanharten@chargepoint.com'>marco.vanharten@chargepoint.com</a>. You can also come by the office. We're always ready to help.

Good luck with the assignment!

# Quick Notes:- 
** Ensure that you have installed all the node modules by command 
`npm install`

## To RUN THE BUILD
if no build created
`npm run build`
Then
`npm run start`

## To run development Environment
`cd src/client`
`npm run start`

### Happy Coding!