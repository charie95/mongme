import styled from "styled-components";
import { useState } from "react";
import { useUIStore } from "../stores/uiStore";
import { useDreamStore } from "../stores/dreamStore";
import { fetchDreamResult } from "../utils/fetchDreamResult";
import { getDreamPrompt } from "../utils/getDreamPrompt";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(25, 28, 40, 0.33);
  backdrop-filter: blur(4.5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: rgba(32, 35, 47, 0.94); /* 진한 그레이 투명+몽환 */
  border-radius: 2.2rem;
  box-shadow: 0 12px 38px 0 rgba(20, 20, 38, 0.38), 0 1px 0 #36394a44 inset;
  padding: 3.4rem 2.7rem 2.6rem 2.7rem;
  width: 100%;
  max-width: 500px;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: stretch;
  border: 1.5px solid rgba(80, 90, 110, 0.19);
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 1.21rem;
  color: #e2e5ef;
  letter-spacing: 0.01em;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 8px #23243866;
  text-align: center;
  display: block;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 116px;
  resize: none;
  font-size: 1.09rem;
  border-radius: 1.35rem;
  border: 1.3px solid #40424d;
  background: rgba(42, 46, 60, 0.92);
  color: #e2e5f3;
  padding: 1.18rem 1.1rem;
  box-shadow: 0 2px 13px 0 rgba(16, 20, 32, 0.11);
  outline: none;
  margin-bottom: 0.4rem;
  transition: border 0.2s, background 0.21s;
  &::placeholder {
    color: #8e90a2;
    opacity: 0.95;
    font-size: 1.02rem;
    font-style: italic;
  }
  &:focus {
    border: 1.4px solid #7c81b2;
    background: rgba(48, 52, 68, 0.98);
  }
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "secondary",
})<{ secondary?: boolean }>`
  font-size: 1.07rem;
  padding: 1.01rem 2.6rem;
  border: none;
  border-radius: 1.25rem;
  background: ${({ secondary }) =>
    secondary
      ? "rgba(40, 44, 60, 0.92)"
      : "linear-gradient(96deg, #282c38 13%, #43485c 95%)"};
  color: ${({ secondary }) => (secondary ? "#bbbfd3" : "#eaeaf6")};
  font-weight: 600;
  box-shadow: ${({ secondary }) =>
    secondary ? "none" : "0 2px 12px 0 rgba(44,52,80,0.16)"};
  cursor: pointer;
  transition: background 0.18s, color 0.14s, box-shadow 0.18s;
  letter-spacing: 0.02em;

  &:hover {
    background: ${({ secondary }) =>
      secondary
        ? "rgba(44, 48, 66, 1)"
        : "linear-gradient(96deg, #4b5164 18%, #636aa0 100%)"};
    color: #fff;
    box-shadow: 0 4px 24px 0 #23253b5b;
  }
  &:active {
    box-shadow: 0 1px 2px #191929;
    background: ${({ secondary }) =>
      secondary
        ? "rgba(52, 55, 77, 1)"
        : "linear-gradient(90deg, #31334a 20%, #36394c 100%)"};
  }
  &:disabled {
    opacity: 0.58;
    cursor: not-allowed;
  }
`;

export default function DreamInputModal() {
  const { isModalOpen, closeModal } = useUIStore();
  const addDream = useDreamStore((state) => state.addDream);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    toast.success("🌙 꿈이 저장되었습니다!");

    // **1.2초 후 페이지 이동**
    setTimeout(() => {
      router.push("/dreams");
    }, 1200);
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
            <Button
              type="button"
              onClick={closeModal}
              disabled={loading}
              secondary
            >
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
