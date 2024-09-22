import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials)  {
      accessToken
    }
  }
`
//review will give repositoryid and take review object as input
export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) { 
    createReview(review: $review) {
      repositoryId
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($user: CreateUserInput!){
    createUser(user: $user) {
      username
      id
    }
  }
`