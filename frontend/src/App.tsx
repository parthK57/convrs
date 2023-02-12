import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Store/store";

// Routes
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      {/* <Provider store={store}> */}
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      {/* </Provider> */}
    </>
  );
}

export default App;
