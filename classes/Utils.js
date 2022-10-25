const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');


function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}


function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}



function issueJWT(user) {
  const _id = user.username;
  const expiresIn = '1d';

 
  const payload = {
    sub: _id,
    iat: Date.now()
  };
  // const signedToken = jsonwebtoken.sign(payload, process.env.PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET_KEY);
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;

