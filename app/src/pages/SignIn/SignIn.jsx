
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();

 
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Redirect to another page after successful signup
        navigate('/somewhere'); // Replace '/somewhere' with your desired route
      } else {
        const errorResponse = await response.json();
        console.error('Error:', errorResponse);
        // Optionally, you could show an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle errors (e.g., network issues)
    }
  };

  return (
    <section className="py-5">
      <div className="container px-5">
        <div className="bg-light rounded-4 py-5 px-4 px-md-5">
          <div className="text-center mb-5">
            <div>
              <img
                className="feature rounded-3 mb-3"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjsU9I6rvcOTugnfsbL9l8L8OnW9ZlE7qdyg&s"
                alt="pakFlag"
                style={{ width: '100px' }}
              />
            </div>
            <h1 className="fw-bolder">Become a Voter</h1>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8 col-xl-6">
              <form onSubmit={handleSubmit} id="contactForm" encType="application/json">
                {/* All your input fields remain unchanged */}
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name..."
                    required
                  />
                  <label htmlFor="name">Full name</label>
                </div>
                {/* Other fields here... */}
                <input
                  className="d-grid btn btn-primary btn-lg form-control"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
