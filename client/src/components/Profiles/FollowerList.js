import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import Avatar from "../etc/Avatar";

export default function FollowerList() {
  const { username } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [follow, setFollow] = useState([]);

  useEffect(() => {
    fetchData(`http://localhost:3000/profiles/${username}/followers`)
      .then((data) => {
        setFollow([...follow, ...data]);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const followerList = follow.map((follow) => (
    <li key={follow._id}>
      <Avatar user={follow.follower} />
    </li>
  ));

  return (
    <div className="px-2">
      <h1 className="text-2xl mb-4">팔로워</h1>
      <ul>{followerList}</ul>

      {!isLoaded && <p>fetching following</p>}
      {error && <p>failed to fetch following</p>}
    </div>
  );
}
