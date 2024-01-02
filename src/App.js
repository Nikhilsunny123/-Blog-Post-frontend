import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";
import Router from "./Router";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Router />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
