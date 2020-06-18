const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
 

exports.publickey =function(){
    return key.getPublic('hex');;
   
}
exports.privatekey =function(){
    return key.getPrivate('hex');;
   
}