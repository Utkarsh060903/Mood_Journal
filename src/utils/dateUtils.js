export const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = dateString ? new Date(dateString) : new Date();
    return date.toLocaleDateString('en-US', options);
  };
  
  export const getCurrentDateISO = () => {
    return new Date().toISOString();
  };