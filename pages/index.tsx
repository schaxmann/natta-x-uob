import useWindowDimensions from "@/hooks/useWindowDimension";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import useScrollSnap from "react-use-scroll-snap";

interface Props {
  spin: boolean;
  straight: boolean;
}

interface Dimensions {
  height: number | undefined;
  width: number | undefined;
}

interface DivProps extends Props, Dimensions {}

export const Container = styled.div<Dimensions>`
  height: ${(dimensions) => dimensions.height && `${dimensions.height}px`};
  width: ${(dimensions) =>
    dimensions.width && `${dimensions.width * 0.99222222}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  position: absolute;
`;

const ContainerTwo = styled.div<Dimensions>`
  height: ${(dimensions) => dimensions.height && `${dimensions.height}px`};
  width: ${(dimensions) => dimensions.width && `${dimensions.width * 0.992}px`};
  top: ${(dimensions) => dimensions.height && `${dimensions.height * 3}px`};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CompatControls = styled.div`
  width: 200px;
  height: 72.669322708px;
  background-image: url("CompatControls.png");
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "indivisible-variable";
  font-variation-settings: "wght" 500;
`;

const CompatCards = styled.img`
  padding-bottom: 30px;
  width: 225px;
  height: 320.424107144px;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "indivisible-variable";
  font-variation-settings: "wght" 500;
`;

const CompatWord = styled.p`
  position: relative;
  top: -24px;
  font-size: 16px;
`;

const ContainerThree = styled(ContainerTwo)<Dimensions>`
  top: ${(dimensions) => dimensions.height && `${dimensions.height}px`};
`;

const ContainerFour = styled(ContainerTwo)<Dimensions>`
  top: ${(dimensions) => dimensions.height && `${dimensions.height * 2}px`};
`;

const ContainerFive = styled(ContainerTwo)<Dimensions>`
  top: ${(dimensions) => dimensions.height && `${dimensions.height * 4}px`};
`;

export const TicketDiv = styled.div<DivProps>`
  height: ${(dimensions) =>
    dimensions.height && `${dimensions.height * 0.8}px`};
  width: ${(dimensions) =>
    dimensions.height && `${dimensions.height * 0.8 * 0.48473282441}px`};
  transform-style: preserve-3d;
  transition: all 0.8s ease;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${(props) => props.spin && "rotateY(180deg)"};
  @media (max-width: 500px) {
    margin-top: 20px;
  }
  /* :hover {
    transform: rotateY(180deg);
  } */
`;

export const ParaDiv = styled.div<Dimensions>`
  width: ${(dimensions) => dimensions.width && `${dimensions.width * 0.75}px`};
  position: absolute;
  color: white;
  padding-bottom: 0px;
`;

const FeedbackDiv = styled.div<Dimensions>`
  width: ${(dimensions) => dimensions.width && `${dimensions.width * 0.75}px`};
  position: absolute;
  color: white;
  padding-bottom: 0px;
`;

const CompatDiv = styled.div<Dimensions>`
  width: ${(dimensions) => dimensions.width && `${dimensions.width * 0.75}px`};
  position: absolute;
  color: white;
  padding-bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
`;

export const NattaTitle = styled.h2`
  font-family: "Roc-Grotesk-Variable";
  font-variation-settings: "wdth" 125, "wght" 600;
  font-size: 40px;
  line-height: 127%;
  padding: 0;
  margin: 0;
  /* margin-top: 40px;
  margin-bottom: 10px; */
`;

export const TealSpan = styled.span`
  color: #3eae93;
`;

export const Subtitle = styled.h3`
  font-family: "Roc-Grotesk-Variable";
  font-variation-settings: "wdth" 125, "wght" 700;
  font-size: 18px;
  padding: 0;
  margin: 0;
  padding-top: 25px;
`;

export const FeedbackTitle = styled(Subtitle)`
  padding-top: 0px;
`;

export const Para = styled.p`
  font-family: "indivisible-variable";
  font-variation-settings: "wght" 400;
  font-size: 18px;
  line-height: 127%;
`;

export const LastPara = styled(Para)`
  margin: 0;
`;

