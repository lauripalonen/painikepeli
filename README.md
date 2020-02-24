# Button the Game [![CircleCI](https://circleci.com/gh/lauripalonen/painikepeli.svg?style=svg)](https://circleci.com/gh/lauripalonen/painikepeli) [![codecov](https://codecov.io/gh/lauripalonen/painikepeli/branch/master/graph/badge.svg)](https://codecov.io/gh/lauripalonen/painikepeli)  
A simple "push-the-button" game, deployed at Heroku:  
https://buttonthegame.herokuapp.com  
  
Push the button and have a chance of gaining points. Be aware though; other players are pushing the same button in hunt for the same rewards!

**Rules**  
- Player begins with 20 points  
- Button push costs 1 point
- Player can start again with 20 points after losing

**Rewards**
- every 10th push:  +5 points
- every 100th push: +40 points
- every 500th push: +250 points

## Setup
**Requirements**  
Node.js, npm, React, MongoDB  

**Clone**  
To clone this project, run `git clone https://github.com/lauripalonen/painikepeli.git` on a directory of your choice.  

**npm**  
Run `npm install` on root of both backend and frontend directories to install project depencies.  
  
**MongoDB**  
Log in to your [MongoDB account](https://www.mongodb.com/cloud) or create a new one. Build a new cluster and as a connection method, choose *"Connect your Application"* and copy the connection string (begins with "mongodb+srv://...").

**Environment variables**  
Configuration file in backend/utils/config.js expects a .env file in backend root. Create .env to backend/ and write following four variables to it:  
- `MONGODB_URI=mongodb+srv://<your_credentials>@<db_address>/<collection_name>?retryWrites=true&w=majority` (use the copied connection string here)
- `MONGODB_TEST_URI=mongodb+srv://<your_credentials>s@<db_address>/<test_collection_name>retryWrites=true&w=majority`
- `PORT=3001` (or port of your choice)
- `SECRET=<secret_string_of_your_choice>` (required by jsonwebtoken depency)  

Make sure that the .env file is in your .gitignore!

**Run the project**  
Type `npm run watch` in the backend root to start server. After server is running, run `npm start` in frontend root to start the web page.

## Deploy to Heroku
Create project build by running command `npm run build:ui` in backend root.  

Follow the [Heroku instructions](https://devcenter.heroku.com/articles/git) for setupping Heroku.  
  
**Note!**  
When deploying the code, run command `git subtree push --prefix backend heroku master` on project root directory instead of `git push heroku master`. Heroku expects for the deployable code to be in the repository root, but in our case it is in the backend directory. `git subtree` is a workaround for this issue.


## Backend testing  
To run backend tests, use command `npm test` on backend root. 

## For further development
**Optimize server communication**  
Current communication from frontend to the database is rather heavy. For better performance, one solution would be implementing a WebSocket API to this project. This could also make the reward counter act in real-time, instead of per button push or page reload.

**Restrict /api/ paths**
Paths such as /api/button are not restricted, and anyone can access them. While they don't contain any sensitive data, certainly they should be only in app's use. This issue can be fixed with [Redux state container](https://github.com/reduxjs/redux).

