import { createFileRoute } from '@tanstack/react-router';
import Users from '@/pages/Users';

export const Route = createFileRoute('/')({
  component: Users,
});

