import { gql, useQuery } from "@apollo/client";
import ListCard from "components/ui/ListCard";
import Link from "next/link";
import Loader from "components/shared/Loader";

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

  if (loading) return <Loader />;
  if (error) return <p>Erreur : {error.message}</p>;
  return (
    <div className="container">
      <h2>Animals list</h2>
      <div style={{ listStyle: "none", padding: 0 }}>
        {data?.animals.map((animal) => (
          <div key={animal.id}>
            <Link
              href={`/animals/${animal.id}`}
              passHref
              style={{ textDecoration: "none" }}
            >
              <ListCard
                key={animal.id}
                name={animal.name}
                species={animal.species}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
