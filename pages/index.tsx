import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

interface Props {
  spin: boolean;
  straight: boolean;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

export const TicketDiv = styled.div<Props>`
  height: 80vh;
  width: 38.778625953vh;
  transform-style: preserve-3d;
  transition: all 0.8s ease;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${(props) => props.spin && "rotateY(180deg)"};
  /* :hover {
    transform: rotateY(180deg);
  } */
`;

export const TicketImage = styled.img<Props>`
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transform: rotate(4deg);
  transition: all 0.8s ease;
  transform: ${(props) => props.spin && "rotate(0deg)"};
`;

export const BackTicketImage = styled.div<Props>`
  height: 100%;
  width: 100%;
  background-image: url("ticketOutline.png");
  background-size: contain;
  position: absolute;
  color: white;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.8s ease;
  transform: rotateY(180deg) rotate(4deg);
  transform: ${(props) => props.spin && "rotateY(180deg) rotate(4deg)"};
  ${(props) =>
    props.straight &&
    css`
      transition: all 0.3s ease 0.5s;
      transform: rotateY(180deg) rotate(0deg);
    `};
`;

export const LogoutButton = styled.button`
  position: absolute;
  font-family: "Roc-Grotesk-Variable";
  font-variation-settings: "wdth" 125, "wght" 700;
  font-size: 20px;
  color: black;
  background-color: white;
  padding: 5px;
  padding-top: 7px;
  border-radius: 5px;
  width: 200px;
  border: 0;
  height: 40px;
  transition-duration: 0.1s;
  :hover {
    background-color: #3eae93;
    cursor: pointer;
    color: black;
    // text-decoration: underline;
  }
  margin-top: 200px;
  z-index: 10;
`;

export const SeconButton = styled(LogoutButton)`
  margin-top: 400px;
`;

export const FormDiv = styled.div`
  font-family: "Roc-Grotesk-Variable";
  font-variation-settings: "wdth" 125, "wght" 700;
  font-size: 20px;
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4%;
`;

export const Name = styled.input`
  font-family: "indivisible-variable";
  font-variation-settings: "wght" 500;
  font-size: 16px;
  width: 70%;
  height: 10%;
  background-color: black;
  color: white;
  border: solid 2px white;
  border-radius: 4px;
  margin: 0;
  padding: 0;
  align-self: center;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: white;
    padding: 0;
    margin: 0;
  }
`;

export const TopTitle = styled.h3`
  font-family: "indivisible-variable";
  font-variation-settings: "wght" 550;
  font-size: 1.4vw;
  margin: 0;
  padding: 1.5vw 10px 5px 1.8vw;
`;

export const Number = styled(Name)`
  margin-top: 0;
`;

export const DetailTitle = styled.h2`
  font-size: 1.4vw;
  margin: 0;
  padding: 1.2vw 10px 5px 0;
  width: 70%;
  align-self: center;
`;

const SubmitButton = styled.button`
  font-family: "indivisible-variable";
  font-variation-settings: "wght" 500;
  background-color: black;
  width: 50%;
  height: 100%;
  background-color: black;
  color: white;
  border: solid 2px white;
  border-radius: 4px;
  margin: 0;
  padding: 0;
  font-size: 16px;
  text-align: left;
  box-sizing: content-box;
`;

const SubmitDiv = styled.div`
  width: 70%;
  height: 10%;
  align-self: center;
  padding: 0;
  margin: 0;
`;

export const GreenSpan = styled.span`
  color: #3eae93;
  font-variation-settings: "wght" 400;
  display: block;
  margin: 0;
  padding-top: 0.4vw;
`;

const Landing: NextPage = () => {
  const [spin, setSpin] = useState(false);
  const [straight, setStraight] = useState(false);

  const handleSpin = (e: any) => {
    console.log(spin);
    setSpin(!spin);
    setStraight(false);
  };

  useEffect(() => {
    console.log(spin, "<= SpinState");
    if (spin) {
      setStraight(true);
    }
  }, [spin]);

  return (
    <>
      <Container>
        <TicketDiv spin={spin} straight={straight}>
          <TicketImage
            onClick={handleSpin}
            spin={spin}
            straight={straight}
            src="MainTicket.png"
          />
          <BackTicketImage spin={spin} onClick={handleSpin} straight={straight}>
            <FormDiv>
              <TopTitle>
                Reserve your spot
                <GreenSpan>634 remaining</GreenSpan>
              </TopTitle>
              <DetailTitle>Your details:</DetailTitle>
              <Name type="text" placeholder="Full Name"></Name>
              <Number type="tel" placeholder="Phone Number"></Number>
              <SubmitDiv>
                <SubmitButton>Submit</SubmitButton>
              </SubmitDiv>
            </FormDiv>
            <FormDiv> Your friend's details:</FormDiv>
          </BackTicketImage>
        </TicketDiv>
      </Container>
      {/* <LogoutButton onClick={handleSpin}> Spin Dat Shit</LogoutButton> */}
      {/* <SeconButton onClick={handleStraighten}>Straighten Dat Shit</SeconButton> */}
    </>
  );
};

export default Landing;
