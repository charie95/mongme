"use client";
import { useParams, useRouter } from "next/navigation";
import { useDreamStore } from "../../../stores/dreamStore";
import { useEffect } from "react";
import Link from "next/link";

// 상단 네비게이션 스타일
const TopNav = {
  position: "absolute" as const,
  top: "2.2rem",
  right: "3.3rem",
  display: "flex",
  gap: "0.7rem",
};

const NavBtnStyle = {
  background: "#b6bcf8",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "0.67rem 1.6rem",
  fontWeight: 600,
  fontSize: "1.02rem",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(164, 180, 255, 0.07)",
  transition: "background 0.16s",
  textDecoration: "none" as const,
};

export default function DreamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dream = useDreamStore((state) => state.dreams.find((d) => d.id === id));

  // id가 잘못된 경우 자동 이동 처리 (선택)
  useEffect(() => {
    if (!dream) {
      // 1초 후 리스트로 이동
      setTimeout(() => router.push("/dreams"), 1000);
    }
  }, [dream, router]);

  if (!dream)
    return (
      <div style={{ maxWidth: 400, margin: "4rem auto", textAlign: "center" }}>
        <h2>😢 꿈을 찾을 수 없습니다.</h2>
        <p>목록으로 돌아갑니다...</p>
      </div>
    );

  return (
    <>
      {/* 상단 네비게이션 */}
      <div style={TopNav}>
        <Link href="/" style={NavBtnStyle}>
          홈
        </Link>
        <Link href="/dreams" style={NavBtnStyle}>
          꿈 리스트
        </Link>
      </div>

      {/* 상세 페이지 내용 */}
      <div style={{ maxWidth: 500, margin: "3rem auto", padding: "0 1rem" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "1.3rem",
            boxShadow: "0 2px 16px rgba(140,170,210,0.09)",
            padding: "2rem 1.6rem",
          }}
        >
          <div
            style={{
              fontSize: 21,
              fontWeight: 700,
              color: "#24355c",
              marginBottom: 12,
              wordBreak: "break-all",
            }}
          >
            {dream.content}
          </div>
          <div style={{ fontSize: 13, color: "#9ca7c0", marginBottom: 24 }}>
            {new Date(dream.createdAt).toLocaleString()}
          </div>

          {/* 해몽결과 */}
          {dream.dreamResult && (
            <div
              style={{
                background: "#f3f6fd",
                padding: "1.1rem",
                borderRadius: "1.1rem",
                marginBottom: 14,
                fontSize: 16,
                color: "#4a6299",
                lineHeight: 1.7,
                fontWeight: 500,
              }}
            >
              <b>꿈의 의미</b> <br />
              {dream.dreamResult}
            </div>
          )}

          {/* 태그 뱃지 */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {dream.dreamType && (
              <span
                style={{
                  background: "#e7f1fa",
                  color: "#377ae0",
                  padding: "4px 14px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                {dream.dreamType}
              </span>
            )}
            {dream.emotionTags?.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#fae7f5",
                  color: "#d243a8",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontWeight: 500,
                  fontSize: 13,
                }}
              >
                {tag}
              </span>
            ))}
            {dream.categoryTags?.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#eafbe5",
                  color: "#41b764",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontWeight: 500,
                  fontSize: 13,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
