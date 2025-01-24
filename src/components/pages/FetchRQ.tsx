import { fetchPosts } from "../API/api";
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
}

const FetchRQ = () => {
  const { data: posts } = useQuery<Post[]>({
    queryKey: ["posts"], // useState alternative working
    queryFn: fetchPosts, // useEffect alternative working
    refetchInterval: 10000, // 10 seconds
    gcTime: 1000, // 10 seconds
    staleTime: 1000 * 60 * 60, // 1sec * 60  => 1 minute * 60 => 1hr in milliseconds
  });

  return (
    <div>
      <ul className="section-accordion">
        {posts?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FetchRQ;
