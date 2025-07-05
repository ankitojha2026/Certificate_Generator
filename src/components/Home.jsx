import { useNavigate } from 'react-router-dom';

const courses = [
  { name: 'Data Analytics', price: 1000 },
  { name: 'Web Development', price: 1000 },
  { name: 'Cyber Security', price: 1500 },
  { name: 'Prompt Engineering', price: 2000 },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-center mb-4">Available Courses</h1>
      <div className="row">
        {courses.map((course) => (
          <div key={course.name} className="col-md-3 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">Price: ₹{course.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/register', { state: { course } })}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;