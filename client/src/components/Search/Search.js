import { useState, useEffect, useRef } from "react";
import Avatar from "../etc/Avatar";
import fetchData from "../../utils/fetchData";

export default function Search() {
  const [users, setUsers] = useState([]);
  const inputRef = useRef(null);

  console.log(users);

  function handleChange(e) {
    const username = e.target.value;

    if (!username.trim()) {
      return setUsers([]);
    }

    fetchData(`${process.env.REACT_APP_SERVER}/search/?username=${username}`)
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        alert("Something's broken");
      });
  }

  // DOM이 리턴된 뒤에 엘리먼트에 접근할 수 있다.
  useEffect(() => {
    // input에 focus를 한다
    inputRef.current.focus();
  });

  return (
    <div className="px-2">
      <div className="mb-4">
        <input
          type="text"
          className="border px-2 py-1 w-full"
          onChange={handleChange}
          placeholder="Search"
          ref={inputRef}
        />
      </div>

      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <Avatar user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}
