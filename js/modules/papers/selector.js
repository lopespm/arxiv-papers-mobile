// @flow
import type { State } from './reducer';
import type { ArticleId } from '../articles/article';

type Props = { +targetId?: ArticleId };

export const getDownloadedPapers = (state: State) => state.received;
export const getQueuedPapersForDownload = (state: State) => state.queued;
export const getPaperDownloadInFlightId = (state: State) => state.inFlightId;
export const getDownloadedPaperPath = (state: State, { targetId }: Props) => getDownloadedPapers(state).find(({ id }) => id === targetId).path;