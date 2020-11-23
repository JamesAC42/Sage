import userQueries from '../queries/userQueries';

const getUser = (req:any, res:any, db:any) => {
    
    if(req.session.key === undefined) {
        throw new Error('Not signed in.');
    }

    const userid = req.session.key;

    const query = {
        name: 'get-user',
        text: userQueries.getUser,
        values: [userid]
    }

    db.query(query)
        .then((r: any) => {
            res.send({
                success:true,
                user: r.rows[0]
            })
        })
        .catch((e:any) => {
            console.log(e);
            res.send({
                success:false
            })
        })

}

export default getUser;