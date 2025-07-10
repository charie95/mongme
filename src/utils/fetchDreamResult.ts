import type { DreamType } from "../types/dream";

// Dream에서 AI 해몽 결과 관련 필드만 Pick해서 타입 사용
export type DreamAIResult = {
  dreamResult: string;
  dreamType: DreamType;
  emotionTags?: string[];
  categoryTags?: string[];
  situationTags?: string[];
};

export async function fetchDreamResult(prompt: string): Promise<DreamAIResult> {
  let result: DreamAIResult = {
    dreamResult: "",
    dreamType: "일상몽",
    emotionTags: [],
    categoryTags: [],
    situationTags: [],
  };

  try {
    const res = await fetch("/api/dream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (content) {
      try {
        const parsed = JSON.parse(content);

        // dreamType이 정의된 값이 아니면 기본값 대입 (Typescript만 사용하는 경우는 생략 가능)
        const validTypes: DreamType[] = [
          "길몽",
          "흉몽",
          "경고몽",
          "예지몽",
          "반몽",
          "일상몽",
        ];
        let dreamType: DreamType = parsed.dreamType;
        if (!validTypes.includes(dreamType)) dreamType = "일상몽";

        result = {
          dreamResult: parsed.dreamResult || "",
          dreamType,
          emotionTags: parsed.emotionTags || [],
          categoryTags: parsed.categoryTags || [],
          situationTags: parsed.situationTags || [],
        };
      } catch {
        // 파싱 실패시 예외 처리
        result.dreamResult = "AI 결과를 읽을 수 없습니다.";
      }
    }
  } catch {
    result.dreamResult = "AI 해몽 결과를 받아오지 못했습니다.";
  }
  return result;
}
