# Motivation
Project assigned to me during the PCTO period (alternanza scuola-lavoro) during the month of July 2023.
It's an online version of the Tris game which i already created in another repository (<a href="https://github.com/bdetoni24/TrisGame/tree/main">link here</a>).

![image](https://github.com/bdetoni24/TrisGame/assets/138591220/1c356827-8957-4443-ab07-cd2848aed9dc)

# Requirements
- Node.js installed (v18.16.1)
- XAMPP installed
- Sequelize installed
# How to run
1. Clone this project
2. Open XAMPP and start the Apache and MySQL servers
3. Create a new server with PhpMyAdmin named `database_tris`
4. Open a new Terminal inside the repository on VSC
5. Run `cd server`
6. Run `node server.js`
7. Open another Terminal on VSC
4. Run `cd cliend`
5. Run `npm start`
At this point the project itself shold open a new local server and open a new browser windows, usually `http://localhost:3000/` but the port can change if you have other local server already open. You should also see a message in the server's terminal in order to inform you about the connection with the database.
# Road map
- [X] Make possible to users to be matched togheter in a match 
- [ ] Live moves of each player on the table
- [ ] Manage different scenarios of disconnection with an Error Pop-Up
- [ ] Implement an Party Mode
