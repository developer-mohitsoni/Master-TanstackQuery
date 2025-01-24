import { useState } from "react";
import { fetchPosts } from "../API/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const {
    data: posts,
    isPending,
    isError,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts", pageNumber], // useState alternative working
    queryFn: () => fetchPosts(pageNumber), // useEffect alternative working
    // gcTime: 1000, // 10 seconds
    // staleTime: 1000 * 60 * 60, // 1sec * 60  => 1 minute * 60 => 1hr in milliseconds
    // refetchIntervalInBackground: true,
    refetchInterval: 1000, // 1 seconds
    refetchIntervalInBackground: true, // fetching the data even swicthing the tabs
    placeholderData: keepPreviousData, // keep previous data in place before fetching the next data from the server and updating the previous data with the new data from the server.
  });

  // Conditional rendering based on loading, error, and posts data
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul className="section-accordion">
        {posts?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className="pagination-section container">
        <button
          disabled={pageNumber === 0 ? true : false}
          onClick={() => setPageNumber((prev) => prev - 3)}
        >
          Prev
        </button>
        <p>{pageNumber / 3 + 1}</p>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  );
};

export default FetchRQ;
