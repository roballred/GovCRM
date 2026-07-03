import { createRbac } from '@govcore/rbac'

// GovCRM's role/permission vocabulary — app-local, supplied to GovCore.
// Mirrors govEA's admin / contributor / viewer model.
export const rbac = createRbac({
  rolePermissions: {
    admin: ['content:read', 'content:write', 'users:manage'],
    contributor: ['content:read', 'content:write'],
    viewer: ['content:read'],
  },
  hierarchy: { admin: 3, contributor: 2, viewer: 1 },
})
