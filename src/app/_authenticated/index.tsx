import { createFileRoute } from '@tanstack/react-router';
import FeedIndex from '@/routes/feed/Index';

export const Route = createFileRoute('/_authenticated/')({
  component: FeedIndex,
});
