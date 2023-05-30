const userDB = {
    users: require('../models/users.json'),
    setUser: function (data) {
        this.users = data;
    }
}

const fsPromise = require('fs/promises') 
const path = require('path')


const handleLogoutToken = async (req, res) => {


    // On client side, also delete the accessToken/ if u are a front end dev u need dis

    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)
     const refreshToken = cookies.jwt


    const foundUser = userDB.users.find((person) => person.refreshToken === refreshToken);


    if(!foundUser) {
        res.clearCookie("jwt", {httpOnly: true})
        return res.sendStatus(403)
    }
    const otherUser = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    const currentUser = {...foundUser, refreshToken: ""}
    userDB.setUser([...otherUser, currentUser]);
    await fsPromise.writeFile(
        path.join(__dirname, '..', 'models', 'users.json'),
        JSON.stringify('userDB.users')
    )
        // to delete cookie
        res.clearCookie('jwt', {httpOnly : true});
        res.sendStatus(201)
}

module.exports = handleLogoutToken