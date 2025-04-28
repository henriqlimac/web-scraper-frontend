import { Shared } from "../../models/sharedModel";
import { isNumericRating, parseNumericRating, renderStars, getRatingColor } from "../../utils/ratingUtils";


const Card = ({ id, image, name, price, scrapedAt, rating }: Shared) => {
  function formatDate(isoString: string) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  const numeric = isNumericRating(rating);
  const numValue = numeric ? parseNumericRating(rating!) : null;

  return (
    <li
      className="transition-all active:scale-95 h-full border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 w-full sm:max-w-[400px] lg:max-w-[400px] flex flex-col"
      key={id}
    >
      <a target="_blank" href={`http://localhost:5173/shared/${id}`} className="cursor-pointer">
        <img
          className="rounded-t-2xl bg-white dark:bg-zinc-950 w-full max-h-36 object-cover"
          src={image}
          alt={name}
        />
        <div className="p-3 flex items-start">
          <div className="w-full flex flex-col">
            <h3 className="truncate max-w-[235px] text-xl">{name}</h3>

            {numeric && numValue !== null ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-300">
                  {numValue.toFixed(1)}
                </span>
                {renderStars(numValue)}
              </div>
            ) : (
              <span className={`text-sm ${getRatingColor(rating)}`}>
                {rating ?? "No rating"}
              </span>
            )}

            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {formatDate(scrapedAt)}
            </span>
          </div>
          <div className="w-full flex flex-col items-end">
            <span className="text-xs text-zinc-600 dark:text-zinc-400">FROM</span>
            <span className="font-semibold">{price}</span>
          </div>
        </div>
      </a>
    </li>
  );
};

export default Card;
