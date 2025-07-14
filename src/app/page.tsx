"use client";

import React, { useEffect, useState } from "react";
import DreamInputModal from "../components/DreamInputModal";
import { useUIStore } from "../stores/uiStore";
import { useRouter } from "next/navigation";
import styled, { keyframes, css } from "styled-components";

// 배경 비디오 스타일
const BgVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  filter: grayscale(0.13) blur(2.3px) brightness(0.74);

  @media (max-width: 600px) {
    filter: grayscale(0.18) blur(1.2px) brightness(0.75);
  }
`;

// 웨이브 효과 (CSS)
const wave = keyframes`
  0% { transform: translateY(0); }
  18% { transform: translateY(-8%); }
  37% { transform: translateY(7%);}
  55% { transform: translateY(-3%);}
  70% { transform: translateY(2%);}
  82% { transform: translateY(-1%);}
  100% { transform: translateY(0);}
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 0 1rem;
`;

const TitleWrap = styled.div`
  text-align: center;
  min-height: 8.4rem;
  width: 100%;
  margin-bottom: 1.2rem;
  position: relative;

  @media (max-width: 600px) {
    min-height: 4.2rem;
    margin-bottom: 0.7rem;
  }
`;

const AnimatedTitle = styled.h1<{ $show: boolean }>`
  font-size: 5.2rem;
  font-family: "Pretendard", "SUIT", sans-serif;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.04em;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 0.07em;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.8s;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  pointer-events: none;

  /* 모바일 대응 */
  @media (max-width: 600px) {
    font-size: 2.2rem;
    gap: 0.02em;
    min-width: unset;
  }
`;

const waveChar = css`
  display: inline-block;
  animation: ${wave} 2.8s infinite ease-in-out;
`;

const SubTitle = styled.p`
  font-size: 1.13rem;
  color: rgb(222, 223, 226);
  margin-top: 0.2rem;
  margin-bottom: 2.4rem;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 8px #0002;
  line-height: 1.5;

  @media (max-width: 600px) {
    font-size: 0.96rem;
    margin-bottom: 1.6rem;
  }
`;

const Button = styled.button`
  font-size: 1.12rem;
  padding: 1.07rem 3.2rem;
  background: rgba(40, 40, 50, 0.72);
  color: #fff;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.17);
  backdrop-filter: blur(2px);
  transition: background 0.16s, box-shadow 0.13s, color 0.16s;

  &:hover {
    background: rgba(200, 200, 210, 0.19);
    color: #d2d6db;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
    letter-spacing: 0.03em;
  }

  @media (max-width: 600px) {
    font-size: 0.98rem;
    padding: 0.8rem 1.7rem;
  }
`;

const TopNav = styled.nav`
  position: absolute;
  top: 2.2rem;
  right: 3.3rem;
  z-index: 2;

  @media (max-width: 600px) {
    top: 1rem;
    right: 1.2rem;
  }
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

  @media (max-width: 600px) {
    font-size: 0.91rem;
    padding: 0.55rem 1.1rem;
  }
`;

// 웨이브 효과가 들어간 글자 컴포넌트
const WaveChar = styled.span<{ delay: number }>`
  ${waveChar};
  animation-delay: ${({ delay }) => delay}s;
`;

const TITLES = [
  { text: "MongMe", wave: false },
  { text: "꿈의 의미 夢味", wave: true },
];

export default function Home() {
  const openModal = useUIStore((state) => state.openModal);
  const router = useRouter();

  // 애니메이션 상태
  const [showFirst, setShowFirst] = useState(true);

  // 타이틀 전환 (3초 간격)
  useEffect(() => {
    const timer = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // 타이틀을 웨이브효과 문자로 분리
  function renderTitle(str: string, withWave: boolean) {
    return str.split("").map((ch, i) =>
      withWave && ch !== " " ? (
        <WaveChar key={i} delay={i * 0.07}>
          {ch}
        </WaveChar>
      ) : (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: ch === " " ? "0.5em" : undefined,
          }}
        >
          {ch}
        </span>
      )
    );
  }

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
      <TitleWrap>
        <AnimatedTitle $show={showFirst}>
          {renderTitle(TITLES[0].text, TITLES[0].wave)}
        </AnimatedTitle>
        <AnimatedTitle $show={!showFirst}>
          {renderTitle(TITLES[1].text, TITLES[1].wave)}
        </AnimatedTitle>
      </TitleWrap>
      <SubTitle>나의 꿈을 기록하고, AI로 해몽받는 감성 일기장</SubTitle>
      <Button onClick={openModal}>꿈풀이하기</Button>
      <DreamInputModal />
    </Wrapper>
  );
}
