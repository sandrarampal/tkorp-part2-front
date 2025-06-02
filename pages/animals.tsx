import { useQuery } from "@apollo/client";
import ListCard from "components/ui/ListCard";
import Link from "next/link";
import Loader from "components/ui/Loader";
import Pagination from "../src/components/shared/Pagination";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GET_ANIMALS } from "../src/api/animalQueries";
import styles from "../src/styles/pages/listPage.module.css";

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
  }, [router.query.page, router.query.limit]);

  const { loading, error, data } = useQuery<{ animals: PaginatedAnimals }>(
    GET_ANIMALS,
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

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(totalCount / itemsPerPage)) {
      return;
    }
    setCurrentPage(newPage);
    router.push({
      pathname: "/animals",
      query: { page: newPage, limit: itemsPerPage },
    });
  };

  return (
    <div className={`container ${styles.listPage}`}>
      <h2>Our cute friends</h2>
      <Pagination
        totalCount={totalCount}
        loading={loading}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
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
    </div>
  );
}
