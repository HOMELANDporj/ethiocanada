// SignInStyles.js

const styles = {
  /* src/components/UserFooter.css */

  footer: {
    marginTop: 0,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    backgroundColor: '#fff', 
    marginBottom:'0px',// White background
  },
  formContainer: {
    maxWidth: '400px',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#dc3545', // Red text color
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    border: '1px solid #ced4da',
    borderRadius: '0.25rem',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    cursor: 'pointer',
    backgroundColor: '#dc3545', // Red background
    border: '1px solid #dc3545', // Red border
    borderRadius: '0.25rem',
    transition: 'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    color: '#fff', // White text color
    fontWeight: 'bold', // Bold font weight
  },
  buttonHover: {
    color: '#fff',
    backgroundColor: '#0056b3',
    borderColor: '#0056b3',
  },
  textCenter: {
    textAlign: 'center',
  },
  textDanger: {
    color: '#dc3545', // Red text color
  },
  marginTop3: {
    marginTop: '1rem',
  },
  largeRedText: {
    fontSize: '2rem',
    color: '#dc3545', // Red text color
    textAlign: 'center',
    marginBottom: '1rem',
    fontWeight: 'bold', // Bold font weight
  },
};

export default styles;
