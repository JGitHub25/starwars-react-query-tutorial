import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Planet } from "./Planet";

const fetchPlanets = async (param) => {
  const { data } = await axios.get(
    `http://swapi.dev/api/planets/?page=${param}`
  );
  return data;
};

export const Planets = () => {
  const [page, setPage] = useState(1);

  const { data, isError, error, isLoading, isSuccess } = useQuery(
    ["planets", page],
    () => fetchPlanets(page)
  );

  return (
    <div>
      <h2>Planets</h2>
      {isLoading && <span>Loading...</span>}
      {isError && <span>Error: {error.message}</span>}
      {isSuccess && (
        <div className="btn-container">
          <button onClick={() => setPage(1)}>1</button>
          <button onClick={() => setPage(2)}>2</button>
          <button onClick={() => setPage(3)}>3</button>
        </div>
      )}
      {isSuccess &&
        data.results.map((planet, index) => {
          return <Planet {...planet} key={`${planet.name}${index}`} />;
        })}
    </div>
  );
};
