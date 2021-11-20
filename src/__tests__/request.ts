import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { request } from '@/service'

const apiUrl = process.env.REACT_APP_API_URL

const server = setupServer()

// 在所有測試執行前，先執行這個回調函數
beforeAll(() => server.listen())

// 每一個測試跑完以後，都重置mock api
afterEach(() => server.resetHandlers())

//  所有測試跑完以後，關閉mock api
afterAll(() => server.close())

test('http方法發送非同步請求', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = { mockValue: 'mock' }

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) => {
      return res(ctx.json(mockResult))
    })
  )
  const result = await request(endpoint)
  expect(result).toEqual(mockResult)
})

test('http請求時在header中帶上token', async () => {
  const token = 'FAKE_TOKEN'
  const endpoint = 'test-endpoint'
  const mockResult = { mockValue: 'mock' }

  let trueRequest: any

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      trueRequest = req
      return res(ctx.json(mockResult))
    })
  )

  await request(endpoint, { token })
  // toBe是 ===
  expect(trueRequest.headers.get('Authorization')).toBe(`Bearer ${token}`)
})
