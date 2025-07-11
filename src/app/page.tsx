"use client";

import DreamInputModal from "../components/DreamInputModal";
import { useUIStore } from "../stores/uiStore";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";

// 웨이브 애니메이션
const wave = keyframes`
  0%, 100% { transform: translateY(0);}
  20% { transform: translateY(-10px);}
  40% { transform: translateY(7px);}
  60% { transform: translateY(-4px);}
  80% { transform: translateY(4px);}
`;

const BgVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  filter: grayscale(0.15) blur(2px) brightness(0.7);
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

// 타이틀 스타일
const TitleWrap = styled.div`
  text-align: center;
  min-height: 8.4rem;
  width: 100%;
  margin-bottom: 1.2rem;
  position: relative;
`;

const AnimatedTitle = styled.h1`
  font-size: 5.2rem;
  font-family: "Pretendard", "SUIT", sans-serif;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.04em;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 0.07em;
  transition: opacity 0.7s;
  line-height: 1.13;
`;

const WaveChar = styled.span<{ delay: number }>`
  display: inline-block;
  animation: ${wave} 2.2s cubic-bezier(0.44, 0.16, 0.41, 1.07) infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

const Fade = styled.div<{ show: boolean }>`
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.7s;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
`;

const SubTitle = styled.p`
  font-size: 1.18rem;
  color: rgb(222, 223, 226);
  margin-top: 0.2rem;
  margin-bottom: 2.9rem;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 8px #0002;
  line-height: 1.5;
`;

const Button = styled.button`
  font-size: 1.19rem;
  padding: 1.07rem 3.2rem;
  background: rgba(40, 40, 50, 0.75);
  color: #fff;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.19);
  backdrop-filter: blur(2px);
  transition: background 0.16s, box-shadow 0.13s, color 0.16s;

  &:hover {
    background: rgba(200, 200, 210, 0.19);
    color: #d2d6db;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
    letter-spacing: 0.03em;
  }
`;

const TopNav = styled.nav`
  position: absolute;
  top: 2.2rem;
  right: 3.3rem;
  z-index: 2;
`;

const NavBtn = styled.button`
  background: rgba(70, 72, 80, 0.45);
  color: #f8f8f8;
  border: none;
  border-radius: 999px;
  padding: 0.7rem 1.7rem;
  font-weight: 600;
  font-size: 1.02rem;
  cursor: pointer;
  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.09);
  backdrop-filter: blur(1px);
  transition: background 0.16s, color 0.13s;

  &:hover {
    background: rgba(160, 162, 170, 0.13);
    color: #ddd;
  }
`;

// ===== 타이틀 전환 + 웨이브 효과 =====
function MongMeTitle() {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowFirst(false), 1800); // 1.8초 뒤 전환
    return () => clearTimeout(timer);
  }, []);

  return (
    <TitleWrap>
      <Fade show={showFirst}>
        <AnimatedTitle>
          {"MongMe".split("").map((char, i) => (
            <WaveChar key={i} delay={i * 0.13}>
              {char}
            </WaveChar>
          ))}
        </AnimatedTitle>
      </Fade>
      <Fade show={!showFirst}>
        <AnimatedTitle>
          {"꿈의 의미 夢味".split("").map((char, i) => (
            <WaveChar key={i} delay={i * 0.12}>
              {char}
            </WaveChar>
          ))}
        </AnimatedTitle>
      </Fade>
    </TitleWrap>
  );
}

// ===== 메인 컴포넌트 =====
export default function Home() {
  const openModal = useUIStore((state) => state.openModal);
  const router = useRouter();

  return (
    <Wrapper>
      <BgVideo
        src="/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/fallback.jpg"
      >
        브라우저가 비디오 태그를 지원하지 않습니다.
      </BgVideo>
      <TopNav>
        <NavBtn onClick={() => router.push("/dreams")}>꿈 일기장 이동</NavBtn>
      </TopNav>
      <MongMeTitle />
      <SubTitle>나의 꿈을 기록하고, AI로 해몽받는 감성 일기장</SubTitle>
      <Button onClick={openModal}>꿈풀이하기</Button>
      <DreamInputModal />
    </Wrapper>
  );
}
