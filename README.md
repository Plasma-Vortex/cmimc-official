# CMIMC Website
Website for the Carnegie Mellon Informatics and Mathematics Competition. 

## Project Structure
The project runs a node server that uses [MongoDB](https://www.mongodb.com/). The frontend is based on [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/). The styling is done with [Materialize CSS](http://materializecss.com/).

## Developer Set Up

* Start the MongoDB server with `mongod`
* Populate the [`.env` file](https://www.npmjs.com/package/dotenv) with the fields `DB_URL` for your mongo server, `JWT_SECRET` for your json web token private key, and `PORT` for your the port on which you run your node server
* Install dependencies with `npm install`
* Build the react files with `npm run watch` (`npm run build` for production)
* Start the server with `npm run dev` (`npm start` for production)
