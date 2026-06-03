import 'bootstrap/dist/css/bootstrap.min.css'; // if not already in main.jsx
import { Navbar, Container } from 'react-bootstrap';
import DataTable from './components/DataTable';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            📊 ETL Data Hub
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Real‑time data from multiple sources
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <DataTable />
      </Container>
    </>
  );
}

export default App;