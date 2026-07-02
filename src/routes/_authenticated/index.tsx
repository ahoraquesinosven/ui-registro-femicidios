import { createFileRoute } from '@tanstack/react-router';
import FeedIndex from '@/features/feed/Feed';

export const Route = createFileRoute('/_authenticated/')({
  head: () => ({
    meta: [{ title: 'Femicidios - Noticias' }],
  }),
  component: FeedIndex,
});
