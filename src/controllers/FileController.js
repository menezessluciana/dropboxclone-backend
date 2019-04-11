const File = require('../models/File');
const Box = require('../models/Box');


class FileController {
    //middlare
   async store(req,res) {
       const box  = await Box.findById(req.params.id)

       //criar um arquivo
       const file = await File.create({
           title: req.file.originalname,
           path: req.file.key
       })

     box.files.push(file);

     await box.save();

     //avisa os usuarios do box que um arquivo novo foi adicionado
     req.io.socket.in(box._id).emit("file", file);

     return res.json(file);
    }

    
}

//new para retornar a instancia de BoxController para acessar seus metodos
module.exports = new FileController()