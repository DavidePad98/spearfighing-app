import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App.js";
import { Provider } from "react-redux";
import store from "./redux/store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
