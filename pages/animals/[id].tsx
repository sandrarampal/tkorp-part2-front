import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Loader from "components/ui/Loader";
import { GET_ANIMAL_BY_ID } from "../../src/api/animalQueries";
import styles from "../../src/styles/pages/individualPage.module.css";

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

  //Attendre que le routeur soit prêt à afficher les résultats.
  const isReady = router.isReady;

  const animalId = parseInt(id as string, 10);
  const { loading, error, data } = useQuery(GET_ANIMAL_BY_ID, {
    variables: { id: animalId },
    skip: !isReady || !id || isNaN(animalId),
  });

  if (loading) return <Loader />;
  if (error) return <p>Erreur : {error.message}</p>;

  if (!isReady) {
    return <p>Chargement des animaux...</p>;
  }

  const animal = data.animal;

  const dateOnly = animal.dateOfBirth.slice(0, 10);

  return (
    <div className={`container ${styles.indCard}`}>
      <h2>Animal Infos</h2>
      <div className={styles.infos}>
        <h3>{animal.name}</h3>
        <p>Species: {animal.species}</p>
        <p>Breed: {animal.breed}</p>
        <p>Birth Date: {dateOnly}</p>
        <p>Weight: {animal.weight} g</p>
        <div className={styles.owner}>
          <p>Owner:</p>
          <Link
            href={`/owners/${animal.persons.id}`}
            style={{ textDecoration: "none" }}
          >
            <p className={styles.ownerName}>
              {animal.persons.firstName} {animal.persons.lastName}
            </p>
          </Link>
        </div>
      </div>
      <button onClick={() => router.back()}>Back</button>
    </div>
  );
}