export const Footer = styled.p`
  font-family: "Roc-Grotesk-Variable";
  font-variation-settings: "wdth" 125, "wght" 500;
  color: white;
  position: absolute;
  bottom: 0;
  font-size: 10px;
`;

export const TicketImage = styled.img<Props>`
  height: 100%;
  width: 100%;
  position: absolute;
  backface-visibility: hidden;
  transform: rotate(4deg);
  transition: all 0.8s ease;
  transform: ${(props) => props.spin && "rotate(0deg)"};
  outline: 1px solid transparent;
`;

export const BackTicketImage = styled.div<Props>`
  outline: 1px solid transparent;
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
  font-size: 1.8vh;
  width: 70%;
  height: 10%;
  background-color: black;
  color: white;
  border: solid 2px white;
  border-radius: 4px;
  margin: 0;
  padding: 0;
  padding-left: 1.5vh;
  padding-top: 0.4vh;
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

export const Feedback = styled.textarea`
  font-family: "indivisible-variable";
  font-variation-settings: "wght" 400;
  font-size: 1.8vh;
  width: 93%;
  height: 100px;
  background-color: black;
  color: white;
  border: solid 2px white;
  border-radius: 4px;
  margin: 0;
  padding: 0;
  padding-left: 5px;
  padding-top: 5px;
  margin-top: 20px;
  align-self: center;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: gray;
    padding: 0;
    margin: 0;
  }
`;

export const TopTitle = styled.h3`
  font-family: "indivisible-variable";
  font-variation-settings: "wght" 550;
  font-size: 2vh;
  margin: 0;
  padding: 3vh 10px 10px 2.7vh;
  line-height: 127%;
`;

export const Number = styled(Name)`
  margin-top: 0;
`;

export const DetailTitle = styled.h2`
  font-size: 2.5vh;
  margin: 0;
  padding: 2.5vh 10px 0 0;
  width: 70%;
  align-self: center;
`;

export const FriendDetailTitle = styled(DetailTitle)`
  padding-top: 4.5vh;
  line-height: 1.5;
`;

const SubmitButton = styled.button`
  font-family: "indivisible-variable";
  font-variation-settings: "wght" 500;
  background-color: black;
  width: 26%;
  height: 100%;
  background-color: black;
  color: white;
  border: solid 2px white;
  border-radius: 4px;
  margin: 0;
  padding: 0;
  padding: 0;
  padding-left: 1.5vh;
  padding-top: 0.4vh;
  padding-right: 1px;
  font-size: 1.8vh;
  text-align: left;
  box-sizing: content-box;
`;

const FeedbackButton = styled.button`
  font-family: "indivisible-variable";
  font-variation-settings: "wght" 500;
  background-color: black;
  height: 35px;
  background-color: black;
  color: white;
  border: solid 2px white;
  border-radius: 4px;
  margin: 0;
  padding: 0;
  padding-left: 1.5vh;
  padding-right: 1.5vh;
  padding-top: 0.4vh;
  margin-top: 30px;
  font-size: 1.8vh;
  text-align: left;
  box-sizing: content-box;
  display: block;
`;

const SubmitDiv = styled.div`
  width: 75%;
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

const DimensionsDiv = styled.div<Dimensions>`
  position: absolute;
  top: 0px;
  left: 10px;
  color: white;
  background-color: red;
  height: ${(dimensions) =>
    dimensions.height && `${dimensions.height * 0.9}px`};
`;

const CompatSub = styled(Para)`
  font-family: "Roc-Grotesk-Variable";
  font-variation-settings: "wdth" 125, "wght" 400;
  font-size: 16px;
  position: relative;
`;

const CompatTitle = styled(FeedbackTitle)`
  font-size: 24px;
  position: relative;
  top: 30px;
`;

const VideoTemp = styled.img<Dimensions>`
  width: ${(dimensions) =>
    dimensions.height && `${dimensions.height * 0.8 * 0.48206979542}px`};
  height: ${(dimensions) =>
    dimensions.height && `${dimensions.height * 0.8}px`};
`;

