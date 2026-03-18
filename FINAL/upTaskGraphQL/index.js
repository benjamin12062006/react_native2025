

const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');
require('dotenv').config({ path: 'variables.env' });
const jwt = require('jsonwebtoken');


conectarDB();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req}) => {
        const token = req.headers['authorization'] || '';
        console.log(`Token recibido: ${req.headers['authorization']}`);
        if(token){
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);
                console.log(usuario);
                return {
                    usuario
                };
            } catch (error) {
                console.error('Error al verificar el token:', error);
            }
        }
    },
    cors: {
        origin: ["http://localhost:8081", "http://localhost:19006", "exp://192.168.1.100:19000", "http://localhost:3000", "http://192.168.5.137:8081", "exp://nyohikk-bro_benjamin-8081.exp.direct","https://f422-192-223-121-21.ngrok-free.app"],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 200
    },
    introspection: true,
    playground: true
});

server.listen({
    port: process.env.PORT || 4000,
    host: '0.0.0.0'  // Escucha en todas las interfaces de red
  }).then(({ url }) => {
    console.log(`Servidor listo en la URL ${url}`);
    console.log(`Acceso local: http://localhost:4000`);
    console.log(`Acceso desde red: http://192.168.5.137:4000`);
  });