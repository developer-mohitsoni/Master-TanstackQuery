import { useEffect, useState } from "react";
import { fetchPosts } from "../API/api";

interface Post {
  id: number;
  title: string;
  body: string;
}

const FetchOld = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPostsData = async () => {
    try {
      const res = await fetchPosts();

      console.log(res);

      setPosts(res);
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

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

export default FetchOld;
