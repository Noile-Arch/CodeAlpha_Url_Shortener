import { useState } from "react";
import axios from "axios";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/shorten", {
        originalUrl,
      });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error("Error shortening the URL:", error);
    }
  };

  return (
    <div className="w-full text-white h-screen relative flex justify-center items-center">
      <img src="/hero.jpg" alt="hero" className="w-full h-[100%] object-cover " />
      <div className="w-full absolute h-full flex flex-col gap-10 justify-center items-center backdrop-blur-xl">
        <h1 className="text-[#00ffdd] font-bold text-6xl">URL Shortener</h1>
        <h2 className="text-[#00ffdd] font-bold text-4xl text-center w-[80%] ">Paste your untidy link to shorten it</h2>
        <p className="text-[#d6d6d6] w-[60%] md:w-[60%] text-xl md:text-3xl text-center">free toool to shorten URL or reduce a link. Use our URL shortener to create a shortened & neat link making it easy to remember</p>
        <form onSubmit={handleSubmit} className="bg-white border-2 border-[#000000] w-[60%] md:w-[60%] lg:w-[50%] h-[50px] flex justify-center items-center rounded-md">
          <input
            type="url"
            placeholder="Enter the URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="w-[70%] text-black md:w-[70%] lg:w-[80%] px-4 h-full outline-none bg-transparent"
          />
          <button type="submit" className="bg-[#4e4081] text-white font-semibold rounded-r-[4px] h-[100%] w-[30%] md:w-[30%]">Shorten</button>
        </form>
        {shortUrl && (
          <p>
            Shortened URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
