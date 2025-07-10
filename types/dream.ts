export type DreamType =
  | "길몽"
  | "흉몽"
  | "경고몽"
  | "예지몽"
  | "반몽"
  | "일상몽";

export interface Dream {
  id: string; // 고유 식별자
  content: string; // 꿈 내용/키워드
  createdAt: string; // 기록 시각(ISO)
  dreamResult?: string; // AI 해몽 결과
  dreamType?: DreamType; // 꿈타입 분류
  emotionTags?: string[]; // 감정 태그들
  categoryTags?: string[]; // 카테고리 태그들
  situationTags?: string[]; // 상황 태그들
}
