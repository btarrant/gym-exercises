export const fetchData = async (url, options, retries = 3, delay = 1000) => {
  try {
    const res = await fetch(url, options);

    if (res.status === 429) {
      // Rate limit exceeded, retry after a delay
      console.log("Rate limit exceeded. Retrying after delay...");
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (retries > 0) {
        // Retry with exponential backoff
        const nextDelay = delay * 2;
        return await fetchData(url, options, retries - 1, nextDelay);
      } else {
        throw new Error("Max retries exceeded");
      }
    } else if (!res.ok) {
      // Handle other HTTP errors
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const exerciseOptions = {
  method: "GET",
  parameters: {
    limit: "10", // Limiting to 10 requests
  },
  headers: {
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const youtubeOptions = {
  method: "GET",
  parameters: {
    limit: "10", // Limiting to 10 requests
  },
  headers: {
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    "X-RapidAPI-Key": "f0021db587msh781fb1cbef39856p11c183jsn45521d5d1c85",
  },
};
