import Post from '@/pages/Post'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/post/$id')({
  component: Post,
})
