import { useState } from 'react';
import { verifyCertificate } from '../services/api';

function Verify() {
  const [certificateId, setCertificateId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await verifyCertificate(certificateId);
      setResult(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4">Verify Certificate</h1>
      <div className="card p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="certificateId" className="form-label">Certificate ID</label>
            <input
              type="text"
              className="form-control"
              id="certificateId"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {result && (
          <div className="mt-3">
            <h4>Certificate Details:</h4>
            <p>Name: {result.name}</p>
            <p>Course: {result.course}</p>
            <p>Issue Date: {result.issue_date}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Verify;