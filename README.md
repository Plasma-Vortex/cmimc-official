# CMIMC Website
Website for the Carnegie Mellon Informatics and Mathematics Competition. 

## Project Structure
The project runs a node server that uses MySQL. The frontend is based on [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/). The styling is done with [Materialize CSS](http://materializecss.com/).

## Set Up

* Populate the `.env` file with the fields `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME` (database fields), `PORT` (server port), and `JWT_KEY` (JWT secret key)
* Install dependencies with `npm install`
* Build the react files with `npm run watch` (`npm run build` for production)
* Start the server with `npm run dev` (`npm start` for production)
