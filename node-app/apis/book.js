const mongoose = require('mongoose')
const Schema = mongoose.Schema


const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})
const Book = mongoose.model('Book', bookSchema)

function getBooks(){
    return new Promise((resolve, reject) => {
        resolve(Book.find({}))
    })
}
function getBookById(id){
    return new Promise((resolve, reject) => {
        resolve(Book.findById(id))
    })
}
function getBookBySearchValue(name){
    return new Promise((resolve, reject) => {
        resolve()
    })
}
function getBooksByAuthorId(authorId) {
    return new Promise((resolve, reject) => {
        resolve(Book.find({authorId}))
    })
}
function createBook({name, genre, authorId}) {
    return new Promise((resolve, reject) => {
        try{
            let book = new Book({
                name, genre,authorId
            })
            resolve(book.save())
        }catch(err){
            console.log('create auther err')
        }
    })
}


module.exports = {
    getBooks,
    getBookById,
    getBookBySearchValue,
    getBooksByAuthorId,
    createBook
}