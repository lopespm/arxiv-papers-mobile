import type { ArticleId, ArticleIdHash, ArticleLinkPdf } from '../articles/article';

export type PaperId = ArticleId;

export type QueuedPaper = {|
    +link: ArticleLinkPdf,
    +id: ArticleId,
    +idHash: ArticleIdHash,
|};

export type ReceivedPaper = {|
    +path: string,
    +id: ArticleId,
    +idHash: ArticleIdHash,
|};