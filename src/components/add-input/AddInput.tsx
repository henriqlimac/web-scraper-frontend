import { useState } from "react";
import axios from "axios";

interface AddInputProps {
  onSuccess: () => void;
}

const AddInput = ({ onSuccess }: AddInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function getShared(url: string) {
    try {
      setIsLoading(true);

      await axios.get(
        `http://localhost:5050/share?url=${encodeURIComponent(url)}`
      );

      setInputValue("");
      onSuccess();
    } catch (error) {
      console.error("Axios 'GET' Failed: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = () => {
    if (!inputValue) return;
    getShared(inputValue);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <div className="w-full flex items-center justify-center gap-2">
        <input
          className="w-full max-w-[700px] py-2 px-3 text-sm dark:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg focus:outline-0"
          name="addInput"
          id="addInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
          placeholder="Write down your shop item URL"
        />
        <button
          className="cursor-pointer transition active:scale-95 text-sm bg-blue-500 text-white py-2 px-4 border border-blue-500 rounded-lg"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <span className="text-xs">{isLoading ? "Wait a bit, it can take a while..." : ""}</span>
    </div>
  );
};

export default AddInput;
