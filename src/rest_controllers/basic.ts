const https = require('https');
import {Endpoint} from '../interfaces/Endpoint';

const basic = (endpoint: Endpoint) => {

    return new Promise((resolve: any, reject: any) => {

        https.get(endpoint.url,(res: any) => {
            let body = "";

            res.on("data", (b: any) => {
                body += b;
            });

            res.on("end", () => {
                //console.log("Body result: " + body);
                try {
                    let json = JSON.parse(body);
                    resolve({
                        endpoint,
                        data:json
                    });
                } catch (error) {
                    console.error(error.message);
                    reject(error.message);
                };
            });
        }).on("error", (error:any) => {
            console.error(error.message);
            reject(error.message);
        });
    });
}

export default basic;