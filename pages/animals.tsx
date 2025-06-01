import { gql, useQuery } from "@apollo/client";
import ListCard from "components/ui/ListCard";
import Link from "next/link";
import Loader from "components/shared/Loader";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const getAnimals = gql`
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

interface Animal {
  id: number;
  name: string;
  dateOfBirth: Date;
  species: string;
  breed: string;
  weight: number;
}

interface PaginatedAnimals {
  items: Animal[];
  totalCount: number;
  offset: number;
  limit: number;
}

export default function Animals() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  useEffect(() => {
    const pageFromUrl = parseInt((router.query.page as string) || "1");
    const limitFromUrl = parseInt((router.query.limit as string) || "50");
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }
    if (limitFromUrl !== itemsPerPage) {
      setItemsPerPage(limitFromUrl);
    }
  }, [router.query.page, router.query.limit, currentPage, itemsPerPage]);

  const { loading, error, data } = useQuery<{ animals: PaginatedAnimals }>(
    getAnimals,
    {
      variables: {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      },
    }
  );

  if (loading) return <Loader />;
  if (error) return <p>Erreur : {error.message}</p>;

  const totalCount = data?.animals.totalCount || 0;

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = async (newPage: number) => {
    // Éviter de naviguer si la page est hors limites
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    setCurrentPage(newPage);
    // Mettre à jour l'URL sans recharger la page pour garder l'état dans l'URL
    router.push({
      pathname: "/animals",
      query: { page: newPage, limit: itemsPerPage },
    });
  };

  return (
    <div className="container">
      <h2>Animals list</h2>
      <div style={{ listStyle: "none", padding: 0 }}>
        {data?.animals.items.map((animal) => (
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1 || loading} // Désactiver pendant le chargement
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Précédent
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={loading} // Désactiver pendant le chargement
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              backgroundColor: currentPage === page ? "#0070f3" : "#f0f0f0",
              color: currentPage === page ? "white" : "black",
              border:
                currentPage === page ? "1px solid #0070f3" : "1px solid #ccc",
            }}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || loading} // Désactiver pendant le chargement
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Suivant
        </button>
      </div>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Page {currentPage} sur {totalPages} {loading && "(Chargement...)"}
      </p>
    </div>
  );
}
