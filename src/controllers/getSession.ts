const getSession = (req: any, res:any) => {
    
    console.log(`sessionID: ${req.session.id}`);
    console.log(`key: ${req.session.key}`);

    let loggedout:boolean = req.session.key === undefined;
    res.send({loggedout});
}

export default getSession;