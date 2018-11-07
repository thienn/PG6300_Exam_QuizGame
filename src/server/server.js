const app = require("./app");

//const server = require('http').Server(app);


app.listen(process.env.PORT || 8080, () => {
    console.log('Starting Express server');
});

