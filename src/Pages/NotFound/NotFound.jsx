// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-container" style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <h2 style={styles.subheading}>Page Not Found</h2>
      <p style={styles.text}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={styles.button}>
        Go Back Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    textAlign: 'center'
  },
  heading: {
    fontSize: '6rem',
    fontWeight: 'bold',
    margin: '0',
    color: '#e74c3c'
  },
  subheading: {
    fontSize: '2rem',
    margin: '10px 0 20px',
    color: '#333'
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#555',
    maxWidth: '500px'
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    display: 'inline-block'
  }
};

export default NotFound;