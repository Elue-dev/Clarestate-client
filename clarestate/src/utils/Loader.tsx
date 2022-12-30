import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

export default function Loader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className="loader">
      {loading && (
        <MoonLoader color={"rgb(18, 140, 200)"} loading={loading} size={50} />
      )}
    </div>
  );
}
