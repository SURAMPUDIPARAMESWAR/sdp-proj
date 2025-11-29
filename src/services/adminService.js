let adminData = {
  students: [
    {
      id: 'STU001',
      name: 'John Smith',
      class: '10A',
      email: 'john@test.com',
      parent: 'Mr. Smith',
      attendance: '97%',
      grade: 'B+',
      atRisk: false
    },
    {
      id: 'STU002',
      name: 'Sarah Johnson',
      class: '10A',
      email: 'sarah@test.com',
      parent: 'Mrs. Johnson',
      attendance: '88%',
      grade: 'A',
      atRisk: true
    }
  ],
  teachers: [
    {
      id: 'TEA001',
      name: 'Ms. Sharma',
      email: 'sharma@test.com',
      role: 'Class Teacher',
      class: '10A',
      subject: 'All'
    },
    {
      id: 'TEA002',
      name: 'Mr. Singh',
      email: 'singh@test.com',
      role: 'Subject Teacher',
      class: '10A',
      subject: 'Mathematics'
    }
  ],
  parents: [
    {
      id: 'PAR001',
      name: 'Mr. Smith',
      email: 'mrsmith@test.com',
      child: 'John Smith'
    },
    {
      id: 'PAR002',
      name: 'Mrs. Johnson',
      email: 'mrsjohnson@test.com',
      child: 'Sarah Johnson'
    }
  ]
}

export const adminService = {
  // Get overview stats
  getOverview: async () => {
    try {
      return {
        totalStudents: adminData.students.length,
        totalTeachers: adminData.teachers.length,
        totalParents: adminData.parents.length,
        totalClasses: 2,
        atRiskStudents: adminData.students.filter(s => s.atRisk).length
      }
    } catch (error) {
      throw error
    }
  },

  // Get all students
  getStudents: async () => {
    try {
      return adminData.students
    } catch (error) {
      throw error
    }
  },

  // Add student
  addStudent: async (studentData) => {
    try {
      const newStudent = {
        id: `STU${adminData.students.length + 1}`,
        ...studentData
      }
      adminData.students.push(newStudent)
      return newStudent
    } catch (error) {
      throw error
    }
  },

  // Update student
  updateStudent: async (studentId, updateData) => {
    try {
      const index = adminData.students.findIndex(s => s.id === studentId)
      if (index === -1) throw new Error('Student not found')
      
      adminData.students[index] = { ...adminData.students[index], ...updateData }
      return adminData.students[index]
    } catch (error) {
      throw error
    }
  },

  // Delete student
  deleteStudent: async (studentId) => {
    try {
      const index = adminData.students.findIndex(s => s.id === studentId)
      if (index === -1) throw new Error('Student not found')
      
      adminData.students.splice(index, 1)
      return { success: true, message: 'Student deleted successfully' }
    } catch (error) {
      throw error
    }
  },

  // Get all teachers
  getTeachers: async () => {
    try {
      return adminData.teachers
    } catch (error) {
      throw error
    }
  },

  // Add teacher
  addTeacher: async (teacherData) => {
    try {
      const newTeacher = {
        id: `TEA${adminData.teachers.length + 1}`,
        ...teacherData
      }
      adminData.teachers.push(newTeacher)
      return newTeacher
    } catch (error) {
      throw error
    }
  },

  // Update teacher
  updateTeacher: async (teacherId, updateData) => {
    try {
      const index = adminData.teachers.findIndex(t => t.id === teacherId)
      if (index === -1) throw new Error('Teacher not found')
      
      adminData.teachers[index] = { ...adminData.teachers[index], ...updateData }
      return adminData.teachers[index]
    } catch (error) {
      throw error
    }
  },

  // Get all parents
  getParents: async () => {
    try {
      return adminData.parents
    } catch (error) {
      throw error
    }
  },

  // Get analytics
  getAnalytics: async () => {
    try {
      const classCounts = {}
      const subjectPerformance = {}

      adminData.students.forEach(student => {
        classCounts[student.class] = (classCounts[student.class] || 0) + 1
      })

      return {
        classCounts,
        topPerformers: adminData.students
          .sort((a, b) => {
            const gradeOrder = { 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'B-': 6 }
            return (gradeOrder[b.grade] || 0) - (gradeOrder[a.grade] || 0)
          })
          .slice(0, 5),
        atRiskStudents: adminData.students.filter(s => s.atRisk)
      }
    } catch (error) {
      throw error
    }
  },

  // Send message
  sendMessage: async (recipientId, messageData) => {
    try {
      return {
        id: Date.now(),
        from: 'Admin',
        to: recipientId,
        content: messageData.content,
        type: messageData.type,
        timestamp: new Date().toISOString(),
        status: 'sent'
      }
    } catch (error) {
      throw error
    }
  }
}
export default adminService