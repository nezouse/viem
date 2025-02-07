---
head:
  - - meta
    - property: og:title
      content: getAbiItem
  - - meta
    - name: description
      content: Retrieves an item from the ABI array.
  - - meta
    - property: og:description
      content: Retrieves an item from the ABI array.

---

# getAbiItem

Retrieves an item from the ABI.

## Import

```ts
import { getAbiItem } from 'viem'
```

## Usage

```ts
import { getAbiItem } from 'viem'

const encodedData = getAbiItem({
  abi: [
    { 
      name: 'x', 
      type: 'function', 
      inputs: [{ type: 'uint256' }], 
      outputs: [],
      stateMutability: 'payable'
    },
    { 
      name: 'y', 
      type: 'event', 
      inputs: [{ type: 'address' }], 
      outputs: [{ type: 'uint256' }]
      stateMutability: 'view'
    },
    { 
      name: 'z', 
      type: 'function', 
      inputs: [{ type: 'string' }],
      outputs: [{ type: 'uint256' }]
      stateMutability: 'view'
    }
  ],
  name: 'y',
})
/**
 * { 
 *  name: 'y', 
 *  type: 'event', 
 *  inputs: [{ type: 'address' }], 
 *  outputs: [{ type: 'uint256' }]
 *  stateMutability: 'view'
 * }
 */
```

## Returns

`AbiItem`

The ABI item.

## Parameters

### abi

- **Type:** [`Abi`](/docs/glossary/types.html#abi)

The contract's ABI.

```ts
const encodedData = getAbiItem({
  abi: [...], // [!code focus]
  name: 'x',
})
```

### name

- **Type:** `string`

Name of the ABI item to extract.

```ts
const encodedData = getAbiItem({
  abi: [...],
  name: 'x', // [!code focus]
})
```

### args (optional)

- **Type:** Inferred.

Optional arguments to identify function overrides.

```ts
const encodedData = getAbiItem({
  abi: [...],
  name: 'y',
  args: ['0x0000000000000000000000000000000000000000'], // [!code focus]
})
```
