const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose')
const schema = require('./schema/schema');

const app = express();

mongoose.connect('mongodb://elonwu:wy7553868@ds051625.mlab.com:51625/gql-elon')
mongoose.connection.once('open', () => {
    console.log('database connected')
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true  // 测试工具
}))

app.listen(4000, () => {
    console.log('server on 4000')
})