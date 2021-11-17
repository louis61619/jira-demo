import React, { useEffect } from 'react'
import { Drawer, Spin, Form, Input, Button } from 'antd'
import { useProjectModal, useProjectQueryKey } from '@/hooks'
import UserSelect from '@/components/user-select'
import ErrorBox from '@/components/error-box'
import { useAddProject, useEditProject } from '@/service/projects'
import { useForm } from 'antd/lib/form/Form'

import { ProjectModalWrapper } from './style'

const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
  const title = editingProject ? '編輯項目' : '創建項目'

  const useMutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectQueryKey())

  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields()
      close()
    })
  }

  const closeModal = () => {
    form.resetFields()
    close()
  }

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  return (
    <Drawer forceRender={true} onClose={closeModal} visible={projectModalOpen} width="100%">
      <h2>{title}</h2>
      <ErrorBox error={error} />
      <ProjectModalWrapper>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <Form form={form} layout={'vertical'} onFinish={onFinish}>
              <Form.Item
                label="名稱"
                name="name"
                rules={[
                  {
                    required: true,
                    message: '請輸入項目名稱'
                  }
                ]}
              >
                <Input placeholder="請輸入項目名稱" />
              </Form.Item>
              <Form.Item label="備註" name="organization">
                <Input placeholder="請輸入備註" />
              </Form.Item>
              <Form.Item
                label="負責人"
                name="personId"
                rules={[
                  {
                    required: true,
                    message: '請輸入負責人名稱'
                  }
                ]}
              >
                <UserSelect defaultOptionName="負責人" />
              </Form.Item>
              <Form.Item className="modal-button">
                <Button loading={mutateLoading} type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </ProjectModalWrapper>
    </Drawer>
  )
}

export default ProjectModal
