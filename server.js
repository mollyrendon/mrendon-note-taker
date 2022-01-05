/*Requirements:
The code starts off by requiring the express module and the apiRoutes and htmlRoutes.
The app object is created next with PORT set as it's port number.  Express is used to create an HTTP
server on this port which will be used for both API requests and HTML responses from the server.  
*/

const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


/*App Variable:
The app variable is set to express() which creates an instance of Express with its default configuration settings.
The PORT environment variable is checked to see if it has been defined, if it hasn't it will be assignmend 3001 as a default
value.
*/
const app = express();
const PORT = process.env.PORT || 3001;

/*Use and Listen Methods
The app object has two methods, use() and listen().  The use() method takes in a function or callback function that will handle HTTP
requests made to the application's URL path, while listen() listens for incoming connections on a specified port number.  
*/
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})