const databaseUrl = 
    window.location.hostname === 'localhost'
        ? 'http://localhost:8000'
        : process.env.REACT_APP_DATABASE_URL

export default databaseUrl;