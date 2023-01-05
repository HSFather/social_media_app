import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./components/Auth/AuthProvider";
import AuthRequired from "./components/Auth/AuthRequired";
import Layout from "./components/etc/Layout";
import Feed from "./components/Articles/Feed";
import ArticleList from "./components/Articles/ArticleList";
import ArticleCreate from "./components/Articles/ArticleCreate";
import ArticleView from "./components/Articles/ArticleView";
import Comments from "./components/Comments/Comments";
import Search from "./components/Search/Search";
import Login from "./components/Accounts/Login";
import Register from "./components/Accounts/Register";
import Profile from "./components/Profiles/Profile";
import Accounts from "./components/Accounts/Accounts";
import NotFound from "./components/Error/NotFound";
import FollowerList from "./components/Profiles/FollowerList";
import FollowingList from "./components/Profiles/FollowingList";

function App() {
  return (
    <Router>
      {/* AuthProvider 는 Routes를 감싼다. 인증 userState를 관리한다. 아래 Tree에 props로 전달 */}
      <AuthProvider>
        <Routes>
          {/* 인증이 필요한 라우트 */}
          <Route
            path="/"
            element={
              <AuthRequired>
                {/* 바뀌지 않는 부분 */}
                <Layout />
              </AuthRequired>
            }
          >
            <Route index element={<Feed />} />
            <Route path="articles" element={<ArticleList />} />
            <Route path="search" element={<Search />} />
            <Route path="create" element={<ArticleCreate />} />
            <Route path="article/:articleId">
              <Route index element={<ArticleView />} />
              <Route path="comments" element={<Comments />} />
            </Route>
            <Route path="profile/:username">
              <Route index element={<Profile />} />
              <Route path="followers" element={<FollowerList />}></Route>
              <Route path="following" element={<FollowingList />}></Route>
            </Route>
            <Route path="accounts/edit" element={<Accounts />} />
          </Route>

          {/* 인증이 필요하지 않은 라우트 */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
