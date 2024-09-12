import { gql } from '@apollo/client';
import { useParams } from 'react-router-native';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
     edges {
      node {
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
query {
  me {
    id
    username
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
  }
}
`;

// other queries...