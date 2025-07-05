import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUser, createPayment, verifyPayment } from '../services/api';

function Register() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const course = state?.course || {};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userResponse = await createUser({
        name: formData.name,
        email: formData.email,
        course: course.name,
      });

      const paymentResponse = await createPayment({
        user_id: userResponse.user_id,
        course: course.name,
        amount: course.price,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: paymentResponse.amount * 100,
        currency: paymentResponse.currency,
        order_id: paymentResponse.order_id,
        handler: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            navigate('/certificate', {
              state: { user_id: userResponse.user_id, payment_id: response.razorpay_payment_id },
            });
          } catch (err) {
            setError(err);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        setError(response.error.description);
      });
      rzp.open();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4">Register for {course.name}</h1>
      <div className="card p-4">
        <h4>Course Price: ₹{course.price}</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="linkedin" className="form-label">LinkedIn URL</label>
            <input
              type="url"
              className="form-control"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;