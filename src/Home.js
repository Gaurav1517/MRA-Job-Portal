import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4 text-info fw-bold">
          <i className="bi bi-emoji-smile me-2 text-warning"></i>
          Welcome to MRA Infotech
        </h1>
        <p className="lead">
          Discover your dream job or hire the right talent — all in one place!
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Job Seekers Section */}
        <div className="col-md-5">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <i className="bi bi-person-badge fs-1 text-muted mb-3"></i>
              <h4 className="card-title">I'm a Job Seeker</h4>
              <p className="card-text">
                Explore job listings and apply with just a few clicks.
              </p>
              <Link to="/dashboard" className="btn btn-success">
                Start Finding Jobs
              </Link>
            </div>
          </div>
        </div>

        {/* Employers Section */}
        <div className="col-md-5">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <i className="bi bi-building fs-1 text-primary mb-3"></i>
              <h4 className="card-title">I'm a Company</h4>
              <p className="card-text">
                Post job vacancies and connect with skilled professionals.
              </p>
              <Link to="/company/postnewjob" className="btn btn-primary">
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-5 text-center">
        <h3 className="fw-bold mb-4">Why Choose MRA Job Portal?</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-3 border rounded bg-light">
              <i className="bi bi-search fs-2 text-info"></i>
              <h5 className="mt-2">Powerful Search</h5>
              <p className="mb-0">Find jobs by skillset, degree, or company.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 border rounded bg-light">
              <i className="bi bi-speedometer2 fs-2 text-danger"></i>
              <h5 className="mt-2">Faster Hiring</h5>
              <p className="mb-0">Our platform connects you quickly and efficiently.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 border rounded bg-light">
              <i className="bi bi-people fs-2 text-warning"></i>
              <h5 className="mt-2">Trusted Companies</h5>
              <p className="mb-0">We verify every employer so you don’t have to.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
