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
    .post('/api/get-pending', (request, response) => {

        // response.set('Content-Type', 'application/x-www-form-urlencode')

        getCollaborators();

        function getCollaborators(){
            axios.get(`https://api.github.com/repos/${username}/${repo}/collaborators`, commonHeader)
                .then(results => {

                    let responseText = 'Following tasks need your attention\n' +
                        '1. fernando -> link -> needs review (1 upvote)\n' +
                        '2. saibaskaran -> link -> needs review (0 upvotes)';

                    // results.data.forEach( curUser = {
                    //
                    // })

                    let finalResponse = {
                        "response_type": "in_channel",
                        "text": responseText
                    }
                    response.send(finalResponse);

                    // data.forEach(members => {
                    //     getReviews(members.login);
                    // })
                })
                .catch(error => {
                    response.send(error);
                });
        }

        function getPullRequests(){
            axios.get(`https://api.github.com/repos/${username}/${repo}/pulls`, commonHeader)
                .then(results => {
                    response.json(results.data);
                })
                .catch(error => {
                    response.send(error);
                });
        }

        function getReviews(currentUser){
            axios.get(`https://api.github.com/repos/${currentUser}/${repo}/pulls?state=all`, commonHeader)
                .then(results => {
                    response.json(results.data);
                })
                .catch(error => {
                    response.send(error);
                });
        }

    })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
