const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

async function enviarImagemParaFirebaseStorage(
  nomeArquivo,
  buffer,
  diretorioNoStorage,
  contentType
) {
  try {
    const file = bucket.file(`${diretorioNoStorage}/${nomeArquivo}`);
    await file.save(buffer, {
      metadata: { contentType },
    });
    console.log("Imagem enviada com sucesso para o Firebase Storage.");
    return true;
  } catch (error) {
    console.error("Erro ao enviar a imagem para o Firebase Storage:", error);
    return false;
  }
}

module.exports = {
  enviarImagemParaFirebaseStorage,
};
