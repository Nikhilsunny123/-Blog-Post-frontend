import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import Router from "./Router";
function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <Router />
          </div>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
