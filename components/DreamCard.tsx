import Link from "next/link";
import { Dream } from "../types/dream";

type Props = {
  dream: Dream;
};

export default function DreamCard({ dream }: Props) {
  return (
    <Link href={`/dreams/${dream.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "1.2rem",
          boxShadow: "0 2px 14px rgba(150,170,210,0.07)",
          padding: "1.3rem 1.5rem",
          cursor: "pointer",
          marginBottom: "0.4rem",
          transition: "box-shadow 0.17s",
        }}
      >
        <div style={{ fontSize: 17, color: "#27355d", fontWeight: 600 }}>
          {dream.content.length > 30
            ? dream.content.slice(0, 30) + "..."
            : dream.content}
        </div>
        <div style={{ fontSize: 13, color: "#aab3ce", marginTop: 8 }}>
          {new Date(dream.createdAt).toLocaleString()}
        </div>
      </div>
    </Link>
  );
}
