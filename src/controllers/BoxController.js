const Box = require('../models/Box');

class BoxController {
    //middlare
   async store(req,res) {

    const box = await Box.create({ title: req.body.title })

        return res.json(box);
    }

    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            //createdAt: 1 = Ordena de forma crescente
            options: { sort: {createdAt: 1}}
        })

        return res.json(box);
    }


}

//new para retornar a instancia de BoxController para acessar seus metodos
module.exports = new BoxController()