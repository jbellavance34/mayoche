/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChoice = /* GraphQL */ `
  query GetChoice($id: ID!) {
    getChoice(id: $id) {
      id
      name
      animal
      description
      createdAt
      updatedAt
    }
  }
`;
export const listChoices = /* GraphQL */ `
  query ListChoices(
    $filter: ModelChoiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        animal
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const votesByDate = /* GraphQL */ `
  query votesByDate (
    $filter: ModelChoiceFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: sortDirection
  ){
    votesByDate(sortDirection: $sortDirection, type: "vote") {
      items {
        id
        name
        animal
        description
        createdAt
        updatedAt
      }
    }
  }
`;
