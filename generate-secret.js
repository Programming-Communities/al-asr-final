// generate-secret.js
const crypto = require('crypto')

// Generate a random 32-character secret
const secret = crypto.randomBytes(32).toString('hex')
console.log('Generated NEXTAUTH_SECRET:')
console.log(secret)

// Copy this to your .env files