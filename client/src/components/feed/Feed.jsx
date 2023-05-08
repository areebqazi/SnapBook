import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  // console.log("username = ",username);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import Share from "../share/Share";
// import "./feed.css";
// import axios from "axios";
// import Post from "../../components/post/Post"

// export default function Feed({username}) {
//   const [posts, setPosts] = useState([]);
 
//   useEffect(() => {
//     const fetchPosts = async () => {
//       const res = username 
//       ? await axios.get("/posts/profile/644a331c8b8be2624c7d8c62")
//       : await axios.get("/posts/timeline/644a331c8b8be2624c7d8c62")

//       setPosts(res.data);
//     };
//     fetchPosts();
//   }, []);

//   return (
//     <div className="feed">
//       <div className="feedWrapper">
//         <Share />
//         {posts.map((p) => (
//           <Post key={ p._id} post={p}/>
//           ))}
//       </div>
//     </div>
//   );
// }
