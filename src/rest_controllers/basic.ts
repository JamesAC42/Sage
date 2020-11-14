const https = require('https')

const basic = (URL: any, cache:any) => {

        https.get(URL,(res: any) => {
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
}

export default basic;