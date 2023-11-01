import { useQuery } from "@tanstack/react-query";

import "./App.css";

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
      </div>
    </>
  );
}

export default App;
