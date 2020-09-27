import User from "../User";
const bcrypt = require('bcrypt');

const Login = (req: any, res: any, users:Array<User>) => {
    const { 
        username,
        password
    } = req.body;
    const u:User | undefined = 
        users.find(user => user.username === username);
    if(u === undefined) {
        res.send({
            success:false,
            error: 'User not found'
        });
        return;
    }
    bcrypt.compare(password, u.password, (err:any, result:any) => {
        if(result) {
            req.session.key = u.id;
            res.send({
                success:true
            })
        } else {
            res.send({
                success:false,
                error: 'Username or password was incorrect'
            })
        }
    })
}

export default Login;
