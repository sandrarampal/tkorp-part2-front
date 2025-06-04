import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Loader from "components/ui/Loader";
import ErrorDisplay from "components/ui/ErrorDisplay";
import { GET_PERSON_BY_ID } from "../../src/api/ownerQueries";

import styles from "../../src/styles/pages/individualPage.module.css";

interface Animal {
  id: number;
  name: string;
  species: string;
}

export default function OwnerDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  //Attendre que le routeur soit prêt à afficher les résultats, en cas d'actualisation de la page.
  const isReady = router.isReady;

  const personId = parseInt(id as string, 10);
  const { loading, error, data, refetch } = useQuery(GET_PERSON_BY_ID, {
    variables: { id: personId },
    skip: !isReady || !id || isNaN(personId),
  });

  //Si le chargement est en cours, afficher un loader.
  if (loading) return <Loader />;
  if (error) return <ErrorDisplay message={error.message} onRetry={() => refetch()} />;

  //Attendre que le routeur soit prêt à afficher les résultats.
  //Si le routeur n'est pas prêt, afficher un loader.
  if (!isReady) {
    return <Loader />;
  }

  const person = data.person;

  return (
    <div className={`container ${styles.indCard}`}>
      <div className={styles.infos}>
        <h3>
          {person.firstName} {person.lastName}
        </h3>
        <p>Email: {person.email}</p>
        <p>Phone Number: {person.phoneNumber}</p>
        <p>Animals</p>
        <div className={styles.animalOwned}>
          {person.animals.length === 0 ? (
            <p>No animal for this owner</p>
          ) : (
            person.animals.map((animal: Animal) => (
              <Link
                href={`/animals/${animal.id}`}
                style={{ textDecoration: "none" }}
                key={animal.id}
              >
                <button>
                  <span>{animal.name}</span>
                  <span className={styles.species}>({animal.species})</span>
                </button>
              </Link>
            ))
          )}
        </div>
      </div>
      <button onClick={() => router.back()}>Back</button>
    </div>
  );
}
