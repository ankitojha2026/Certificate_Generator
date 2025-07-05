import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateCertificate } from '../services/api';

function Certificate() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [certificateUrl, setCertificateUrl] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await generateCertificate({
          user_id: state.user_id,
          payment_id: state.payment_id,
        });
        
        const url = URL.createObjectURL(response);
        setCertificateUrl(url);
        
        // Simulate certificate ID extraction (in real case, backend should return it)
        // For demo, we'll use a placeholder
        setCertificateId('CERT-XXXX-YYYY');
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (state?.user_id && state?.payment_id) {
      fetchCertificate();
    } else {
      navigate('/');
    }
  }, [state, navigate]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = certificateUrl;
    link.download = `certificate_${certificateId}.pdf`;
    link.click();
  };

  return (
    <div>
      <h1 className="text-center mb-4">Your Certificate</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="card p-4">
          <h4>Certificate ID: {certificateId}</h4>
          {certificateUrl && (
            <div>
              <iframe
                src={certificateUrl}
                style={{ width: '100%', height: '500px' }}
                title="Certificate"
              />
              <button className="btn btn-primary mt-3" onClick={handleDownload}>
                Download Certificate
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Certificate;