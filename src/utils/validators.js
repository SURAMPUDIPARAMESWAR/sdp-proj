// Email validation - Allow .com, .in and other standard domains
export const validateEmail = (email) => {
  // Regex that allows standard email format with various TLDs
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email format";
  
  return "";
};

// Password validation - Relaxed constraints
export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  
  return "";
};

// Name validation
export const validateName = (name) => {
  if (!name || name.trim().length === 0) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters";
  if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters";
  
  return "";
};

// Roll number validation
export const validateRollNumber = (rollNumber) => {
  if (!rollNumber) return "Roll number is required";
  if (rollNumber.length < 2) return "Invalid roll number";
  
  return "";
};

// Phone validation
export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  
  if (!phone) return "Phone is required";
  if (!phoneRegex.test(phone)) return "Phone must be 10 digits";
  
  return "";
};

// Attendance validation
export const validateAttendance = (attendance) => {
  const value = parseInt(attendance);
  
  if (isNaN(value)) return "Attendance must be a number";
  if (value < 0 || value > 100) return "Attendance must be between 0-100";
  
  return "";
};

// Grade validation
export const validateGrade = (grade) => {
  const validGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];
  
  if (!grade) return "Grade is required";
  if (!validGrades.includes(grade)) return "Invalid grade";
  
  return "";
};

// Form validation helper
export const validateForm = (formData, rules) => {
  const errors = {};
  
  for (const [field, validator] of Object.entries(rules)) {
    errors[field] = validator(formData[field]);
  }
  
  return errors;
};
