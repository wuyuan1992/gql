const graphql = require('graphql');
const { getBooks, getBookById, getBookBySearchValue, createBook } = require('../apis/book')
const { getAuthorById } = require('../apis/author')
const { AuthorType } = require('./author')
// graphQL 类型
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID,
    GraphQLInt
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            async resolve(parent, args){
                const result = await getAuthorById(parent.authorId)
                return result
            }
        }
    })
})

module.exports = {
    BookType,
    // 数据查询
    bookQuery: {
        book: {
            type: BookType,
            args: {
                id: {
                    type:GraphQLID
                },
                searchValue:{
                    type:GraphQLString
                }
            },
            async resolve(parent, {id, searchValue} ){
                let result;
                if(id){
                    result = await getBookById(id)
                }else if (searchValue){
                    result = await getBookBySearchValue(searchValue)
                }
                return result
            }
        },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args){
                const result = await getBooks()
                return result
            }
        }
    },
    // 数据操作
    bookMutation: {
        addBook: {
            type: BookType,
            args:{
                name: { type: GraphQLString},
                authorId: { type: GraphQLString},
                genre: { type: GraphQLString},
            },
            async resolve(parent, args){
                const result = await createBook(args)
                return result
            }
        }
    }
}