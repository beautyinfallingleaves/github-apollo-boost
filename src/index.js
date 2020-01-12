import 'dotenv/config'
import 'cross-fetch/polyfill';
import ApolloClient from 'apollo-boost';
import {
  GET_REPOSITORIES_OF_ORGANIZATION,
} from './script';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
      }
    })
  }
});

client
  .query({
    query: GET_REPOSITORIES_OF_ORGANIZATION,
    variables: {
      organization: 'the-road-to-learn-react',
      endCursor: undefined
    }
  })

  .then(queryResult => {
    const {pageInfo, edges} = queryResult.data.organization.repositories
    const {endCursor, hasNextPage} = pageInfo
    console.log('~~~ FIRST PAGE ~~~')
    console.log('Edges:', edges.length)
    console.log('End cursor:', endCursor)
    console.log('Has Next Page:', hasNextPage)
    return pageInfo
  })

  .then(({endCursor, hasNextPage}) => {
    if(!hasNextPage) throw Error('no next page!')

    return client.query({
      query: GET_REPOSITORIES_OF_ORGANIZATION,
      variables: {
        organization: 'the-road-to-learn-react',
        endCursor
      }
    })
  })

  .then(queryResult => {
    const {pageInfo, edges} = queryResult.data.organization.repositories
    const {endCursor, hasNextPage} = pageInfo
    console.log('~~~ SECOND PAGE ~~~')
    console.log('Edges:', edges.length)
    console.log('End cursor:', endCursor)
    console.log('Has Next Page:', hasNextPage)
    return pageInfo
  })

  .catch(console.log)
