import {useInfiniteQuery, useMutation, useQueryClient} from 'react-query';
import {useRef, useEffect, Fragment} from 'react';
import UserAvatar from '@/components/UserAvatar';
import {BlockLoader} from '@/components/Loading';
import MutatingButton from '@/components/MutatingButton';
import Icon from '@/components/Icon';
import {useAccessToken} from '@/hooks/auth';
import {FeedItem, FeedItemState, fetchFeedItems, assignFeedItem, unassignFeedItem, completeFeedItem, uncompleteFeedItem, markIrrelevantFeedItem, unmarkIrrelevantFeedItem} from '@/api/aqsnv/feed';

function useAssignFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => assignFeedItem(accessToken, feedItemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["feed", "backlog"]);
      queryClient.invalidateQueries(["feed", "inProgress"]);
    },
  });
}

function useUnassignFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => unassignFeedItem(accessToken, feedItemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["feed", "backlog"]);
      queryClient.invalidateQueries(["feed", "inProgress"]);
    },
  });
}

function useCompleteFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => completeFeedItem(accessToken, feedItemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["feed", "inProgress"]);
      queryClient.invalidateQueries(["feed", "done"]);
    },
  });
}

function useUncompleteFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => uncompleteFeedItem(accessToken, feedItemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["feed", "done"]);
      queryClient.invalidateQueries(["feed", "inProgress"]);
    },
  });
}

function useFeedQuery(state: FeedItemState) {
  const accessToken = useAccessToken();
  return useInfiniteQuery({
    queryKey: ["feed", state],
    queryFn: ({pageParam}) => fetchFeedItems(accessToken, state, 5, pageParam),
    getNextPageParam: (lastPage) => lastPage.next,
  });
}

function useMarkIrrelevantFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => markIrrelevantFeedItem(accessToken, feedItemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["feed", "backlog"]);
      queryClient.invalidateQueries(["feed", "done"]);
    },
  });
}

function useUnmarkIrrelevantFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => unmarkIrrelevantFeedItem(accessToken, feedItemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["feed", "backlog"]);
      queryClient.invalidateQueries(["feed", "done"]);
    },
  });
}

type FeedItemButtonsProps = {
  item: FeedItem,
}

export function BacklogFeedItemButtons({item}: FeedItemButtonsProps) {
  const assignMutation = useAssignFeedItemMutation();
  const markIrrelevantMutation = useMarkIrrelevantFeedItemMutation();

  const isMutating = assignMutation.isLoading || markIrrelevantMutation.isLoading;

  return (
    <>
    <a
      className="card-link btn btn-primary"
      href={item.link}
      target='_blank'
      onClick={() => {
        if (!assignMutation.isLoading) {
          assignMutation.mutate(item.id);
        }
      }}>
      <Icon icon="binoculars" />
      Revisar
    </a>
    <MutatingButton
      className='btn btn-danger'
      disabled={isMutating}
      onClick={() => {markIrrelevantMutation.mutate(item.id)}}>
      <Icon icon="x-square" />
      Irrelevante
    </MutatingButton>
    </>
  );
}

export function InProgressFeedItemButtons({item}: FeedItemButtonsProps) {
  const unassignMutation = useUnassignFeedItemMutation();
  const completeMutation = useCompleteFeedItemMutation();

  const isMutating = completeMutation.isLoading || unassignMutation.isLoading;

  return (
    <>
      <MutatingButton
        className='btn btn-success'
        disabled={isMutating}
        onClick={() => {completeMutation.mutate(item.id)}}>
        <Icon icon="check-circle-fill" />
        Revisado
      </MutatingButton>
      <MutatingButton
        className='btn btn-secondary'
        disabled={isMutating}
        onClick={() => {unassignMutation.mutate(item.id)}}>
        <Icon icon="x-circle-fill" />
        Pendiente
      </MutatingButton>
    </>
  );
}

export function DoneFeedItemButtons({item}: FeedItemButtonsProps) {
  const uncompleteMutation = useUncompleteFeedItemMutation();

  return (
    <MutatingButton
      className='btn btn-secondary'
      disabled={uncompleteMutation.isLoading}
      onClick={() => {uncompleteMutation.mutate(item.id)}}>
      <Icon icon="x-circle-fill" />
      Volver a revisar
    </MutatingButton>
  );
}

export function IrrelevantDoneFeedItemButtons({item}: FeedItemButtonsProps) {
  const unmarkIrrelevantMutation = useUnmarkIrrelevantFeedItemMutation();

  return (
    <MutatingButton
      className='btn btn-secondary'
      disabled={unmarkIrrelevantMutation.isLoading}
      onClick={() => {unmarkIrrelevantMutation.mutate(item.id)}}>
      <Icon icon="x-circle-fill" />
      Volver a pendiente
    </MutatingButton>
  );
}

type FeedItemCardProps = {
  item: FeedItem,
};

export function FeedItemCard({item}: FeedItemCardProps) {
  return (
    <div className="card mb-2">
      {item.assignedUser && (
        <div className="card-header">
          <UserAvatar user={item.assignedUser} showName />
        </div>
      )}
      <div className="card-body">
        <h3 className="card-title h5 mb-3">
          {item.title}
        </h3>
        <h4 className="card-subtitle h6 text-body-secondary mb-3">
          {new Intl.DateTimeFormat('es').format(new Date(item.publishedAt))} - {item.feed.name}
        </h4>
        <div className="btn-group w-100">
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
          <a className="card-link btn btn-outline-secondary" href={item.link} target='_blank' title="Ver artículo">
            <Icon icon="box-arrow-up-right" />
          </a>
        </div>
      </div>
    </div>
  );
}

type FeedListProps = {
  name: string,
  status: FeedItemState,
};

export function FeedList({name, status}: FeedListProps) {
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
    <div className="col my-2" style={{ maxHeight: "100vh", }}>
      <div className="p-1 bg-secondary-subtle rounded h-100 overflow-y-auto">
        <h2 className='h4 my-4'>
          {name} ({query.data?.pages[0]?.total})
        </h2>
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
        <div ref={observerTarget}></div>
      </div>
    </div>
  )
}

export default function FeedIndex() {
  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3">
          <FeedList name="Pendientes" status="backlog" />
          <FeedList name="En revisión" status="inProgress" />
          <FeedList name="Revisadas" status="done" />
        </div>
      </div>
    </>
  );
}

