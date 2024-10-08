import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories (orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
     edges {
      node {
        id
        description
        fullName
        forksCount
        language
        ownerAvatarUrl
        ratingAverage
        reviewCount
        stargazersCount
      }
    }
  }
}
`;

export const ME = gql`
query getCurrentUser($includeReviews: Boolean = false){
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          repository {
            fullName
            url
          }
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}

`;

export const GET_REPOSITORY = gql`
query Repository($id: ID!) {
  repository(id: $id) {
    description
    fullName
    forksCount
    language
    id
    stargazersCount
    ownerAvatarUrl
    reviewCount
    ratingAverage
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;

export const GET_REVIEWS = gql`
query Review($id: ID!) {
  repository(id: $id) {
    id
    fullName
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}`;

// other queries...