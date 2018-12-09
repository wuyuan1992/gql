const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: String,
    age: Number
})

const Author = mongoose.model('Author', authorSchema)

function getAuthorById(id){
    return new Promise((resolve, reject) => {
        resolve(Author.findById(id))
    })
}
function getAuthors(){
    return new Promise((resolve, reject) => {
        resolve(Author.find({}))
    })
}
function createAuthor({name, age}) {
    return new Promise(async (resolve, reject) => {
        try{
            let author = new Author({
                name, age
            })
            resolve(author.save())
        }catch(err){
            console.log('create author err')
        }
    })
}

module.exports = {
    getAuthorById,
    getAuthors,
    createAuthor
}