import { gql, useQuery } from "@apollo/client";
import ListResult from "components/ui/ListResult";
import Link from "next/link";

const getAnimals = gql`
  query getAnimals {
    animals {
      id
      name
      species
    }
  }
`;

interface Animal {
  id: number;
  name: string;
  dateOfBirth: Date;
  species: string;
  breed: string;
  weight: number;
}

export default function Animals() {
  const { loading, error, data } = useQuery<{ animals: Animal[] }>(getAnimals);

  if (loading) return <p>Chargement des animaux...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  return (
    <div>
      <p>Animals list</p>
      <div style={{ listStyle: "none", padding: 0 }}>
        {data?.animals.map((animal) => (
          <Link href={`/animals/${animal.id}`} passHref>
            <ListResult
              key={animal.id}
              name={animal.name}
              species={animal.species}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
