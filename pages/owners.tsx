import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import ListCard from "components/ui/ListCard";
import Loader from "components/shared/Loader";

const getPersons = gql`
  query getPersons {
    persons {
      id
      firstName
      lastName
      email
      phoneNumber
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

export default function Owners() {
  const { loading, error, data } = useQuery<{ persons: Person[] }>(getPersons);

  if (loading) return <Loader />;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="container">
      <h2>Owners list</h2>
      {data?.persons.map((person) => (
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
