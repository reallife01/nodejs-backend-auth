const userDB = {
    users: require('../models/users.json'),
    setUser: function (data) {
        this.users = data;
    }
}

const path = require('path')
const fsPromises = require('fs/promises')
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd) 
        return res.status(400).json({message: "username and password requires"})

        const duplicate = userDB.users.find(person  => person.username == user);
        if(duplicate) return res.status(409).json({message: `username ${user}  exist`}) // conflict
        try {
            const hashpwd = await bcrypt.hash(pwd, 10)
            const newUser = {
                "username" : user,
                "roles":{"User" : 2001},
                 password: hashpwd,

                }
           userDB.setUser([...userDB.users, newUser])
          fsPromises.writeFile(path.join(__dirname, '..',  'models', 'users.json'), JSON.stringify(userDB.users))

           console.log(newUser);
           res.status(201).json({message : `User ${newUser.username} has registered successfully`})
        } catch (err) {
            res.status(500).json({message: err.message})
        }
        
    
        
}
module.exports = handleNewUser;