import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import ListResult from "components/ui/ListResult";

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

  if (loading) return <p>Chargement des animaux...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <p>Owners list</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {data?.persons.map((person) => (
          <li
            key={person.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <Link href={`/owners/${person.id}`} passHref>
              <ListResult
                key={person.id}
                name={`${person.firstName} ${person.lastName}`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
