import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Loader from "components/ui/Loader";
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

  //Attendre que le routeur soit prêt à afficher les résultats.
  const isReady = router.isReady;

  const personId = parseInt(id as string, 10);
  const { loading, error, data } = useQuery(GET_PERSON_BY_ID, {
    variables: { id: personId },
    skip: !isReady || !id || isNaN(personId),
  });

  if (loading) return <Loader />;
  if (error) return <p>Erreur : {error.message}</p>;

  if (!isReady) {
    return <p>Loading Owners...</p>;
  }

  const person = data.person;

  return (
    <div className={`container ${styles.indCard}`}>
      <h2>Owner Infos</h2>
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
