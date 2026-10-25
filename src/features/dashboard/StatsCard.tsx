import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type StatsCardProps = {
  title?: string,
  children: React.ReactNode,
};

// Shared shell for the dashboard cards: accent top border + title.
export default function StatsCard({ title, children }: StatsCardProps) {
  return (
    <Paper sx={{ borderTop: 4, borderTopColor: 'secondary.main' }}>
      {title && (
        <Typography variant="h6" color="primary" sx={{ px: 2, pt: 2 }}>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
}
