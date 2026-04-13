export const MANUAL_TRACK_ACTIONS = ['sign_in', 'sign_out']

const ACTION_META = Object.freeze({
  sign_in: {
    signedIn: true,
    badge: 'Sign In',
    intent: 'success',
    title: 'Register arrival',
    hint: 'Use this when the visitor has arrived and needs a manual check-in.',
    submitLabel: 'Sign In Visitor',
    successLabel: 'signed in',
  },
  sign_out: {
    signedIn: false,
    badge: 'Sign Out',
    intent: 'danger',
    title: 'Register departure',
    hint: 'Use this when the visitor has left and needs a manual check-out.',
    submitLabel: 'Sign Out Visitor',
    successLabel: 'signed out',
  },
})

export function getManualTrackActionMeta(action) {
  return ACTION_META[action] || ACTION_META.sign_in
}

export function getManualTrackDialogCopy(action) {
  const meta = getManualTrackActionMeta(action)
  return {
    badge: meta.badge,
    intent: meta.intent,
    title: meta.title,
    hint: meta.hint,
  }
}

export function getManualTrackSubmitLabel(action) {
  return getManualTrackActionMeta(action).submitLabel
}
