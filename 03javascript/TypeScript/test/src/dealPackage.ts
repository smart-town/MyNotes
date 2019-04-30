"use strict";
const path = require("path");
const fs = require("fs");
var dataName = "data.json";
var objName = "test.json";
var datapath = path.resolve(__dirname, dataName);
var objpath = path.resolve(__dirname, objName);
var resultName = path.resolve(__dirname,"package.json");


var readObjFromFile = function (filepath: any) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (error: any, data: { toString: () => string; }) => {
            if (error) return reject(error);
            resolve(JSON.parse(data.toString()));
        })
    })
}
function errorInfo(error: any) {
    console.error(error);
}

var datasource = readObjFromFile(datapath);
var objsource = readObjFromFile(objpath);
var dataobj = {};
var objobj = {};
async function getDatas() {
    await datasource.then((data) => {
        dataobj = data;
    }, errorInfo).catch(errorInfo);
    await objsource.then((data) => {
        objobj = data;
    }, errorInfo).catch(errorInfo);
    contributeCommands(dataobj, objobj);
    fs.writeFile(resultName, JSON.stringify(objobj), errorInfo);
    console.log("==Generate file to "+resultName);
}
function contributeCommands(data: { commands?: any; }, obj: { contributes?: any; }) {
    let keys = data.commands;
    console.log(keys);
    for (let i = 0; i < keys.length; i++) {
        obj.contributes.commands[i] = generateComand(keys[i]);
    }
}
function generateComand(commandsId: any) {
    return {
        "command": commandsId,
        "title": commandsId,
    }
}
getDatas();