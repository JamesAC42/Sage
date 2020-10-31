const redis = require("redis");

const getData = (req: any, res: any, cache: any) => {
    const {
        id
    } = req.body;
    cache.get(id, (error: any, result: any) => {
        res.send(result);
    })
}

export default getData;