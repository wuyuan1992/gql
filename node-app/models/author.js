const graphql = require('graphql');
const { getBooksByAuthorId } = require('../apis/book')
const { getAuthorById, getAuthors, createAuthor } = require('../apis/author')
const { BookType, bookQuery } = require('./book')
// graphQL 类型
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID,
    GraphQLInt
} = graphql;


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        // books: {
        //     type: new GraphQLList(BookType),
        //     async resolve(parent, args){
        //         const result = await getBooksByAuthorId(parent.id)
        //         return result
        //     }
        // }
    })
})

console.log(BookType, AuthorType, bookQuery)

module.exports = {
    AuthorType,
    // 数据查询
    authorQuery: {
        author: {
            type: AuthorType,
            args: {
                id: {
                    type:GraphQLID
                }
            },
            async resolve(parent, args){
                const result = await getAuthorById(args.id)
                return result
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            async resolve(parent, args){
                const result = await getAuthors()
                return result
            }
        }
    },
    // 数据操作
    authorMutation: {
        addAuthor: {
            type: AuthorType,
            args:{
                name: { type: GraphQLString},
                age: { type: GraphQLInt}
            },
            async resolve(parent, args){
                const result = await createAuthor(args)
                return result
            }
        }
    }
}