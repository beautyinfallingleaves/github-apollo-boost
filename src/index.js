import 'dotenv/config'
import 'cross-fetch/polyfill'
import ApolloClient from 'apollo-boost'
import {
  GET_ORGANIZATION,
} from './script'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
      }
    })
  }
})

client
  .query({
    query: GET_ORGANIZATION,
  })
  .then(console.log)
