import React from 'react';

const MainPage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', textAlign: 'center' }}>
      <header style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
        <h1>Welcome to Ethio Canada Portal</h1>
        <p>Your gateway to opportunities in Canada</p>
      </header>

      <section style={{ marginBottom: '20px' }}>
        <h2>About Ethio Canada Portal</h2>
        <p>
          Ethio Canada Portal is a platform dedicated to providing resources and support for Ethiopians exploring opportunities in Canada. Our mission is to bridge the gap between the two cultures and provide valuable services to our community.
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>Work Opportunities in Canada</h2>
        <p>
          Canada offers a wide range of job opportunities across various sectors including technology, healthcare, engineering, and more. The country's robust economy and high demand for skilled workers make it an attractive destination for job seekers.
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>Education Opportunities in Canada</h2>
        <p>
          Canada is home to some of the world's top universities and colleges, offering high-quality education and diverse programs. International students benefit from excellent academic standards, research opportunities, and a welcoming multicultural environment.
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>Why Canada is a Great Choice</h2>
        <p>
          Canada is known for its high standard of living, excellent healthcare system, and strong social support programs. The country also boasts a low crime rate, beautiful natural landscapes, and a commitment to diversity and inclusion.
        </p>
      </section>

      {/* <footer style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
        <p>&copy; 2024 Ethio Canada Portal. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default MainPage;
