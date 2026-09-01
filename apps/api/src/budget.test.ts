import assert from 'node:assert/strict'
import { test } from 'node:test'
import { spend } from './budget.ts'

test('a burst is allowed and then the bucket is empty', () => {
  const who = 'burst'
  const allowed = Array.from({ length: 25 }, () => spend(who).ok).filter(Boolean).length
  assert.equal(allowed, 20, 'the default ceiling is 20 a minute')
  const refused = spend(who)
  assert.equal(refused.ok, false)
  assert.ok(!refused.ok && refused.retryAfter > 0, 'a refusal says when to come back')
})

test('callers do not spend each other budget', () => {
  for (let i = 0; i < 20; i++) spend('noisy')
  assert.equal(spend('noisy').ok, false)
  assert.equal(spend('quiet').ok, true)
})
