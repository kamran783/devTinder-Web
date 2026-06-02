import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/body";
import Login from "./components/Login";
import appStore from "./utils/appStore"
import {Provider} from "react-redux"
function App() {
  return (
    <div>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Navbar /> */}
      </Provider>
    </div>
  );
}

export default App;
