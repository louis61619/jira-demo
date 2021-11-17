export const taskTypes = [
  {
    name: 'task'
  },
  {
    name: 'bug'
  }
]

export const tags = [
  {
    name: '初始'
  },
  {
    name: '中期'
  },
  {
    name: '結項'
  }
]

export const epics = [
  {
    name: '管理系統開發',
    start: new Date('2020-12-10').getTime(),
    end: new Date('2021-01-11').getTime()
  },
  {
    name: '地圖系統開發',
    start: new Date('2021-01-12').getTime(),
    end: new Date('2021-02-14').getTime()
  },
  {
    name: '後台系統開發',
    start: new Date('2021-01-12').getTime(),
    end: new Date('2021-02-14').getTime()
  }
]

export const kanbans = [
  {
    name: '待完成'
  },
  {
    name: '開發中'
  },
  {
    name: '已完成'
  }
]

export const users = [
  {
    name: '高修文',
    organization: '外送組'
  },
  {
    name: '雄天成',
    organization: '外送組'
  },
  {
    name: '正華',
    organization: '管理組'
  },
  {
    name: '文靜',
    organization: '中台組'
  }
]

export const projects = [
  {
    id: 1,
    name: '內容管理系統',
    personId: 1,
    organization: '外送組',
    created: 1604989757139
  }
]

export const tasks = [
  {
    name: '管理註冊介面開發',
    tags: [1, 2],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: '請盡快完成'
  },
  {
    name: '管理登入介面開發',
    tags: [2],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: '使用JWT'
  },
  {
    name: '單元測試',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: ''
  },
  {
    name: '性能優化',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: ''
  },
  {
    name: '權限管理',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: ''
  },
  {
    name: 'UI設計',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: ''
  },
  {
    name: 'e2e測試',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: ''
  }
]
