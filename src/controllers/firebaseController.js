const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
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

async function listarImagensDaPastaEmpresa() {
  try {
    const [files] = await bucket.getFiles({ prefix: 'empresa/' });

    const tempDir = path.join(__dirname, '../temp');
    const empresaDir = path.join(tempDir, 'empresa');

    if (fs.existsSync(tempDir)) {
      fs.rmdirSync(tempDir, { recursive: true });
    }
    fs.mkdirSync(empresaDir, { recursive: true });

    for (const file of files) {
      if (file.name === 'empresa/') {
        continue;
      }

      const [url] = await file.getSignedUrl({ action: 'read', expires: '03-01-2500' });
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const filePath = path.join(empresaDir, path.basename(file.name));
      fs.writeFileSync(filePath, response.data);
    }

    console.log("Imagens baixadas e salvas em temp/empresa.");
    return true;
  } catch (error) {
    console.error("Erro ao listar e salvar imagens da pasta empresa:", error);
    return false;
  }
}
function obterCaminhoImagem(caminhoImagem) {
  const dirPath = path.join(__dirname, '../temp', caminhoImagem);
  if (fs.existsSync(dirPath)) {
    return dirPath;
  } else {
    return null;
  }
}

module.exports = {
  enviarImagemParaFirebaseStorage,
  listarImagensDaPastaEmpresa,
  obterCaminhoImagem
};
