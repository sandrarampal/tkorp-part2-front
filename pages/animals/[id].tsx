import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import getClient from "lib/apollo-client";
import { useRouter } from "next/router";

const getAnimalById = gql`
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

interface Person {
  id: number;
  firstName: string;
  lastName: string;
}

interface Animal {
  id: number;
  name: string;
  dateOfBirth: Date;
  species: string;
  breed: string;
  weight: number;
  persons: Person;
}

export default function AnimalDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const animalId = parseInt(id as string, 10);
  const { loading, error, data } = useQuery(getAnimalById, {
    variables: { id: animalId },
    skip: !id || isNaN(animalId),
  });

  return (
    <div>
      <h2>Animal Infos</h2>
      <div>
        <h3>{data.animal.name}</h3>
      </div>
    </div>
  );
}
