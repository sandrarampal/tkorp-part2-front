import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import ListCard from "components/ui/ListCard";
import Loader from "components/shared/Loader";
import Pagination from "../src/components/shared/Pagination";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const getPersons = gql`
  query getPersons($offset: Int, $limit: Int) {
    persons(offset: $offset, limit: $limit) {
      items {
        id
        firstName
        lastName
        email
        phoneNumber
      }
      totalCount
      offset
      limit
    }
  }
`;

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface PaginatedPersons {
  items: Person[];
  totalCount: number;
  offset: number;
  limit: number;
}

export default function Owners() {
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

  const { loading, error, data } = useQuery<{ persons: PaginatedPersons }>(
    getPersons,
    {
      variables: {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      },
    }
  );

  if (loading) return <Loader />;
  if (error) return <p>Erreur : {error.message}</p>;

  const totalCount = data?.persons.totalCount || 0;

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(totalCount / itemsPerPage)) {
      return;
    }
    setCurrentPage(newPage);
    router.push({
      pathname: "/owners",
      query: { page: newPage, limit: itemsPerPage },
    });
  };

  return (
    <div className="container">
      <h2>Owners list</h2>
      <Pagination
        totalCount={totalCount}
        currentPath="/owners"
        loading={loading}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      {data?.persons.items.map((person) => (
        <div key={person.id}>
          <Link href={`/owners/${person.id}`} passHref>
            <ListCard
              key={person.id}
              name={`${person.firstName} ${person.lastName}`}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
