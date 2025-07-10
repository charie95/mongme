"use client";

import DreamInputModal from "../components/DreamInputModal";
import { useUIStore } from "../stores/uiStore";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgb(224, 255, 246),
    rgb(230, 238, 255) 70%
  );
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 1rem;
  font-family: "Pretendard", "SUIT", sans-serif;
`;

const SubTitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2.5rem;
`;

const Button = styled.button`
  font-size: 1.25rem;
  padding: 1rem 3.2rem;
  background: rgb(255, 143, 143);
  color: #fff;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  transition: background 0.2s;
  &:hover {
    background: rgb(189, 255, 102);
  }
`;

const TopNav = styled.nav`
  position: absolute;
  top: 2.2rem;
  right: 3.3rem;
`;

const NavBtn = styled.button`
  background: #a5b4fc;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.7rem 1.7rem;
  font-weight: 600;
  font-size: 1.02rem;
  cursor: pointer;
  box-shadow: 0 3px 16px rgba(164, 180, 255, 0.07);
  transition: background 0.16s;
  &:hover {
    background: #91a6ee;
  }
`;

export default function Home() {
  const openModal = useUIStore((state) => state.openModal);
  const router = useRouter();

  return (
    <Wrapper>
      <TopNav>
        <NavBtn onClick={() => router.push("/dreams")}>꿈 일기장 이동</NavBtn>
      </TopNav>
      <Title>MongMe</Title>
      <SubTitle>나의 꿈을 기록하고, AI로 해몽받는 감성 일기장</SubTitle>
      <Button onClick={openModal}>꿈풀이하기</Button>
      <DreamInputModal />
    </Wrapper>
  );
}
