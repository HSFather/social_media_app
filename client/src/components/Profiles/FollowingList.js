import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import Avatar from "../etc/Avatar";

export default function FollowingList() {
  const { username } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [follow, setFollower] = useState([]);

  useEffect(() => {
    fetchData(`http://localhost:3000/profiles/${username}/following`)
      .then((data) => {
        setFollower([...follow, ...data]);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  

  const followingList = follow.map((follow) => (
    <li key={follow._id}>
      <Avatar user={follow.following} />
    </li>
  ));

  return (
    <>
      <h1 className="text-2xl mb-4">팔로잉</h1>
      <ul>{followingList}</ul>

      {!isLoaded && <p>fetching following...</p>}
      {error && <p>failed to fetch following</p>}
    </>
  );
}
