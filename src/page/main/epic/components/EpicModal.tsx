import React, { useEffect } from 'react'
import { Drawer, Spin, Form, Input, Button } from 'antd'
import { useEpicModal } from '../hooks/useEpicModal'
// import Ta from '@/components/'
import ErrorBox from '@/components/error-box'
import { useAddEpic, useEditEpic } from '@/service/epic'
import { useForm } from 'antd/lib/form/Form'

import { useEpicsQueryKey, useProjectIdInUrl } from '../hooks/useEpics'
import { EpicModalWrapper } from './style'

const EpciModal = () => {
  const { epicModalOpen, close, editingEpic, isLoading } = useEpicModal()
  const title = editingEpic ? '編輯任務組' : '創建任務組'

  const useMutateEpic = editingEpic ? useEditEpic : useAddEpic
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateEpic(useEpicsQueryKey())
  const projectId = useProjectIdInUrl()

  const [form] = useForm()
  const onFinish = (values: any) => {
    console.log({ ...editingEpic, ...values, projectId })
    mutateAsync({ ...editingEpic, ...values, projectId }).then(() => {
      form.resetFields()
      close()
    })
  }

  const closeModal = () => {
    form.resetFields()
    close()
  }

  useEffect(() => {
    form.setFieldsValue(editingEpic)
  }, [editingEpic, form])

  return (
    <Drawer forceRender={true} onClose={closeModal} visible={epicModalOpen} width="100%">
      <h2>{title}</h2>
      <ErrorBox error={error} />
      <EpicModalWrapper>
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
              <Form.Item className="modal-button">
                <Button loading={mutateLoading} type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </EpicModalWrapper>
    </Drawer>
  )
}

export default EpciModal
