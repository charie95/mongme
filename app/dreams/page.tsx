"use client";
import { useDreamStore } from "../../stores/dreamStore";
import DreamCard from "../../components/DreamCard";

export default function DreamsPage() {
  const dreams = useDreamStore((state) => state.dreams);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "3rem auto",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem" }}>나의 꿈 일기장</h2>
      {dreams.length === 0 ? (
        <div>아직 기록된 꿈이 없습니다.</div>
      ) : (
        dreams
          .slice()
          .reverse()
          .map((dream) => <DreamCard key={dream.id} dream={dream} />)
      )}
    </div>
  );
}
