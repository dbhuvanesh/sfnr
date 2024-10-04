
import "medhya/css/medhya.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
const container = document.querySelector(".root")!;
const root = createRoot(container);
root.render(
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Welcome</h1>
          </>
        }
      />
    </Routes>
  </Router>
);
