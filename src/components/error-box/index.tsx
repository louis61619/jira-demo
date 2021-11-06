import { Typography } from 'antd'
// 類型守衛
const isError = (value: any): value is Error => value?.message

const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type="danger">{error.message}</Typography.Text>
  }
  return null
}

export default ErrorBox
