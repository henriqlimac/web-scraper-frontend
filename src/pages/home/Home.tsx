import { useEffect, useState } from "react";
import axios from "axios";
import { Shared } from "../../models/sharedModel";
import Card from "../../components/card/Card";
import AddInput from "../../components/add-input/AddInput";

const Home = () => {
  const [sharedData, setSharedData] = useState([]);

  async function fetchShared() {
    try {
      const response = await axios.get("http://localhost:5050/shared/all");

      setSharedData(response.data);
    } catch (error) {
      console.error("Axios 'GET' Failed: " + error);
    }
  }

  useEffect(() => {
    fetchShared();
  }, []);

  return (
    <>
      <header className="w-full p-3 flex items-center justify-between">
        <span>ws.do</span>
        <AddInput onSuccess={fetchShared} />
        <span className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm py-2 px-3 rounded-lg cursor-pointer">
          Websites
        </span>
      </header>
      <ul className="p-3 w-full grid items-center justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sharedData.map((shared: Shared) => (
          <Card
            key={shared.id}
            id={shared.id}
            image={shared.image}
            name={shared.name}
            price={shared.price}
            scrapedAt={shared.scrapedAt}
            rating={shared.rating}
          />
        ))}
      </ul>
    </>
  );
};

export default Home;
