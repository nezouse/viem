import { localhost } from '@wagmi/chains'
import { expectTypeOf, test } from 'vitest'

import { createPublicClient } from './createPublicClient'
import { http } from './transports'

test('with chain', () => {
  const client = createPublicClient({
    chain: localhost,
    transport: http(),
  })
  expectTypeOf(client.chain).toEqualTypeOf(localhost)
})

test('without chain', () => {
  const client = createPublicClient({
    transport: http(),
  })
  expectTypeOf(client).not.toHaveProperty('chain')
})
