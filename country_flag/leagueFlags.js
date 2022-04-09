#!/usr/bin/node
const request = require('request');
var http = require('http');
var fs = require('fs');

const options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
  headers: {
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    'X-RapidAPI-Key': 'da4bf87245msh4ceaca1cccafa8bp138615jsne53ec13407e0',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  const leagues = JSON.parse(body).response;
  const countryFlag=[];
  for (const league in leagues) {
    const dataToSearch = leagues[league].country;
    if (dataToSearch.name.includes(process.argv[2])) {
        countryFlag.push(dataToSearch.flag);
    }
  }
  const url = [... new Set (countryFlag)].toString();
  const dest = "flags/"
  request(url)
  .pipe(fs.createWriteStream(dest + process.argv[2] + '.svg'))
});