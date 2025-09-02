import Profile from '@/pages/Profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$id')({
  component: Profile,
})
