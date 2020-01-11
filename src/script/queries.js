import {gql} from 'apollo-boost'

export const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query FetchOrgRepos($organization: String!) {
    organization(login: $organization) {
      name
      url
      repositories(first: 5, orderBy: {field: STARGAZERS, direction: DESC}) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }

  fragment repository on Repository {
    name
    url
  }
`
