import styled from '@emotion/styled'

export const ProjectModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  align-items: center;

  .ant-form {
    max-width: 40rem;
    width: 100%;
  }

  .modal-button {
    .ant-form-item-control-input-content {
      text-align: end;
    }
  }
`
