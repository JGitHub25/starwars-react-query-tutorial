import { useQuery } from "react-query";
import { Person } from "./Person";

const fetchPeople = async () => {
  const res = await fetch("http://swapi.dev/api/people/");
  return res.json();
};

export const People = () => {
  const { data, isError, error, isLoading, isSuccess } = useQuery(
    "people",
    fetchPeople
  );

  return (
    <div>
      <h2>People</h2>
      {isLoading && <span>Loading...</span>}
      {isError && <span>Error: {error.message}</span>}
      {isSuccess &&
        data.results.map((person, index) => {
          return <Person {...person} key={`${person.name}${index}`} />;
        })}
    </div>
  );
};
