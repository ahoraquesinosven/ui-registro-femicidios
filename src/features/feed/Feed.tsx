import BlockIcon from "@mui/icons-material/Block";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { FeedItem, FeedItemState } from "@/api/aqsnv/feed";
import {
  assignFeedItem,
  completeFeedItem,
  fetchFeedItems,
  markIrrelevantFeedItem,
  unassignFeedItem,
  uncompleteFeedItem,
  unmarkIrrelevantFeedItem,
} from "@/api/aqsnv/feed";
import { BlockLoader } from "@/components/Loading";
import UserAvatar from "@/components/UserAvatar";

type FeedItemMutationFn = (feedItemId: number) => Promise<void>;
function createFeedItemMutationHook(
  fn: FeedItemMutationFn,
  invalidateQueries: string[],
) {
  return () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: fn,
      onSuccess: () => {
        invalidateQueries.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: ["feed", key] });
        });
      },
    });
  };
}

const useAssignFeedItemMutation = createFeedItemMutationHook(assignFeedItem, [
  "backlog",
  "inProgress",
]);

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
  return useInfiniteQuery({
    queryKey: ["feed", state],
    queryFn: ({ pageParam }) => fetchFeedItems(state, 5, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}

function FeedItemActionGroup({ children }: { children: React.ReactNode }) {
  return (
    <ButtonGroup orientation="vertical" variant="contained" fullWidth>
      {children}
    </ButtonGroup>
  );
}

type FeedItemButtonsProps = {
  item: FeedItem;
};
function BacklogFeedItemButtons({ item }: FeedItemButtonsProps) {
  const assignMutation = useAssignFeedItemMutation();
  const markIrrelevantMutation = useMarkIrrelevantFeedItemMutation();

  const isMutating =
    assignMutation.isPending || markIrrelevantMutation.isPending;

  return (
    <FeedItemActionGroup>
      <Button
        color="primary"
        href={item.link}
        target="_blank"
        startIcon={<SearchIcon />}
        onClick={() => {
          if (!assignMutation.isPending) {
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
        onClick={() => {
          markIrrelevantMutation.mutate(item.id);
        }}
      >
        Irrelevante
      </Button>
    </FeedItemActionGroup>
  );
}

function InProgressFeedItemButtons({ item }: FeedItemButtonsProps) {
  const unassignMutation = useUnassignFeedItemMutation();
  const completeMutation = useCompleteFeedItemMutation();

  const isMutating = completeMutation.isPending || unassignMutation.isPending;

  return (
    <FeedItemActionGroup>
      <Button
        color="success"
        startIcon={<CheckCircleIcon />}
        loading={isMutating}
        onClick={() => {
          completeMutation.mutate(item.id);
        }}
      >
        Revisado
      </Button>
      <Button
        color="secondary"
        startIcon={<CancelIcon />}
        loading={isMutating}
        onClick={() => {
          unassignMutation.mutate(item.id);
        }}
      >
        Pendiente
      </Button>
    </FeedItemActionGroup>
  );
}

function DoneFeedItemButtons({ item }: FeedItemButtonsProps) {
  const uncompleteMutation = useUncompleteFeedItemMutation();

  return (
    <FeedItemActionGroup>
      <Button
        color="secondary"
        startIcon={<CancelIcon />}
        loading={uncompleteMutation.isPending}
        onClick={() => {
          uncompleteMutation.mutate(item.id);
        }}
      >
        Volver a revisar
      </Button>
    </FeedItemActionGroup>
  );
}

function IrrelevantDoneFeedItemButtons({ item }: FeedItemButtonsProps) {
  const unmarkIrrelevantMutation = useUnmarkIrrelevantFeedItemMutation();

  return (
    <FeedItemActionGroup>
      <Button
        color="secondary"
        startIcon={<CancelIcon />}
        loading={unmarkIrrelevantMutation.isPending}
        onClick={() => {
          unmarkIrrelevantMutation.mutate(item.id);
        }}
      >
        Volver a pendiente
      </Button>
    </FeedItemActionGroup>
  );
}

type FeedItemCardProps = {
  item: FeedItem;
};

function FeedItemCard({ item }: FeedItemCardProps) {
  return (
    <Card sx={{ mb: 1 }}>
      {item.assignedUser && (
        <CardHeader
          avatar={<UserAvatar user={item.assignedUser} showName />}
          sx={{ pb: 0 }}
        />
      )}
      <CardContent sx={{ pt: "0.5em" }}>
        <Link
          variant="subtitle1"
          gutterBottom
          href={item.link}
          target="_blank"
          sx={{ fontWeight: "bold" }}
        >
          {item.title}
        </Link>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {new Intl.DateTimeFormat("es").format(new Date(item.publishedAt))} -{" "}
          {item.feed.name}
        </Typography>
        {!item.assignedUser && <BacklogFeedItemButtons item={item} />}
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
  name: string;
  status: FeedItemState;
};

function FeedList({ name, status }: FeedListProps) {
  const query = useFeedQuery(status);
  const { hasNextPage, isFetching, fetchNextPage } = query;
  const scrollRootRef = useRef(null);
  const observerTarget = useRef(null);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) {
      return;
    }

    // Measure against the scrollable list container (not the viewport) so the
    // sentinel triggers when the user reaches the bottom of the internally
    // scrolled list, regardless of where the container sits on the page.
    // Re-observing on state change re-fires if the sentinel is still visible
    // after a page loads.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      { root: scrollRootRef.current },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetching, fetchNextPage]);

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Paper
        ref={scrollRootRef}
        sx={{
          p: 1,
          maxHeight: "100vh",
          overflowY: "auto",
          backgroundColor: "#e2e3e5",
        }}
      >
        <Typography variant="h5" sx={{ my: 2 }}>
          {name} ({query.data?.pages[0]?.total})
        </Typography>
        {!query.data || (query.isFetching && !query.isFetchingNextPage) ? (
          <BlockLoader />
        ) : (
          query.data.pages
            .flatMap((page) => page.page)
            .map((item) => <FeedItemCard key={item.id} item={item} />)
        )}
        {query.isFetchingNextPage && <BlockLoader />}
        {/* Sentinel for infinite scroll. Needs real height (not 0): at the very
            bottom of the scroll container the last sub-pixel can't be reached,
            so a 0/1px target's intersection ratio rounds to 0 and the observer
            never fires. */}
        <Box ref={observerTarget} sx={{ height: 10 }} />
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
