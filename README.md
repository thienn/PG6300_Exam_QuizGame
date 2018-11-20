# PG6300_Exam_QuizGame

### How to run:
*npm install*

*npm run dev*

Access at: http://localhost:8080/

**NPM and NodeJS required**

### Technologies used:
React with redux to handle some of the elements on frontend. Like high score and reading / adding data to that list.

Socket.io to handle the client's connection to the server + multiplayer game(not implemented)

Express.js for the server and RESTful-API

Passport.js for Authentication and account system

On server side and some of the frontend is code structured or adapted from the lectures in relation to web sockets, REST-API calls and user authentication. But modified and adapted to my needs. Should be noted on top of each file where that is relevant and short explanation on what modifications / expanding has been done (May have missed some, but not on purpose).

### Explanation of current version:
Boilerplate for project is created by myself. Inspiration for npm run dev (to run as single instance) taken from lectures

React is used in frontend for the client. With the help of React-router to move around + change the component shown. Like in Home with login /  register components. Home change the state of what the page show based on logged in or not

Redux is used for handling some of the state. Mainly in relation to Highscore and read/write operations to it.

ExpressJS is used to set up the server and take use of RESTful-API. In this case
to serve the questions(stored in own js file) through GET calls. And users DB API  through GET / POST.

Socket.io - for connecting a client to the server for realtime connection. Then connect the client and his account to an authAPI for multiplayer (Not fully implemented)

Passport to handle the creation and serving the user accounts. (Removed the need for password in this version, but the code is there for expanding later)

### Current state has these features:
- Create & login user (no password required)
- Play single player game with point systems (static points - no timer). 
- Adding the points to high score after game 
- Look at Highscore and search based on user 
- Server can see Client's ID when connecting and disconnecting & whenever user create, login or logout

### To-do list:
- Add multiplayer mode & session handling for it. To take use of web sockets fully.
- Expand the use of redux to most of the frontend as the core system is in place. 
- Randomize the questions with Lodash Shuffle or similar technique. Currently not working due to the way my quiz game is set up. But finding a way to randomise the id number before processing the questions is the idea.	
- Update to pass the highscore back to the server. It's only on client side at the moment. (REST-API post)


