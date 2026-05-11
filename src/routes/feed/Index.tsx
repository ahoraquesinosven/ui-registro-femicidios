import type {FeedItem, FeedItemState} from '@/api/aqsnv/feed';
import {assignFeedItem, completeFeedItem, fetchFeedItems, markIrrelevantFeedItem, unassignFeedItem, uncompleteFeedItem, unmarkIrrelevantFeedItem} from '@/api/aqsnv/feed';
import {BlockLoader} from '@/components/Loading';
import UserAvatar from '@/components/UserAvatar';
import {useAccessToken} from '@/hooks/auth';
import type {AccessToken} from '@/types/auth';
import BlockIcon from '@mui/icons-material/Block';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Fragment, useEffect, useRef} from 'react';
import {useInfiniteQuery, useMutation, useQueryClient} from 'react-query';

type FeedItemMutationFn = (accessToken: AccessToken, feedItemId: number) => Promise<void>;
function createFeedItemMutationHook(fn: FeedItemMutationFn, invalidateQueries: string[]) {
  return () => {
    const accessToken = useAccessToken();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (feedItemId: number) => fn(accessToken, feedItemId),
      onSuccess: () => {
        invalidateQueries.forEach((key) => {
          queryClient.invalidateQueries(["feed", key]);
        });
      },
    });
  }
}

const useAssignFeedItemMutation = createFeedItemMutationHook(
  assignFeedItem,
  ["backlog", "inProgress"],
);

const useUnassignFeedItemMutation = createFeedItemMutationHook(
  unassignFeedItem,
  ["backlog", "inProgress"],
);

const useCompleteFeedItemMutation = createFeedItemMutationHook(
  completeFeedItem,
  ["done", "inProgress"],
);

const useUncompleteFeedItemMutation = createFeedItemMutationHook(
  uncompleteFeedItem,
  ["done", "inProgress"],
);

const useMarkIrrelevantFeedItemMutation = createFeedItemMutationHook(
  markIrrelevantFeedItem,
  ["done", "backlog"],
);

const useUnmarkIrrelevantFeedItemMutation = createFeedItemMutationHook(
  unmarkIrrelevantFeedItem,
  ["done", "backlog"],
);

function useFeedQuery(state: FeedItemState) {
  const accessToken = useAccessToken();
  return useInfiniteQuery({
    queryKey: ["feed", state],
    queryFn: ({pageParam}) => fetchFeedItems(accessToken, state, 5, pageParam),
    getNextPageParam: (lastPage) => lastPage.next,
  });
}

function FeedItemActionGroup({children}: {children: React.ReactNode}) {
  return (
    <ButtonGroup orientation="vertical" variant='contained' fullWidth>
      {children}
    </ButtonGroup>
  );
}

type FeedItemButtonsProps = {
  item: FeedItem,
}
function BacklogFeedItemButtons({item}: FeedItemButtonsProps) {
  const assignMutation = useAssignFeedItemMutation();
  const markIrrelevantMutation = useMarkIrrelevantFeedItemMutation();

  const isMutating = assignMutation.isLoading || markIrrelevantMutation.isLoading;

  return (
    <FeedItemActionGroup>
      <Button
        color="primary"
        href={item.link}
        target="_blank"
        startIcon={<SearchIcon />}
        onClick={() => {
          if (!assignMutation.isLoading) {
            assignMutation.mutate(item.id);
          }
        }}
      >
        Revisar
      </Button>
      <Button
        color="error"
        startIcon={<BlockIcon />}
        loading={isMutating}
        onClick={() => {markIrrelevantMutation.mutate(item.id);}}
      >
        Irrelevante
      </Button>
    </FeedItemActionGroup>
  );
}

