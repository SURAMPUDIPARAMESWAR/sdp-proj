import api from './api'

// Mock student data
const MOCK_STUDENT_DATA = {
  'STU001': {
    id: 'STU001',
    name: 'John Smith',
    email: 'john@test.com',
    class: '10A',
    rollNumber: '001',
    attendance: '97%',
    overallGrade: 'B+',
    progress: [
      { subject: 'Mathematics', percent: 78 },
      { subject: 'English', percent: 92 },
      { subject: 'Science', percent: 85 },
      { subject: 'Social Studies', percent: 88 }
    ],
    grades: [
      { subject: 'Mathematics', date: '2024-01-10', grade: 'A-' },
      { subject: 'English', date: '2024-01-14', grade: 'B' },
      { subject: 'Science', date: '2024-01-15', grade: 'A-' },
      { subject: 'Social Studies', date: '2024-01-16', grade: 'B+' }
    ],
    actionPoints: ['Needs help with algebra', 'Good performance in English'],
    messages: []
  }
}

export const studentService = {
  // Get student dashboard data
  getDashboard: async (studentId) => {
    try {
      // Simulate API call
      const data = MOCK_STUDENT_DATA[studentId]
      if (!data) throw new Error('Student not found')
      return data
    } catch (error) {
      throw error
    }
  },

  // Get student results
  getResults: async (studentId) => {
    try {
      const student = MOCK_STUDENT_DATA[studentId]
      if (!student) throw new Error('Student not found')
      return student.grades
    } catch (error) {
      throw error
    }
  },

  // Get progress by subject
  getProgress: async (studentId) => {
    try {
      const student = MOCK_STUDENT_DATA[studentId]
      if (!student) throw new Error('Student not found')
      return student.progress
    } catch (error) {
      throw error
    }
  },

  // Send message to teacher
  sendMessage: async (studentId, message) => {
    try {
      const student = MOCK_STUDENT_DATA[studentId]
      if (!student) throw new Error('Student not found')
      
      const newMessage = {
        id: Date.now(),
        studentId,
        content: message,
        timestamp: new Date().toISOString(),
        status: 'sent'
      }

      student.messages.push(newMessage)
      return newMessage
    } catch (error) {
      throw error
    }
  },

  // Get messages
  getMessages: async (studentId) => {
    try {
      const student = MOCK_STUDENT_DATA[studentId]
      if (!student) throw new Error('Student not found')
      return student.messages
    } catch (error) {
      throw error
    }
  }
}

export default studentService