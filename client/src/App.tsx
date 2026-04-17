import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState<string>("Checking...");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900">Helpdesk</h1>
      <p className="mt-4 text-lg text-gray-600">
        Server status:{" "}
        <span
          className={status === "ok" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}
        >
          {status}
        </span>
      </p>
    </div>
  );
}

export default App;
