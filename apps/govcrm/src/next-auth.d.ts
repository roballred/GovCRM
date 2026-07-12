// @govcore/auth 0.5 moved the next-auth Session/JWT augmentation to an opt-in
// subpath (it used to be ambient). Import it once so `session.user` carries
// `id`/`role`/`organizationId`/`instanceRole` across the app.
import '@govcore/auth/next-auth'
