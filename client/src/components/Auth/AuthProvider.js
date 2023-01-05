import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import fetchData from "../../utils/fetchData";

export default function AuthProvider({ children }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 로그인을 하지 않은 상태
    if (!localStorage.getItem("token")) {
      return setIsLoaded(true);
    }
    fetchData(`${process.env.REACT_APP_SERVER}/user`)
      .then((data) => {
        // 유저 state를 업데이트 한다
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  //   로그인
  function signIn(data, callback) {
    setUser(data.user);
    // 로컬스토리지에 토큰을 저장한다
    localStorage.setItem("token", data.token);
    // Feed로 이동한다
    // Login.js에 navigate 함수를 callback 한다
    callback();

  }

  //   로그아웃
  function signOut() {
    setUser(null);
    // 로컬스토리지에서 토큰을 삭제한다
    localStorage.removeItem("token");
  }
  const value = { user, setUser, signIn, signOut }; //value 변수에 담아서

  if (error) {
    return <p>failed to fetch a user</p>;
  }
  if (!isLoaded) {
    return <p>fetching a user...</p>;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; //props로 전달함
}
