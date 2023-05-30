const userDB = {
    users: require('../models/users.json'),
    setUser: function (data) {
        this.users = data;
    }
}

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
require('dotenv').config();
const path = require('path')
const fsPromise = require('fs/promises')

const handleLogin = async (req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd) 
    return res.status(400).json({message: "username and password requires"});
   const foundUser = userDB.users.find((person) => person.username === user)

    if(!foundUser)  return res.status(401).json({message: "User does not exist"})


    //evaluate password
    const match =  await bcrypt.compare(pwd, foundUser.password)
    if(match) {
        const roles = Object.values(foundUser.username)
        //create jwts
        const accessToken = jwt.sign(
            {"userInfo": {
                "username" : foundUser.username,
                "roles" : roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        );

        const refreshToken = jwt.sign(
            {username: foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        // saving the refreshtoken with current user                                                
        const otherUser = userDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = {...foundUser, refreshToken}
        userDB.setUser([...otherUser, currentUser])

        await fsPromise.writeFile( path.join(__dirname, '..', 'models', 'users.json'), JSON.stringify(userDB.users) )


        res.cookie('jwt', refreshToken, {httpOnly: true,  maxAge: 24 * 60 * 60 * 1000 })
        return res.status(200).json({accessToken})
    } else {
        return res.status(401).json({message: 'Password Mismatch'})
   
    }
     
}

module.exports = handleLogin