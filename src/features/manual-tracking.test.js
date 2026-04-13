import test from 'node:test'
import assert from 'node:assert/strict'

import {
  MANUAL_TRACK_ACTIONS,
  getManualTrackActionMeta,
  getManualTrackDialogCopy,
  getManualTrackSubmitLabel,
} from './manual-tracking.js'

test('manual tracking exposes explicit sign-in and sign-out actions', () => {
  assert.deepEqual(MANUAL_TRACK_ACTIONS, ['sign_in', 'sign_out'])
})

test('manual tracking copy makes sign-in the default action', () => {
  assert.equal(getManualTrackDialogCopy('sign_in').badge, 'Sign In')
  assert.equal(getManualTrackDialogCopy('sign_in').intent, 'success')
  assert.match(getManualTrackDialogCopy('sign_in').hint, /arrived/i)
})

test('manual tracking copy makes sign-out explicit', () => {
  assert.equal(getManualTrackDialogCopy('sign_out').badge, 'Sign Out')
  assert.equal(getManualTrackDialogCopy('sign_out').intent, 'danger')
  assert.match(getManualTrackDialogCopy('sign_out').hint, /left/i)
})

test('manual tracking submit label follows selected action', () => {
  assert.equal(getManualTrackSubmitLabel('sign_in'), 'Sign In Visitor')
  assert.equal(getManualTrackSubmitLabel('sign_out'), 'Sign Out Visitor')
})

test('manual tracking action meta returns backend signed_in flag', () => {
  assert.equal(getManualTrackActionMeta('sign_in').signedIn, true)
  assert.equal(getManualTrackActionMeta('sign_out').signedIn, false)
})
