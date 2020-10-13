const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

import validateEmail from '../validateEmail';
import userQueries from '../queries/userQueries';

const register = (req: any, res: any, db: any) => {

    const { 
        username,
        email,
        password,
        passwordConfirm
    } = req.body;

    if(password !== passwordConfirm) {
        res.send({
            success:false,
            error: 'Passwords do not match'
        });
        return;
    }
    if(!validateEmail(email)) {
        res.send({
            success:false,
            error: 'Invalid email address'
        });
        return;
    }

    const findQuery = {
        name: 'find-user',
        text: userQueries.findUser,
        values: [username]
    }

    const findEmailQuery = {
        name: 'find-email',
        text: userQueries.findEmail,
        values: [email]
    }

    db.query(findQuery)
        .then((r: any) => {
            if(r.rows.length > 0) {
                res.send({
                    success:false,
                    error: 'Account with that username already exists.'
                });
                return;
            }
            db.query(findEmailQuery)
            .then((r: any) => {
                if(r.rows.length > 0) {
                    res.send({
                        success:false,
                        error: 'Account with that email already exists.'
                    });
                    return;
                }
            })
            .catch((err: any) => {
                console.log('FIND EMAIL');
                console.log(err);
                res.send({
                    success:false,
                    error: 'Error processing input'
                });
                return;
            })
    
            bcrypt.genSalt(10, (err:any, salt:any) => {
                bcrypt.hash(password, salt, (err:any, hash:any) => {
        
                    const id = uuid();  
                    const insertQuery = {
                        name: 'create-user',
                        text: userQueries.createUser,
                        values: [
                            id,
                            username,
                            hash,
                            email,
                            new Date(),
                            0
                        ]
                    }
        
                    db.query(insertQuery)
                        .then((r: any) => {
                            req.session.key = id;
                            res.send({
                                success:true
                            })
                        })
                        .catch((err: any) => {
                            console.log(err);
                            res.send({
                                success:false,
                                error: 'Error creating user'
                            });
                            return;
                        });
                })
            })
        })
        .catch((err: any) => {
            console.log('FIND USER');
            console.log(err);
            res.send({
                success:false,
                error: 'Error processing input'
            })
            return;
        })

   
}

export default register;