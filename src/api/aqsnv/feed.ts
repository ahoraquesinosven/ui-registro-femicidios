import config from "@/config/config";
import {authorizedRequest} from "@/utils/http";

const endpoints = {
  feedItems: () => new URL("/v1/feed/items", config.api.aqsnv.server),
  feedItemAssignment: (feedItemId: number) => new URL(`/v1/feed/items/${feedItemId}/assignment`, config.api.aqsnv.server),
  feedItemCompletion: (feedItemId: number) => new URL(`/v1/feed/items/${feedItemId}/completion`, config.api.aqsnv.server),
  feedItemIrrelevant: (feedItemId: number) => new URL(`/v1/feed/items/${feedItemId}/irrelevant`, config.api.aqsnv.server),
};

export type FeedItem = {
  id: number,
  feed: {
    id: string,
    name: string,
    updatedAt: string,
  },
  publishedAt: string,
  title: string,
  link: string,
  isDone: boolean,
  isIrrelevant: boolean,
  assignedUser?: {
    name: string,
    email: string,
    pictureUrl: string,
  },
};

export type FeedItemPages = {
  limit: number,
  total: number,
  page: [FeedItem],
  next: string,
};

export type FeedItemState = "backlog" | "inProgress" | "done";

export async function fetchFeedItems(state: FeedItemState, limit?: number, start?: string): Promise<FeedItemPages> {
  const url = new URL(endpoints.feedItems());
  url.searchParams.append("status", state);
  if (limit) {
    url.searchParams.append("limit", limit.toString());
  }
  if (start) {
    url.searchParams.append("start", start);
  }
  const response = await authorizedRequest(url);

  return response.json();
}

export async function assignFeedItem(feedItemId: number): Promise<void> {
  await authorizedRequest(endpoints.feedItemAssignment(feedItemId), {method: 'post'});
}

export async function unassignFeedItem(feedItemId: number): Promise<void> {
  await authorizedRequest(endpoints.feedItemAssignment(feedItemId), {method: 'delete'});
}

export async function completeFeedItem(feedItemId: number): Promise<void> {
  await authorizedRequest(endpoints.feedItemCompletion(feedItemId), {method: 'post'});
}

export async function uncompleteFeedItem(feedItemId: number): Promise<void> {
  await authorizedRequest(endpoints.feedItemCompletion(feedItemId), {method: 'delete'});
}

export async function markIrrelevantFeedItem(feedItemId: number): Promise<void> {
  await authorizedRequest(endpoints.feedItemIrrelevant(feedItemId), {method: 'post'});
}

export async function unmarkIrrelevantFeedItem(feedItemId: number): Promise<void> {
  await authorizedRequest(endpoints.feedItemIrrelevant(feedItemId), {method: 'delete'});
}
