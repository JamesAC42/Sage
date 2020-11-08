import { isConstructSignatureDeclaration } from "typescript";

var zmq = require("zeromq"), sock = zmq.socket("sub");

const sub = (req:any, res:any, db: any, cache:any) => {
    sock.connect("tcp://127.0.0.1:3500");
    sock.subscribe('');

    sock.on("message", function(message: any) {
    console.log("Message:", message);

    const URL = message.data.endpoint;
    const params = message.data.parameters;
    const id = message.dashboard.id;

    if(/*If format is Odata*/) {
        //fetch data using Odata
    }
    if(/*If format is GraphQL*/) {
        //fetch data using GraphQL
    }
    if(/*If format is RSS*/) {
        //fetch data using RSS
    }
    if(/*If format is REST*/) {
        //fetch data using REST
    }
    
    cache.set(id, JSON.stringify(
        [{
            //write data to cache
        }]
    ));
    
});
}

export default sub;





//get URL inputs from users
//update endpoints by using Zeromq 

//placeholder hello world example
// const zmq = require('zeromq');

// async function runServer() {
//   const sock = new zmq.Reply();

//   //waits for messages from port 3500
//   await sock.bind('tcp://*:3500');
  
//   for await (const [msg] of sock) {
//     console.log('Received ' + ': [' + msg.toString() + ']');
//     await sock.send('World');

//     // Do some 'work'
//   }
// }

// runServer();

//HTTPS GET REQUEST
const https = require('https')

let url = "website name"
https.get(url,(res: any) => {
    let body = "";

    res.on("data", (b: any) => {
        body += b;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            // do something with JSON
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error:any) => {
    console.error(error.message);
});

//GRAPHQL
const { graphqlHTTPL:any } = require('express-graphql');

app.use(
  '/graphql',
  graphqlHTTP({
    schema: 'MyGraphQLSchema',
    graphiql: true,
  }),
);
