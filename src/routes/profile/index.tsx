import { ProfileAdmin } from '@/pages/ProfileAdmin'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/')({
  component: ProfileAdmin,
})
