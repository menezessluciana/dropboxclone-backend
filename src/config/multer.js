const multer = require('multer');
const path = require('path');
const crypto = require('crypto')

//crypto = cria hashs unicos.
//path é um modulo do node, padroniza os caminhos
//storage = armazenamento dos arquivos. Diskstorage = Gravar no arquivo local.

//dest = destino
module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmps'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmps'))
        },
        filename: (req, file, cb)=> {
            crypto.randomBytes(16,(err, hash) => {
                if(err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key)
            })
        }
    })
}