import type { TestClient } from '../../clients'

export type GetAutomineReturnType = boolean

export async function getAutomine(
  client: TestClient,
): Promise<GetAutomineReturnType> {
  return await client.request({
    method: `${client.mode}_getAutomine`,
  })
}
