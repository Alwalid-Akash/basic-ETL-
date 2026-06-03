import { useState, useEffect } from 'react';
import {
  Card, Form, Row, Col, Table, Spinner, Alert
} from 'react-bootstrap';
import { fetchPopulation, fetchCO2 } from '../services/api';

// Add/remove datasets as needed. The key must match the API function name.
const datasets = {
  population: { fetch: fetchPopulation, label: 'World Population' },
  co2: { fetch: fetchCO2, label: 'Global CO₂ Emissions' },
  // gapminder: { fetch: fetchGapminder, label: 'Gapminder Data' }, // uncomment when ready
};

export default function DataTable() {
  // Start with a valid dataset key
  const [dataset, setDataset] = useState('population');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Safety check in case someone sets an invalid key
    const current = datasets[dataset];
    if (!current) {
      setError(`Dataset "${dataset}" is not configured.`);
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await current.fetch();
        setData(response.data);
      } catch (err) {
        // Show a user-friendly error message
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dataset]);

  // Create table columns from the first row
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Card className="shadow">
      <Card.Header as="h4" className="bg-primary text-white">
        Explore Dataset
      </Card.Header>
      <Card.Body>
        {/* Dataset selector */}
        <Row className="mb-4 align-items-center">
          <Col sm={4} md={3} lg={2}>
            <Form.Label className="fw-bold mb-0">Choose dataset:</Form.Label>
          </Col>
          <Col sm={8} md={6} lg={4}>
            <Form.Select
              value={dataset}
              onChange={(e) => setDataset(e.target.value)}
              aria-label="Dataset selector"
            >
              {Object.entries(datasets).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {/* Loading spinner */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="primary" />
            <p className="mt-2 text-muted">Fetching data...</p>
          </div>
        )}

        {/* Error alert */}
        {error && (
          <Alert variant="danger">
            <i className="bi bi-exclamation-triangle me-2" />{error}
          </Alert>
        )}

        {/* Data table */}
        {!loading && !error && data.length > 0 && (
          <div className="table-responsive">
            <Table striped bordered hover size="sm" className="mb-0">
              <thead className="table-dark">
                <tr>
                  {columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx}>
                    {columns.map((col) => (
                      <td key={col}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && data.length === 0 && (
          <Alert variant="warning">
            <i className="bi bi-info-circle me-2" />No data available for this dataset.
          </Alert>
        )}
      </Card.Body>
      <Card.Footer className="text-muted text-end">
        Total records: {data.length}
      </Card.Footer>
    </Card>
  );
}