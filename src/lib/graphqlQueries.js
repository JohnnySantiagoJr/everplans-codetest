import { gql } from "graphql-request";

export const getFeedQuery = gql`
  query {
    feed {
      id
      url 
      description
      votes
      createdAt
      postedBy {
        name
      }
    }
  }
`

export const logInMutation = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        links {
          url
          description
        }
      }
    }
  }
`

export const postMutation = gql`
  mutation post($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
    }
  }
`

export const signUpMutation = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

export const upVoteMutation = gql`
  mutation upVote($id: ID!) {
    upvote(id: $id) {
      id
      votes
    }
  }
`