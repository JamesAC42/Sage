const { v4: uuid } = require('uuid');

import User from "../User";
import validateEmail from "../validateEmail"
const bcrypt = require('bcrypt');

const Register = (req: any, res: any, users:Array<User>) => {
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
    if(users.find(user => user.email === email)) {
        res.send({
            success:false,
            error: 'Account with that email already exists'
        });
        return;
    }
    if(users.find(user => user.username === username)) {
        res.send({
            success:false,
            error: 'Account with that username already exists'
        });
        return;
    }
    bcrypt.genSalt(10, (err:any, salt:any) => {
        bcrypt.hash(password, salt, (err:any, hash:any) => {
            const user:User = new User(
                uuid(),
                username,
                hash,
                email
            );
            users.push(user);
            req.session.key = user.id;
            res.send({
                success:true
            });
        })
    })
}

export default Register;