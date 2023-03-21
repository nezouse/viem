import { describe, expect, test } from 'vitest'
import {
  accounts,
  getLocalAccount,
  typedData,
  walletClient,
  walletClientWithAccount,
} from '../../_test'

import { signTypedData } from './signTypedData'

const localAccount = getLocalAccount(accounts[0].privateKey)
const jsonRpcAccount = accounts[0].address

describe('default', async () => {
  test('json-rpc account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.basic,
        account: jsonRpcAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0x32f3d5975ba38d6c2fba9b95d5cbed1febaa68003d3d588d51f2de522ad54117760cfc249470a75232552e43991f53953a3d74edf6944553c6bef2469bb9e5921b',
    )
  })

  test('local account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.basic,
        account: localAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0x32f3d5975ba38d6c2fba9b95d5cbed1febaa68003d3d588d51f2de522ad54117760cfc249470a75232552e43991f53953a3d74edf6944553c6bef2469bb9e5921b',
    )
  })
})

test('inferred account', async () => {
  expect(
    await signTypedData(walletClientWithAccount, {
      ...typedData.basic,
      primaryType: 'Mail',
    }),
  ).toEqual(
    '0x32f3d5975ba38d6c2fba9b95d5cbed1febaa68003d3d588d51f2de522ad54117760cfc249470a75232552e43991f53953a3d74edf6944553c6bef2469bb9e5921b',
  )
})

describe('minimal', () => {
  test('json-rpc account', async () => {
    expect(
      await signTypedData(walletClient, {
        types: {
          EIP712Domain: [],
        },
        primaryType: 'EIP712Domain',
        domain: {},
        // @ts-expect-error
        message: {},
        account: jsonRpcAccount,
      }),
    ).toEqual(
      '0xda87197eb020923476a6d0149ca90bc1c894251cc30b38e0dd2cdd48567e12386d3ed40a509397410a4fd2d66e1300a39ac42f828f8a5a2cb948b35c22cf29e81c',
    )
  })

  // TODO: Unskip this once we have own wallet implementation that follows EIP-712.
  // Ethers.js Wallets do not honor the most minimal valid typed data schema.
  test.skip('local account', async () => {
    expect(
      await signTypedData(walletClient, {
        types: {
          EIP712Domain: [],
        },
        primaryType: 'EIP712Domain',
        domain: {},
        account: localAccount,
      }),
    ).toEqual(
      '0xda87197eb020923476a6d0149ca90bc1c894251cc30b38e0dd2cdd48567e12386d3ed40a509397410a4fd2d66e1300a39ac42f828f8a5a2cb948b35c22cf29e81c',
    )
  })
})

describe('complex', async () => {
  test('json-rpc account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.complex,
        account: jsonRpcAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0xc4d8bcda762d35ea79d9542b23200f46c2c1899db15bf929bbacaf609581db0831538374a01206517edd934e474212a0f1e2d62e9a01cd64f1cf94ea2e0988491c',
    )
  })

  test('local account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.complex,
        account: localAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0xc4d8bcda762d35ea79d9542b23200f46c2c1899db15bf929bbacaf609581db0831538374a01206517edd934e474212a0f1e2d62e9a01cd64f1cf94ea2e0988491c',
    )
  })
})

describe('args: domain: empty', () => {
  test('json-rpc account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.complex,
        domain: undefined,
        account: jsonRpcAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0x47d36c0110609e0c61169b221edfcd988455a67a0af965285c9c32bcc5df791f180b8e9a539e6a12e7af164f1de5879b09e4c1ef3032980bc7aea167198255eb1c',
    )
  })

  test('local account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.complex,
        domain: undefined,
        account: localAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0x47d36c0110609e0c61169b221edfcd988455a67a0af965285c9c32bcc5df791f180b8e9a539e6a12e7af164f1de5879b09e4c1ef3032980bc7aea167198255eb1c',
    )
  })
})

describe('args: domain: chainId', () => {
  test('json-rpc account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.complex,
        domain: {
          chainId: 1,
        },
        account: jsonRpcAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0x6e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf4a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db81c',
    )
  })

  test('local account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.complex,
        domain: {
          chainId: 1,
        },
        account: localAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0x6e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf4a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db81c',
    )
  })
})

describe('args: domain: name', () => {
  test('json-rpc account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.complex,
        domain: {
          name: 'Ether!',
        },
        account: jsonRpcAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0xb2b9704a23b0e5a5e728623113ab57e93a9de055b53c15d5d0f1a6485932efc503d77c0cfc2eca82cd9b4ecd2b39355457e4dd390ccb6d5c4457a2631b53baa21b',
    )
  })

  test('local account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.complex,
        domain: {
          name: 'Ether!',
        },
        account: localAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0xb2b9704a23b0e5a5e728623113ab57e93a9de055b53c15d5d0f1a6485932efc503d77c0cfc2eca82cd9b4ecd2b39355457e4dd390ccb6d5c4457a2631b53baa21b',
    )
  })
})

describe('args: domain: verifyingContract', () => {
  test('json-rpc account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.complex,
        domain: {
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        account: jsonRpcAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0xa74d8aa1ff14231fedeaf7a929e86ac55d80256bee24e1f8ebba9bd092a9351651b6669da7f5d0a7209243f8dee1026b018ed03dd5ce01b7ecb75a8880deeeb01b',
    )
  })

  test('local account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.complex,
        domain: {
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        account: localAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0xa74d8aa1ff14231fedeaf7a929e86ac55d80256bee24e1f8ebba9bd092a9351651b6669da7f5d0a7209243f8dee1026b018ed03dd5ce01b7ecb75a8880deeeb01b',
    )
  })
})

describe('args: domain: salt', () => {
  // TODO: Anvil has issues with hex bytes.
  test.skip('json-rpc account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.complex,
        domain: {
          salt: '0x123512315aaaa1231313b1231b23b13b123aa12312211b1b1b111bbbb1affafa',
        },
        account: jsonRpcAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0xa74d8aa1ff14231fedeaf7a929e86ac55d80256bee24e1f8ebba9bd092a9351651b6669da7f5d0a7209243f8dee1026b018ed03dd5ce01b7ecb75a8880deeeb01b',
    )
  })

  test('local account', async () => {
    expect(
      await signTypedData(walletClient, {
        ...typedData.complex,
        domain: {
          salt: '0x123512315aaaa1231313b1231b23b13b123aa12312211b1b1b111bbbb1affafa',
        },
        account: localAccount,
        primaryType: 'Mail',
      }),
    ).toEqual(
      '0x4b193383278fd3dcaa084952ea282cb9c8889c26c6caaa3f48aca7bde78c6e72028bd98c0328e40d067dbbab53733f99f241d8cf91a32580883f65264c2b72581b',
    )
  })
})

test('no account', async () => {
  await expect(() =>
    // @ts-expect-error
    signTypedData(walletClient, {
      ...typedData.basic,
      primaryType: 'Mail',
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "Could not find an Account to execute with this Action.
    Please provide an Account with the \`account\` argument on the Action, or by supplying an \`account\` to the WalletClient.

    Docs: https://viem.sh/docs/actions/wallet/signTypedData.html#account
    Version: viem@1.0.2"
  `)
})
