import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Shared } from "../../models/sharedModel";

import {
  isNumericRating,
  parseNumericRating,
  renderStars,
  getRatingColor,
} from "../../utils/ratingUtils";

const Shareable = () => {
  const [sharedData, setSharedData] = useState<Shared | undefined>();

  const { id } = useParams();
  const sharedId: string | undefined = id;

  useEffect(() => {
    async function getSharedById() {
      try {
        const response = await axios.get<Shared>(
          `http://localhost:5050/shared/${sharedId}`
        );

        setSharedData(response.data);
      } catch (error) {
        console.error("Axios failed 'GET' method: " + error);
      }
    }

    getSharedById();
  }, [sharedId]);

  function formatDate(isoString: string | undefined) {
    const date = new Date(isoString || "");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  return (
    <>
      <header className="fixed w-full p-3 flex items-center justify-between">
        <span>ws.do</span>
      </header>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-[1280px] p-2 mx-auto flex gap-10">
          <div className="w-full bg-zinc-900 rounded-lg h-[540px] max-h-[540px] flex items-center justify-center">
            <img
              src={sharedData?.image}
              className="max-h-[540px] w-full object-cover rounded-lg"
            />
          </div>
          <div className="w-full flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <span className="text-sm dark:text-zinc-400">PRODUCT</span>
                <h1 className="text-3xl font-semibold">{sharedData?.name}</h1>
              </div>

              <div className="flex flex-col">
                <span className="text-sm dark:text-zinc-400">RATING</span>
                {sharedData?.rating ? (
                  isNumericRating(sharedData.rating) ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-zinc-600 dark:text-zinc-300">
                        {parseNumericRating(sharedData.rating).toFixed(1)}
                      </span>
                      {renderStars(parseNumericRating(sharedData.rating))}
                    </div>
                  ) : (
                    <span
                      className={`text-sm ${getRatingColor(sharedData.rating)}`}
                    >
                      {sharedData.rating}
                    </span>
                  )
                ) : (
                  <span className="text-sm text-zinc-500">No rating</span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col items-end gap-4">
              <div className="w-full flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-sm dark:text-zinc-400">PRICE</span>
                  <p className="truncate font-semibold text-4xl">
                    {sharedData?.price}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm dark:text-zinc-400">SCRAPED AT</span>
                  <p className="truncate font-semibold">
                    {formatDate(sharedData?.scrapedAt)}
                  </p>
                </div>
              </div>
              <button className="w-full">
                <a
                  className="w-full p-3 flex items-center justify-center border-1 rounded-full dark:bg-zinc-100 dark:text-zinc-950 font-semibold text-sm"
                  href={sharedData?.url}
                >
                  Go to the URL
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shareable;
