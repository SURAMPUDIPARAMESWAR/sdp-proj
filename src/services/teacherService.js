import api from './api'

const MOCK_TEACHER_DATA = {
  'TEA001': {
    id: 'TEA001',
    name: 'Ms. Sharma',
    email: 'sharma@test.com',
    role: 'Class Teacher',
    class: '10A',
    subject: 'All',
    students: [
      {
        id: 'STU001',
        name: 'John Smith',
        attendance: '97%',
        progress: [
          { subject: 'Mathematics', percent: 78 },
          { subject: 'English', percent: 92 }
        ],
        grades: [
          { subject: 'Mathematics', date: '2024-01-10', grade: 'A-' },
          { subject: 'English', date: '2024-01-14', grade: 'B' }
        ],
        atRisk: false,
        actionPoints: ['Needs help with algebra']
      },
      {
        id: 'STU002',
        name: 'Sarah Johnson',
        attendance: '88%',
        progress: [
          { subject: 'Mathematics', percent: 55 },
          { subject: 'English', percent: 81 }
        ],
        grades: [
          { subject: 'Mathematics', date: '2024-01-12', grade: 'C' },
          { subject: 'English', date: '2024-01-14', grade: 'A' }
        ],
        atRisk: true,
        actionPoints: ['Low test scores']
      }
    ]
  }
}

export const teacherService = {
  // Get teacher dashboard
  getDashboard: async (teacherId) => {
    try {
      const teacher = MOCK_TEACHER_DATA[teacherId]
      if (!teacher) throw new Error('Teacher not found')
      return teacher
    } catch (error) {
      throw error
    }
  },

  // Get all students in class
  getStudents: async (teacherId) => {
    try {
      const teacher = MOCK_TEACHER_DATA[teacherId]
      if (!teacher) throw new Error('Teacher not found')
      return teacher.students
    } catch (error) {
      throw error
    }
  },

  // Update student marks (for subject teacher)
  updateMarks: async (studentId, subjectData) => {
    try {
      const teacher = Object.values(MOCK_TEACHER_DATA)[0]
      const student = teacher.students.find(s => s.id === studentId)
      
      if (!student) throw new Error('Student not found')

      // Update progress
      const progressIndex = student.progress.findIndex(p => p.subject === subjectData.subject)
      if (progressIndex !== -1) {
        student.progress[progressIndex].percent = subjectData.percent
      }

      // Update grades
      const gradeIndex = student.grades.findIndex(g => g.subject === subjectData.subject)
      if (gradeIndex !== -1) {
        student.grades[gradeIndex].grade = subjectData.grade
      }

      return { success: true, message: 'Marks updated successfully' }
    } catch (error) {
      throw error
    }
  },

  // Send message to student/parent
  sendMessage: async (recipientId, message) => {
    try {
      return {
        id: Date.now(),
        recipientId,
        content: message.content,
        type: message.type,
        timestamp: new Date().toISOString(),
        status: 'sent'
      }
    } catch (error) {
      throw error
    }
  }
}

export default teacherService