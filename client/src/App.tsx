import Body from "./components/Body";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Issues from "./pages/Issues";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Issue from "./pages/Issue";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Body>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/issues/:id" element={<Issue />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Project />} />
        </Routes>
      </Body>
    </AuthProvider>
  );
};

export default App;
