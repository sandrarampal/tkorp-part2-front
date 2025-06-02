import { gql } from "@apollo/client";

export const GET_PERSON_BY_ID = gql`
  query getPersonById($id: Int!) {
    person(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      animals {
        id
        name
        species
      }
    }
  }
`;

export const GET_PERSONS = gql`
  query getPersons($offset: Int, $limit: Int) {
    persons(offset: $offset, limit: $limit) {
      items {
        id
        firstName
        lastName
        email
        phoneNumber
      }
      totalCount
      offset
      limit
    }
  }
`; 