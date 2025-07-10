import styled from "styled-components";
import { useState } from "react";
import { useUIStore } from "../stores/uiStore";
import { useDreamStore } from "../stores/dreamStore";
import { fetchDreamResult } from "../utils/fetchDreamResult";
import { getDreamPrompt } from "../utils/getDreamPrompt";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(32, 38, 62, 0.14);
  backdrop-filter: blur(2.5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const Modal = styled.div`
  background: #fff;
  border-radius: 1.6rem;
  box-shadow: 0 8px 32px rgba(109, 119, 179, 0.12);
  padding: 2.2rem 2.2rem 1.7rem 2.2rem;
  width: 100%;
  max-width: 410px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: stretch;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 1.13rem;
  color: #1d2235;
  margin-bottom: 0.7rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 94px;
  resize: none;
  font-size: 1.04rem;
  border-radius: 1.1rem;
  border: 1.5px solid #e7eafe;
  background: #f6f8ff;
  padding: 1.05rem 1rem;
  transition: border 0.15s;
  &:focus {
    border: 1.7px solid #9cb7ff;
    background: #fff;
    outline: none;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 0.7rem;
  justify-content: flex-end;
`;

const Button = styled.button<{ secondary?: boolean }>`
  font-size: 1.04rem;
  padding: 0.77rem 1.9rem;
  border: none;
  border-radius: 1.15rem;
  background: ${({ secondary }) => (secondary ? "#f4f6fa" : "#8fbcff")};
  color: ${({ secondary }) => (secondary ? "#4e5a76" : "#fff")};
  font-weight: 600;
  box-shadow: ${({ secondary }) =>
    secondary ? "none" : "0 2px 8px rgba(144,174,255,0.13)"};
  cursor: pointer;
  transition: background 0.18s, color 0.13s;
  &:hover {
    background: ${({ secondary }) => (secondary ? "#e9e9f7" : "#74a8f7")};
    color: ${({ secondary }) => (secondary ? "#222" : "#fff")};
  }
`;

export default function DreamInputModal() {
  const { isModalOpen, closeModal } = useUIStore();
  const addDream = useDreamStore((state) => state.addDream);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // ← 로딩 상태 추가

  if (!isModalOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setLoading(true);

    // 프롬프트 생성
    const prompt = getDreamPrompt(trimmed);

    // fetchDreamResult로 AI 결과 받아오기
    const aiResult = await fetchDreamResult(prompt);
    setLoading(false);

    const now = new Date().toISOString();
    const id = Date.now().toString();
    // Dream 타입에 맞게 저장
    addDream({
      id,
      content: trimmed,
      createdAt: now,
      ...aiResult, // dreamResult, luckyType2, emotionTags, categoryTags, situationTags
    });

    setInput("");
    closeModal();
  }

  return (
    <Overlay>
      <Modal>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="dreamInput">꿈내용을 입력해주세요.</Label>
          <TextArea
            id="dreamInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="꿈의 내용이나 키워드를 입력하세요. (예: 하늘을 나는 꿈, 물에 빠지는 꿈 등)"
            required
            disabled={loading}
          />
          <BtnWrap>
            <Button type="button" onClick={closeModal} disabled={loading}>
              취소
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "꿈풀이 중..." : "꿈풀이 하기"}
            </Button>
          </BtnWrap>
        </form>
      </Modal>
    </Overlay>
  );
}
