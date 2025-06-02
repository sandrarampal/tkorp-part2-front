import { gql } from "@apollo/client";

export const GET_ANIMAL_BY_ID = gql`
  query getAnimalById($id: Int!) {
    animal(id: $id) {
      id
      name
      species
      dateOfBirth
      breed
      weight
      persons {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_ANIMALS = gql`
  query getAnimals($offset: Int, $limit: Int) {
    animals(offset: $offset, limit: $limit) {
      items {
        id
        name
        species
      }
      totalCount
      offset
      limit
    }
  }
`; 