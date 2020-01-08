import {gql} from 'apollo-boost'

export const GET_ORGANIZATION = gql`{
  organization(login: "the-road-to-learn-react") {
    name
    url
  }
}`
