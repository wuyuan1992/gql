const graphql = require('graphql');
// const {bookQuery, bookMutation} = require('../models/book');
const {authorQuery, authorMutation} = require('../models/author');


const BookModel = require('../models/book');

const { GraphQLSchema, GraphQLObjectType } = graphql;
const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...BookModel.bookQuery,
        ...authorQuery
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...BookModel.bookMutation,
        ...authorMutation
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})