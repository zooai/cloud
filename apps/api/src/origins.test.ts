import assert from 'node:assert/strict'
import { test } from 'node:test'
import { allow } from './origins.ts'

test('the foundation sites are allowed and echoed back exactly', () => {
  assert.equal(allow('https://zoolabs.io'), 'https://zoolabs.io')
  assert.equal(allow('https://zoo.ngo'), 'https://zoo.ngo')
})

// The credential this proxy holds is billed, so a stranger's page must not
// reach it — and "starts with our name" is not the same as "is our name".
test('anything else is refused, including near misses', () => {
  for (const origin of [
    'https://zoolabs.io.evil.test',
    'http://zoolabs.io',
    'https://notzoo.ngo',
    'null',
    '',
    undefined,
  ]) {
    assert.equal(allow(origin), null, String(origin))
  }
})
