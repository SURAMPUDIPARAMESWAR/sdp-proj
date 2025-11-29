const MOCK_PARENT_DATA = {
  'PAR001': {
    id: 'PAR001',
    name: 'Mr. Smith',
    email: 'mrsmith@test.com',
    children: [
      {
        id: 'STU001',
        name: 'John Smith',
        class: '10A',
        rollNumber: '001',
        overallGrade: 'B+',
        attendance: '97%',
        progress: [
          { subject: 'Mathematics', percent: 78 },
          { subject: 'English', percent: 92 }
        ],
        grades: [
          { subject: 'Mathematics', date: '2024-01-10', grade: 'A-' },
          { subject: 'English', date: '2024-01-14', grade: 'B' }
        ],
        actionPoints: ['Needs help with algebra'],
        atRisk: false
      }
    ],
    messages: [
      {
        from: 'Ms. Sharma',
        to: 'Parent',
        content: 'John is doing well in his studies',
        date: '2024-01-20',
        type: 'message'
      }
    ]
  }
}

export const parentService = {
  // Get parent dashboard
  getDashboard: async (parentId) => {
    try {
      const parent = MOCK_PARENT_DATA[parentId]
      if (!parent) throw new Error('Parent not found')
      return parent
    } catch (error) {
      throw error
    }
  },

  // Get child report
  getChildReport: async (parentId, childId) => {
    try {
      const parent = MOCK_PARENT_DATA[parentId]
      if (!parent) throw new Error('Parent not found')
      
      const child = parent.children.find(c => c.id === childId)
      if (!child) throw new Error('Child not found')
      
      return child
    } catch (error) {
      throw error
    }
  },

  // Get messages
  getMessages: async (parentId) => {
    try {
      const parent = MOCK_PARENT_DATA[parentId]
      if (!parent) throw new Error('Parent not found')
      return parent.messages
    } catch (error) {
      throw error
    }
  }
}

export default parentService