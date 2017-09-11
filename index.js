/* import environmental variables */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express'),
      app = express(),
      server = require('http').Server(app),
      path = require('path'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');

/* declare all models */
const User = require('./database/user'),
      Student =  require('./database/student'),
      Team =  require('./database/team');

if (process.env.NODE_ENV !== 'production') {
  app.use(require('morgan')('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/docs', express.static('public/assets/docs'));
app.use('/data', express.static('public/assets/json'));

/* start database connection */
mongoose.connect(process.env.DB_URL, { 
  useMongoClient: true,
  promiseLibrary: require('bluebird') 
});

/* route endpoints */
const authRouter = require('./routes/auth'),
      userRouter = require('./routes/users'),
      teamRouter = require('./routes/teams');
app.use('/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/teams', teamRouter);

/* serve home page */
app.get('/*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

/* start http server */
server.listen(process.env.PORT, () => {
  const port = server.address().port;
  console.log('CMIMC running on port', port);
});
