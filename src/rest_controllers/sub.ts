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
