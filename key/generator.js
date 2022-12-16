const crypto = require('crypto');
const fs = require('fs');

function generator() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', { 
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  const keyDir = process.cwd() + '/key';
  fs.writeFileSync(`${keyDir}/private.pem`, privateKey);
  fs.writeFileSync(`${keyDir}/publicKey.pem`, publicKey);
}

generator();

