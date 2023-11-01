import { useQuery } from "@tanstack/react-query";

import "./App.css";

function Events() {
  const { isPending, error, data } = useQuery<{ time: string }>({
    queryKey: ["events"],
    queryFn: () => fetch("/api/events").then((res) => res.json()),
  });

  return (
    <>
      <div>Whoa, cool</div>
      <div className="card">
        {isPending ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error.message}</p>
        ) : (
          <p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </p>
        )}
      </div>
    </>
  );
}

function App() {
  const { isPending, error, data } = useQuery<{ time: string }>({
    queryKey: ["time"],
    queryFn: () => fetch("/api/time").then((res) => res.json()),
  });

  return (
    <>
      <div className="card">
        {isPending ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error.message}</p>
        ) : (
          <p>{data?.time}</p>
        )}
        <Events />
      </div>
    </>
  );
}

export default App;
