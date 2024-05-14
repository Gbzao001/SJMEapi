const admin = require("firebase-admin");

// Inicialização do Firebase
const serviceAccount = require("../keys/sjme-422615-a3d71a860b5c.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sjme-422615-default-rtdb.firebaseio.com/', // Troque para o URL correto do Realtime Database
});

// Exporta o módulo admin para uso em outros arquivos
module.exports = admin;
