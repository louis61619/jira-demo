import styled from '@emotion/styled'

export const MainWrapper = styled.div`
  /* padding: 1.6rem; */
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const ContentWrapper = styled.main`
  padding: 0 2.4rem;
  padding-bottom: 2.4rem;
  flex: 1;
`

// 使用grid佈局

// 參考: digitalocean.com/community/tutorials/css-css-grid-holy-grail-layout
/**
 * grid 和 flex
 * 一維佈局 flex 二維佈局(有高度) grid
 * 內容如果不固定使用 flex 會比較簡單
 */
