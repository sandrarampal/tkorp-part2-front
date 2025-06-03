import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Loader from "components/ui/Loader";
import { GET_ANIMAL_BY_ID } from "../../src/api/animalQueries";
import styles from "../../src/styles/pages/individualPage.module.css";


export default function AnimalDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  //Attendre que le routeur soit prêt à afficher les résultats, en cas d'actualisation de la page.
  const isReady = router.isReady;

  //Récupération de l'id de l'animal
  const animalId = parseInt(id as string, 10);
  const { loading, error, data } = useQuery(GET_ANIMAL_BY_ID, {
    variables: { id: animalId },
    skip: !isReady || !id || isNaN(animalId),
  });

  if (loading) return <Loader />;
  if (error) return <p>Erreur : {error.message}</p>;

  //Si le routeur n'est pas prêt, afficher un loader.
  if (!isReady) {
    return <Loader />;
  }

  const animal = data.animal;

  //Conversion de la date de naissance de l'animal en format DD/MM/YYYY
  const dateOnly = animal.dateOfBirth.slice(0, 10);

  return (
    <div className={`container ${styles.indCard}`}>
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
