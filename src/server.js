const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();
//TODO MUNDO CONSEGUE ACESSAR A APLICAÇÃO

app.use(cors());

//real time
const server = require('http').Server(app);
const io = require('socket.io')(server);

//só pessoas que estão em determinada pasta receberão notificação que um arquivo foi adicionado
io.on('connection', socket => {
    socket.on('connectRoom', box =>{
        socket.join(box);
    })
})

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-m9f9t.mongodb.net/omnistack?retryWrites=true',
{
    useNewUrlParser: true
})

app.use((req, res, next) => {
    req.io = io;

    return next();
})

 
//cadastrar um modulo dentro do express
app.use(express.json());

//permite upload de arquivos
app.use(express.urlencoded({ extended: true}));

//usa rotas de Routes.js
app.use(require('./routes'));

//todas vez que acessar a pasta file, irá acessar a pasta tmps
app.use('/files', express.static(path.resolve(__dirname, '..','tmps')));

server.listen(process.env.PORT || 333);

//VARIAVEIS AMBIENTES = proccess.env.PORT