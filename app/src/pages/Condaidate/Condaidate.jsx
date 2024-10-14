import React, { useEffect } from 'react';

const candidates = [
  {
    name: 'Imran Khan',
    description: 'Imran Ahmed Khan Niazi is the founder and former chairman of the political party Pakistan Tehreek-e-Insaf (PTI) from 1996 to 2023. He was the captain of the Pakistan national cricket team in 1990s.',
    image: 'https://miro.medium.com/v2/resize:fit:720/1*-gp-JkJqp7Mscu8Cm6dSKg.jpeg',
  },
  {
    name: 'Shehbaz Sharif',
    description: 'Mian Muhammad Shehbaz Sharif (born 23 September 1951) is a Pakistani politician and businessman who is currently serving as the 24th prime minister of Pakistan since March 2024.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Shahbaz_Sharif_in_2022_%28cropped%29.jpg',
  },
  {
    name: 'Bilawal Bhutto',
    description: 'Bilawal Bhutto Zardari (born 21 September 1988) is a Pakistani politician who served as the 37th Minister of Foreign Affairs, in office from 27 April 2022 to 10 August 2023.',
    image: 'https://na.gov.pk/uploads/images/200(1).jpg',
  },
  {
    name: 'Aimal Wali Khan',
    description: 'Aimal Wali Khan (born 18 November 1986) is a Pakistani politician and the Central President of the Awami National Party (ANP) Pakistan.',
    image: 'https://pakobserver.net/wp-content/uploads/2022/03/02-2.jpg',
  },
  {
    name: 'Fazl ur Rehman',
    description: 'Fazal-ur-Rehman (born 19 June 1953) is a Pakistani politician who is the president of Jamiat Ulema-e-Islam (F).',
    image: 'https://na.gov.pk/uploads/images/25.jpg',
  },
  {
    name: 'Hafiz Naeem ur Rehman',
    description: 'Hafiz Naeem ur Rehman (born 1973) is a Pakistani social activist, engineer, politician and Central Ameer of Jamaat-e-Islami Pakistan for the session 2024-2029.',
    image: 'https://hamariweb.com/profiles/images/profile/9658-002-7390.jpg',
  },
  {
    name: 'Shujaat Hussain',
    description: 'Chaudhry Shujaat Hussain (born 27 January 1946) is a senior Pakistani politician who previously served as 16th prime minister of Pakistan.',
    image: 'https://hamariweb.com/profiles/images/profile/7266-685-7439.jpg',
  },
  {
    name: 'Dr. Khalid Maqbool',
    description: 'Dr. Khalid Maqbool Siddiqui is a Pakistani politician who is 1st Chairman of the MQM since 2024, He has been a member of the National Assembly of Pakistan since February 2024.',
    image: 'https://na.gov.pk/uploads/images/255(1).jpg',
  },
];

function Condaidate({ setSelectedPage }) {
  useEffect(() => {
    setSelectedPage('Condaidate');
  }, [setSelectedPage]);

  return (
    <main className="flex-shrink-0">
      <section className="py-5">
        <div className="container px-5 mb-5">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bolder mb-0">
              <span className="text-gradient d-inline">Condaidate List</span>
            </h1>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-11 col-xl-9 col-xxl-8">
              {candidates.map((candidate, index) => (
                <div key={index} className="card overflow-hidden shadow rounded-4 border-0 mb-3">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center">
                      <img className="img-fluid" src={candidate.image} width="300" height="400" alt={candidate.name} />
                      <div className="p-5">
                        <h2 className="fw-bolder">{candidate.name}</h2>
                        <p>{candidate.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Condaidate;
