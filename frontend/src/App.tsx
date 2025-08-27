import { CssBaseline, Container } from "@mui/material";
import { AdminDashboard } from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AdminDashboard />
      </Container>
    </>
  );
}

export default App;
