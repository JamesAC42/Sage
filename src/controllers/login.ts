const bcrypt = require('bcrypt');
import userQueries from '../queries/userQueries';

const Login = (req: any, res: any, db: any) => {
    const { 
        username,
        password
    } = req.body;

    const query = {
        name: 'find-user',
        text: userQueries.findUser,
        values: [username]
    }

    db.query(query)
        .then((r: any) => {
            if(r.rows.length === 0) {
                console.log(r.rows);
                res.send({
                    success:false,
                    error: 'User does not exist'
                });
            } else {
                const pw = r.rows[0].password;
                bcrypt.compare(password, pw, (err:any, result:boolean) => {
                    if(result) {
                        req.session.key = r.rows[0].id
                        res.send({
                            success:true
                        });
                    } else {
                        res.send({
                            success:false,
                            error: 'Password was incorrect'
                        })
                    }
                })
            }
        })
        .catch((e: any) => {
            console.log(e);
            res.send({
                success:false,
                error: 'User does not exist'
            })
        })
}

export default Login;
