export const DREAM_TYPES = [
  "길몽",
  "흉몽",
  "경고몽",
  "예지몽",
  "반몽",
  "일상몽",
] as const;

export function getDreamPrompt(input: string): string {
  const asKeyword = input.split(",").length > 1 && input.length < 40;
  const typesStr = DREAM_TYPES.map((t) => `"${t}"`).join(", ");

  if (asKeyword) {
    return `
아래 키워드로 대표되는 꿈을 해몽 형식으로 분석해줘.
반드시 아래 형태로 답변해.
- dreamResult: (해몽 내용, 최대 200자)
- dreamType: ${typesStr} 중 1개
- emotionTags: 감정 키워드 배열(예: ["기쁨"])
- categoryTags: 주제 키워드 배열(예: ["동물"])
- situationTags: 상황 키워드 배열(예: ["바다"])

아래와 같은 **JSON** 형태로만 반환해줘.  
예시:
{
  "dreamResult": "이 꿈은 새로움을 의미하고 긍정적인 변화를 예고합니다.",
  "dreamType": "길몽",
  "emotionTags": ["기쁨"],
  "categoryTags": ["동물"],
  "situationTags": ["바다"]
}

키워드: ${input.trim()}
    `.trim();
  }
  return `
아래는 사용자가 꾼 꿈의 전체 내용이야. 심리적 해석과 상징, 조언을 해몽처럼 알려줘.
반드시 아래 형태로 답변해.
- dreamResult: (해몽 내용, 최대 200자)
- dreamType: ${typesStr} 중 1개
- emotionTags: 감정 키워드 배열(예: ["불안"])
- categoryTags: 주제 키워드 배열(예: ["학교"])
- situationTags: 상황 키워드 배열(예: ["밤"])

아래와 같은 **JSON** 형태로만 반환해줘.  
예시:
{
  "dreamResult": "이 꿈은 스트레스를 의미할 수 있으며 휴식이 필요함을 시사합니다.",
  "dreamType": "흉몽",
  "emotionTags": ["불안"],
  "categoryTags": ["학교"],
  "situationTags": ["밤"]
}

꿈 내용: ${input.trim()}
  `.trim();
}
