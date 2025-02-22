const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };
  
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const isValidUsername = (username) => {
    return /^[A-Za-z\d_@$!%*?&]{8,16}$/.test(username) && /[A-Za-z]/.test(username);
  };  
  
  const isValidCategory = (category) => {
    const validCategories = [
      "Business",
      "Creative",
      "Education",
      "Entertainment",
      "Fashion & Beauty",
      "Food & Beverage",
      "Government & Politics",
      "Health & Wellness",
      "Non-Profit",
      "Other",
      "Tech",
      "Travel & Tourism",
    ];
    return validCategories.includes(category);
  };
  
  module.exports = { isValidPassword, isValidEmail, isValidUsername, isValidCategory };
  