import User from "../User";
const bcrypt = require('bcrypt');

var Login = (req: any, res: any, users:Array<User>) => {
    console.log("login");
    const { 
        username,
        password
    } = req.body;
    const u:User | undefined = 
        users.find(user => user.username === username);
    if(u === undefined) {
        res.send({
            success:false,
            error: 'User does not exist'
        });
        return;
    }
    bcrypt.compare(password, u.password, (err:any, result:any) => {
        if(result) {
            res.send({
                success:true
            })
        } else {
            res.send({
                success:false,
                error: 'Password was incorrect'
            })
        }
    })
}
exports.default = Login;
