export const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const formatDateTime = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatPercentage = (value) => {
  if (value === null || value === undefined) return '0%'
  return `${parseFloat(value).toFixed(2)}%`
}

export const gradeToPercentage = (grade) => {
  const gradeMap = {
    'A+': 95, 'A': 90, 'A-': 85,
    'B+': 80, 'B': 75, 'B-': 70,
    'C+': 65, 'C': 60, 'C-': 55,
    'D': 50, 'F': 0
  }
  return gradeMap[grade] || 0
}

export const percentageToGrade = (percentage) => {
  const perc = parseFloat(percentage)
  if (perc >= 90) return 'A+'
  if (perc >= 85) return 'A'
  if (perc >= 80) return 'A-'
  if (perc >= 75) return 'B+'
  if (perc >= 70) return 'B'
  if (perc >= 65) return 'B-'
  if (perc >= 60) return 'C+'
  if (perc >= 55) return 'C'
  if (perc >= 50) return 'C-'
  if (perc >= 40) return 'D'
  return 'F'
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount)
}

export const getGradeColor = (grade) => {
  const gradeColors = {
    'A+': '#2e7d32', 'A': '#388e3c', 'A-': '#558b2f',
    'B+': '#f57f17', 'B': '#fbc02d', 'B-': '#fdd835',
    'C+': '#ff6f00', 'C': '#ff9800', 'C-': '#ffb74d',
    'D': '#d32f2f', 'F': '#b71c1c'
  }
  return gradeColors[grade] || '#999'
}

export const truncateText = (text, length = 50) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}
export const capitalizeFirstLetter = (string) => {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
}