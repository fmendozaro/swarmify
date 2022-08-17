require('dotenv').config()
const express = require('express')
const axios = require('axios')
const path = require('path')
const {response} = require("express")
const PORT = process.env.PORT
const username = 'fmendozaro';
const repo = 'swarmify';
const commonHeader = {
    headers: {
        Authorization: `Bearer ${process.env.GH_TOKEN}`
    }
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index')) // Index HTML Landing Page
  .get('/api/auth', (req, res) => {
        // Placeholder for OAUTH
        let testJson = {
          userToken: "fakeuser",
          passToken: "secret"
        };

        res.send(testJson);
    })
    .get('/api/get-pending', (request, response) => {

        getCollaborators();

        function getCollaborators(){
            axios.get(`https://api.github.com/repos/${username}/${repo}/collaborators`, commonHeader)
                .then(results => {
                    response.json(results.data);
                    data.forEach(members => {
                        getReviews(members.login);
                    })
                })
                .catch(error => {
                    response.send(error);
                });
        }

        function getPullRequests(){
            axios.get(`https://api.github.com/repos/${username}/${repo}/pulls`, commonHeader)
                .then(res => {
                    console.log(`statusCode: ${res.status}`);
                    console.log(res);
                    // getReviews(1);
                })
                .catch(error => {
                    response.send(error);
                });
        }

        function getReviews(pullNumber){
            axios.get(`https://api.github.com/repos/${username}/${repo}/pulls/${pullNumber}/reviews/`, commonHeader)
                .then(res => {
                    console.log(`statusCode: ${res.status}`);
                    console.log(res);
                })
                .catch(error => {
                    response.send(error);
                });
        }

    })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
