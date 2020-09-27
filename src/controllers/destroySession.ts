const destroySession = (req: any, res: any) => {
    req.session.destroy((err:any) => {
        if(err) {
            res.send({success: false});
            console.log(`Error destroying session: ${req.session.key}`);
        }
    });
    res.send({success: true});
}

export default destroySession;