import { useState } from "react";
import { deletePost, fetchPosts, updatePost } from "../API/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

const FetchRQ = () => {
  const queryClient = useQueryClient();
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
    // refetchInterval: 1000, // 1 seconds
    // refetchIntervalInBackground: true, // fetching the data even swicthing the tabs
    placeholderData: keepPreviousData, // keep previous data in place before fetching the next data from the server and updating the previous data with the new data from the server.
  });

  //! mutation function to delete the post
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: (_, id) => {
      // queryClient.setQueryData is used to update the cached data for a specific query. In this case, it's the query with the key ["post", pageNumber], which likely represents the list of posts on the current page.
      queryClient.setQueryData<Post[]>(["posts", pageNumber], (curElem) => {
        return curElem?.filter((post) => post.id !== id);
      });
    },
  });

  //! mutation function to update the post
  const updateMutation = useMutation({
    mutationFn: (id: number) => updatePost(id),
    onSuccess: (apiData, postId) => {
      console.log(apiData, postId);

      queryClient.setQueryData<Post[]>(["posts", pageNumber], (postsData) => {
        return postsData?.map((curPost) => {
          return curPost.id === postId
            ? { ...curPost, title: apiData.data.title }
            : curPost;
        });
      });
    },
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
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
              <button onClick={() => updateMutation.mutate(id)}>Update</button>
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
