import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Connections from "./components/Connections"
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
function App() {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
            </Route>
          </Routes>
        </BrowserRouter>
        {/* <Navbar /> */}
      </Provider>
    </div>
  );
}

export default App;
