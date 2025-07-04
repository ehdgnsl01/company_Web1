// src/models/portfolio.ts

/**
 * Portfolio document schema for Firestore
 */
export interface Portfolio {
  /** Firestore document ID */
  id: string;
  /** 프로젝트 제목 */
  title: string;
  /** YouTube URL */
  youtubeUrl: string;
  /** 썸네일 이미지 URL */
  thumbnailUrl: string;
  /** 등록 일자 */
  date: {
    /** Firestore Timestamp to Date conversion method */
    toDate: () => Date;
  };
  /** 클라이언트 이름 */
  client: string;
}
