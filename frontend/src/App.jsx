import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Contact from "./pages/Contact";

function Home() {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/exit"); 
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        textAlign: "center",
        gap: "20px",
      }}
    >
      <h1>STAFF MAINTENANCE</h1>
      <h2>HUMAN RESOURCES DIVISION</h2>

      
      <button
        onClick={handleExit}
        style={{
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Exit
      </button>
    </div>
  );
}

function ExitPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1> You have exited the system</h1>
    </div>
  );
}

function App() {
  return (
    <>
      {/* NAVBAR */}
      <nav
        style={{
          padding: "1rem",
          display: "flex",
          gap: "30px",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/contact">STAFF</Link>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/exit" element={<ExitPage />} />
      </Routes>
    </>
  );
}

export default App;