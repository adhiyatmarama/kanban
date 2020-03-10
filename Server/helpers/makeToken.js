const jwt = require('jsonwebtoken')

function makeToken(user){
    let token = jwt.sign({ id: user.id, name:user.email, email: user.email}, process.env.JWT_SECRET);
    return token
}

module.exports = makeToken