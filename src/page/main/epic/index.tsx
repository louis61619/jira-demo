import React from 'react'
import { Button, List } from 'antd'
import { Link } from 'react-router-dom'
import { useEpics, useDeleteEpic } from '@/service/epic'
import { useTasks } from '@/service/task'
import { Row } from '@/components/lib'
import ListDropdown from '@/components/list-dropdown'
import { foramteDate } from '@/utils/fomate-time'

import { useEpicSearchParams, useProjectInUrl, useEpicsQueryKey } from './hooks/useEpics'
import { useEpicModal } from './hooks/useEpicModal'
import EpicModal from './components/EpicModal'
import { EpicContainer } from './style'

interface Props {}

const Epic = (props: Props) => {
  const { data: currenProject } = useProjectInUrl()
  const [param] = useEpicSearchParams()
  const { data: epics, isLoading: epicLoading } = useEpics(param)
  const { data: tasks, isLoading: taskLoading } = useTasks({ projectId: currenProject?.id })
  const { open, startEdit } = useEpicModal()
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey())

  const isLoading = epicLoading || taskLoading

  return (
    <EpicContainer>
      <Row between gap={0}>
        <h2>{currenProject?.name}任務組</h2>
        <Button onClick={() => open()}>創建任務組</Button>
      </Row>
      <List
        dataSource={epics}
        itemLayout="vertical"
        rowKey="id"
        loading={isLoading}
        renderItem={(epic) => {
          return (
            <List.Item>
              <List.Item.Meta
                title={
                  <Row between gap={0}>
                    <span>{epic.name}</span>
                    <ListDropdown
                      handleDelete={() => deleteEpic({ id: epic.id })}
                      handleEdit={() => startEdit(epic.id)}
                    />
                  </Row>
                }
                description={
                  <div>
                    <div>開始時間: {foramteDate(epic.start?.toString())}</div>
                    <div>結束時間: {foramteDate(epic.end?.toString())}</div>
                  </div>
                }
              />
              <div>
                {tasks
                  ?.filter((task) => task.epicId === epic.id)
                  .map((task) => (
                    <div key={task.id}>
                      <Link to={`/project/${currenProject?.id}/kanban?editingTaskId=${task.id}`}>
                        {task.name}
                      </Link>
                    </div>
                  ))}
              </div>
            </List.Item>
          )
        }}
      ></List>
      <EpicModal />
    </EpicContainer>
  )
}

export default Epic
