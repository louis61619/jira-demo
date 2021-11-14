import React, { useEffect } from 'react'
import { Form, Input, Modal, FormProps, Spin } from 'antd'

import { useEditTask } from '@/service/task'
import UserSelect from '@/components/user-select'
import TaskTypeSelect from '@/components/task-type-select'

import { useTaskModal } from '../hooks/useTaskModal'
import { useTasksQueryKey } from '../hooks/useKanbans'

interface Props {}

const layout: FormProps = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const TaskModal = (props: Props) => {
  const [form] = Form.useForm()
  const { editingTask, editingTaskId, close, isLoading } = useTaskModal()
  const { mutate: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey())

  const onCancel = () => {
    close()
    form.resetFields()
  }

  const onOk = async () => {
    editTask({
      ...editingTask,
      ...form.getFieldsValue()
    })
    close()
  }

  useEffect(() => {
    form.setFieldsValue(editingTask)
  }, [form, editingTask])

  return (
    <Modal
      okText="確認"
      cancelText="取消"
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={editLoading}
      title="編輯"
      visible={!!editingTaskId}
      forceRender={true}
    >
      {isLoading ? (
        <Spin style={{ margin: '3rem auto', width: '100%' }} />
      ) : (
        <Form {...layout} initialValues={editingTask} form={form}>
          <Form.Item
            label="任務名"
            name="name"
            rules={[{ required: true, message: '請輸入任務名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="負責人" name="processorId">
            <UserSelect defaultOptionName="負責人" />
          </Form.Item>
          <Form.Item label="類型" name="typeId">
            <TaskTypeSelect />
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}

export default TaskModal