function InProgressFeedItemButtons({item}: FeedItemButtonsProps) {
  const unassignMutation = useUnassignFeedItemMutation();
  const completeMutation = useCompleteFeedItemMutation();

  const isMutating = completeMutation.isLoading || unassignMutation.isLoading;

  return (
    <FeedItemActionGroup>
      <Button
        color="success"
        startIcon={<CheckCircleIcon />}
        loading={isMutating}
        onClick={() => {completeMutation.mutate(item.id);}}
      >
        Revisado
      </Button>
      <Button
        color="secondary"
        startIcon={<CancelIcon />}
        loading={isMutating}
        onClick={() => {unassignMutation.mutate(item.id);}}
      >
        Pendiente
      </Button>
    </FeedItemActionGroup>
  );
}

function DoneFeedItemButtons({item}: FeedItemButtonsProps) {
  const uncompleteMutation = useUncompleteFeedItemMutation();

  return (
    <FeedItemActionGroup>
      <Button
        color="secondary"
        startIcon={<CancelIcon />}
        loading={uncompleteMutation.isLoading}
        onClick={() => {uncompleteMutation.mutate(item.id);}}
      >
        Volver a revisar
      </Button>
    </FeedItemActionGroup>
  );
}

function IrrelevantDoneFeedItemButtons({item}: FeedItemButtonsProps) {
  const unmarkIrrelevantMutation = useUnmarkIrrelevantFeedItemMutation();

  return (
    <FeedItemActionGroup>
      <Button
        color="secondary"
        startIcon={<CancelIcon />}
        loading={unmarkIrrelevantMutation.isLoading}
        onClick={() => {unmarkIrrelevantMutation.mutate(item.id);}}
      >
        Volver a pendiente
      </Button>
    </FeedItemActionGroup>
  );
}

type FeedItemCardProps = {
  item: FeedItem,
};

function FeedItemCard({item}: FeedItemCardProps) {
  return (
    <Card sx={{mb: 1}}>
      {item.assignedUser && (
        <CardHeader
          avatar={<UserAvatar user={item.assignedUser} showName />}
          sx={{pb: 0}}
        />
      )}
      <CardContent sx={{pt: "0.5em"}}>
        <Link variant="subtitle1" fontWeight="bold" gutterBottom href={item.link} target="_blank">
          {item.title} 
        </Link>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {new Intl.DateTimeFormat('es').format(new Date(item.publishedAt))} - {item.feed.name}
        </Typography>
        {!item.assignedUser && (
          <BacklogFeedItemButtons item={item} />
        )}
        {item.assignedUser && !item.isDone && (
          <InProgressFeedItemButtons item={item} />
        )}
        {item.isDone && !item.isIrrelevant && (
          <DoneFeedItemButtons item={item} />
        )}
        {item.isDone && item.isIrrelevant && (
          <IrrelevantDoneFeedItemButtons item={item} />
        )}
      </CardContent>
    </Card>
  );
}

type FeedListProps = {
  name: string,
  status: FeedItemState,
};

function FeedList({name, status}: FeedListProps) {
  const query = useFeedQuery(status);
  const observerTarget = useRef(null);

  useEffect(() => {
    const target = observerTarget.current;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && query.hasNextPage && !query.isFetching) {
          query.fetchNextPage();
        }
      },
      {threshold: 1},
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [query, observerTarget]);

  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{p: 1, maxHeight: '100vh', overflowY: 'auto', backgroundColor: "#e2e3e5"}}>
        <Typography variant="h5" sx={{my: 2}}>
          {name} ({query.data?.pages[0]?.total})
        </Typography>
        {!query.data || (query.isFetching && !query.isFetchingNextPage) ? (
          <BlockLoader />
        ) : (
          query.data.pages.map((page, i) => (
            <Fragment key={i}>
              {page.page.map((item) => (
                <FeedItemCard key={item.id} item={item} />
              ))}
            </Fragment>
          ))
        )}
        {query.isFetchingNextPage && (
          <BlockLoader />
        )}
        <Box ref={observerTarget} />
      </Paper>
    </Grid>
  );
}

export default function FeedIndex() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <FeedList name="Pendientes" status="backlog" />
        <FeedList name="En revisión" status="inProgress" />
        <FeedList name="Revisadas" status="done" />
      </Grid>
    </Container>
  );
}
