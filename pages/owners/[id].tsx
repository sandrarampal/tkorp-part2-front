import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const getPersonById = gql`
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

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  animals: Animal;
}

interface Animal {
  id: number;
  name: string;
  species: string;
}

export default function OwnerDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  //Attendre que le routeur soit prêt à afficher les résultats.
  const isReady = router.isReady;

  const personId = parseInt(id as string, 10);
  const { loading, error, data } = useQuery(getPersonById, {
    variables: { id: personId },
    skip: !isReady || !id || isNaN(personId),
  });

  if (loading) return <p>Loading Owners...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  if (!isReady) {
    return <p>Loading Owners...</p>;
  }

  const person = data.person;

  return (
    <div>
      <h2>Owner Infos</h2>
      <div>
        <h3>
          {person.firstName} {person.lastName}
        </h3>
        <p>Email: {person.email}</p>
        <p>Phone Number: {person.phoneNumber}</p>
        <p>Animals</p>
        {person.animals.map((animal: Animal) => (
          <div>
            <h3>{animal.name}</h3>
            <p>{animal.species}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
