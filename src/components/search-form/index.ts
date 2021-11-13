import styled from '@emotion/styled'
import { Form } from 'antd'

const SearchForm = styled(Form)`
  /* margin-bottom: 1.2rem; */
  .ant-form-item {
    min-width: 120px;
  }

  @media (max-width: 767px) {
    flex-direction: column;

    .ant-form-item {
      margin-right: 0;
      margin-bottom: 1.2rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`

export default SearchForm
