const mongoose = require('mongoose');

const File = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    }, 
    {
      timestamps: true,
      toObject: {virtuals: true},
      toJSON: {virtuals: true}
    }
);

//campo virtual = campo que nao existe na tabela, mas existe no backend
File.virtual('url').get(function(){
  return `http://localhost:333/files/${encodeURIComponent(this.path)}`
})

module.exports = mongoose.model('File', File);