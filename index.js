const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 6066

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
    .get('/api/auth', (req, res) => {
        console.log(res.console);
        console.log(req.console);

        let testJson = {
          userToken: "asdasd",
          passToke: "secret"
        };

        // res.send('Hello World!');
        res.send(testJson);
    })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
