const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1'
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

//avoid 'current server discovery and monitoring engine is deprecated'
//mongoose.connect(dbURI);

mongoose.set('useUnifiedTopology', true);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true
    }), 1000);

}


mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error:`, err);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected`);
});

if (process.platform === 'win32') {  //'win32'
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        ProcessingInstruction.EMIT("SIGINT");
    });
}

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

//for nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// FOR APP TERMINATION
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {

        process.exit(0);
    });
});

// FOR HEROKU app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {

        process.exit(0);
    });
});
//connect();
//mongoose.connect('mongodb://localhost:27017/travlr', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(dbURI);

//bring in the Mongoose schema
require('./travlr');