const Landing: NextPage = () => {
  const [spin, setSpin] = useState(false);
  const [straight, setStraight] = useState(false);
  const { width, height } = useWindowDimensions();
  const scrollRef = useRef(null);
  useScrollSnap({ ref: scrollRef, duration: 100, delay: 50 });

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
    <div ref={scrollRef}>
      <Container height={height} width={width}>
        <TicketDiv
          spin={spin}
          straight={straight}
          height={height}
          width={width}
        >
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
                <GreenSpan>134 remaining</GreenSpan>
              </TopTitle>
              <DetailTitle>Your details:</DetailTitle>
              <Name type="text" placeholder="Full Name"></Name>
              <Number type="tel" placeholder="Phone Number"></Number>
              <SubmitDiv>
                <SubmitButton>Submit</SubmitButton>
              </SubmitDiv>
            </FormDiv>
            <FormDiv>
              <FriendDetailTitle>
                Your Friend&rsquo;s details:
              </FriendDetailTitle>
              <Name type="text" placeholder="Full Name"></Name>
              <Number type="tel" placeholder="Phone Number"></Number>
              <SubmitDiv>
                <SubmitButton>Submit</SubmitButton>
              </SubmitDiv>
            </FormDiv>
          </BackTicketImage>
        </TicketDiv>
        {/* <DimensionsDiv height={height} width={width}>
          {width} x {height}
        </DimensionsDiv> */}
        {/* <ParaDiv
          spin={spin}
          straight={straight}
          height={height}
          width={width}
        ></ParaDiv> */}
      </Container>
      <ContainerThree height={height} width={width}>
        <VideoTemp height={height} width={width} src="VideoDiv.png" />
      </ContainerThree>
      <ContainerFour height={height} width={width}>
        {" "}
        <CompatDiv height={height} width={width}>
          <CompatTitle>Compatitibility Test</CompatTitle>
          <CompatSub>Are you a match for natta?</CompatSub>
          <CompatCards src="CompatCards.png" />
          <CompatControls>
            <CompatWord>Swipe left or right</CompatWord>
          </CompatControls>
          {/* <Para>Are you a match for natta?</Para>
          <Para>Swipe left or right</Para> */}
        </CompatDiv>
      </ContainerFour>
      <ContainerTwo height={height} width={width}>
        <ParaDiv height={height} width={width}>
          <NattaTitle>
            natta <TealSpan>x</TealSpan> UoB
          </NattaTitle>
          <Subtitle>What's the deal?</Subtitle>
          <Para>
            If you&rsquo;ve chosen to study in Brum, you must have exquisite
            taste...
          </Para>
          <Para>
            We&rsquo;d like to borrow it to shape the best dating app in the
            world.
          </Para>
          <Subtitle>The goal</Subtitle>
          <Para>Our mission is to create your favourite dating app. </Para>
          <Para>
            But to do it, we need you to roast us; tell us all our flaws so we
            can do better.
          </Para>
          <Subtitle>The promise</Subtitle>
          <Para>
            In return, we promise to not stop refining and perfecting until
            we&rsquo;ve built the perfect app, especially for you.
          </Para>
          <LastPara>Literally you, reading this, right now.</LastPara>
        </ParaDiv>
      </ContainerTwo>
      <ContainerFive height={height} width={width}>
        <FeedbackDiv height={height} width={width}>
          <FeedbackTitle>Still Scrolling?</FeedbackTitle>
          <Para>
            If you&rsquo;ve got this far and think this sounds as shit as other
            dating apps, we&rsquo;d love to know why...
          </Para>
          <Feedback placeholder="This sounds shit because..."></Feedback>
          <Feedback placeholder="I would hate it less if..."></Feedback>
          <FeedbackButton>Submit</FeedbackButton>
        </FeedbackDiv>
        <Footer> © 2023 Natta Chat Ltd</Footer>
      </ContainerFive>
      {/* <LogoutButton onClick={handleSpin}> Spin Dat Shit</LogoutButton> */}
      {/* <SeconButton onClick={handleStraighten}>Straighten Dat Shit</SeconButton> */}
    </div>
  );
};

export default Landing;
