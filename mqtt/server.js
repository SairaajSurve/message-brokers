const mqtt = require('mqtt');
require('dotenv').config();
const fs = require('fs');
const socket = require('socket.io');
const express = require('express');

const app = express();
const server = app.listen(3000)

app.use(express.static('./public'));

const io = socket(server);

const options = {
    username: process.env.TEAM_ID,
    password: process.env.PASSWORD
}

var arr;

fs.readFile('./main.csv', (err, data) => {
    arr = data.toString().split('\n');
})

// fs.readFile('./maincsv/Container.csv', (err,data)=>{
//     arr = data.toString().split('\n');
// })

// fs.readFile('./maincsv/TP.csv', (err,data)=>{
//     arr = data.toString().split('\n');
// })

var cnt = 0;
io.sockets.on('connection', run)
const client = mqtt.connect('mqtt://cansat.info:1883', options);

client.on('connect', () => {
    client.subscribe('teams/1004', function (err) {
        if (!err) {
            console.log(`connected flag : ${client.connected} : ${client.options.clientId}`);
        }
        else {
            console.log(err);
        }
    })
})


function run(socket) {
    console.log("New Client : " + socket.id);
    socket.on('start', () => {
        client.subscribe('teams/1004', function (err) {
            var interval = setInterval(function () {
                client.publish('teams/1004', arr[cnt]);
                cnt = cnt + 1;
                if (cnt === 47) clearInterval(interval);
            }, 500);
        })
    })

    socket.on('stop', () => {
        client.end();
    })
}



// var Carr;
// var Tarr;
// var n = [];

// fs.readFile('./maincsv/TP.csv', (err, data) => {
//     console.log('1');
// //     Tarr = data.toString().split('\n');
// })

// fs.readFile('./maincsv/Container.csv', (err, data) => {
//     console.log('2');
//     // Carr = data.toString().split('\n');
//     // console.log(Carr);
// })

// fs.readFile('./maincsv/new.csv', (err, data) => {
//     console.log('3');
//     // for (let i = 0; i < 69; i++) {
//     //     n.push(Carr[i]);
//     //     n.push(Tarr[i]);
//     // }
// })

// fs.readFile('./temp.txt', (err, data) => {
//     console.log('4');
//     // n.forEach((s)=>{
//     //     fs.appendFile('./maincsv/new.csv',s,(err)=>{
//     //     })
//     // })
// })

// console.log('main');