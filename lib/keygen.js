
const { generateKeyPair } = require('crypto')
const fs = require('fs');

if (process.argv[2] == 'generate-key') {
  generateKeyPair('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'top secret'
    }
  }, (err, publicKey, privateKey) => {
    if (err) {
      console.error(err);
      return;
    }
  
    fs.writeFileSync(process.cwd() + '\\key\\private.pem', privateKey);
    fs.writeFileSync(process.cwd() + '\\key\\public.pem', publicKey)
  });
}
