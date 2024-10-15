import React from 'react';

function HomePage() {
  return (
    <section style={{ backgroundColor: '#EAE6F5', padding: '2rem 0', height: '90vh' }}>
      {/* Only HomePage content, no Navbar */}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mt-5">
            <h1 className="fw-bold">MAKE YOUR VOICE HEARD WITH OUR APP</h1>
            <p className="lead">
              "Voting is the expression of our commitment to ourselves, one another, this country, and this world."
            </p>
            <button className="btn btn-primary btn-lg">Activate Your Vote</button>
          </div>
          <div className="col-md-6 mt-5">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://blogs.tribune.com.pk/wp-content/uploads/2011/08/7450-Povertypakchildrenreutersx-1313584862.jpg"
                    className="d-block w-100 rounded-circle"
                    alt="First slide"
                    style={{ border: '5px solid #7D3C98' }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://viewsweek.com/wp-content/uploads/2014/01/poor-child.jpg"
                    className="d-block w-100 rounded-circle"
                    alt="Second slide"
                    style={{ border: '5px solid #7D3C98' }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw94WvlGbt9mynUq6yyw38dBs2tpFm8kLi1QtLvhQl6G6F12UEXJJYcs29j_3RLU8beeU&usqp=CAU"
                    className="d-block w-100 rounded-circle"
                    alt="Third slide"
                    style={{ border: '5px solid #7D3C98' }}
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
