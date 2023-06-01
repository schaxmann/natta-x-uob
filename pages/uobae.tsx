/** @format */

import { useEffect, useRef, useState, useCallback } from "react";
import type { NextPage } from "next";
import { useDrag } from "react-use-gesture";
import { swing } from "react-scrollchor";
import Deck from "@/components/Deck";
import swipe from "../animations/swipe-right.json";
import useWindowDimensions from "@/hooks/useWindowDimension";
import {
  AcceptButton,
  Menu,
  Wrapper,
  ButtonPara,
  NavPara,
} from "../components/navbar.styles";
import { IoTicketOutline } from "react-icons/io5";
import {
  AnimationDiv,
  BackTicketImage,
  Chevron,
  CompatDiv,
  CompatSub,
  CompatTitle,
  Container,
  DeckContainer,
  DetailTitle,
  Feedback,
  FeedbackButton,
  FeedbackDiv,
  FeedbackTitle,
  Footer,
  FooterDiv,
  FormDiv,
  FriendDetailTitle,
  GreenSpan,
  LastPara,
  LearnMore,
  LearnMoreText,
  Name,
  NattaTitle,
  Number,
  Para,
  ParaDiv,
  StyledScrollchor,
  SubmitButton,
  SubmitDiv,
  Subtitle,
  SuccessIcon,
  SuccessTitle,
  SuccessTitleTwo,
  SwipeAnimation,
  TealSpan,
  TicketDiv,
  TicketImage,
  TopTitle,
  VideoTemp,
  FeedbackSuccessIcon,
} from "../styles/index.styles";
import {
  createDoc,
  createFeedbackDoc,
  getInvites,
  inviteUpdate,
} from "@/utils/firestore";
import Script from "next/script";

const Landing: NextPage = () => {
  const [spin, setSpin] = useState(false);
  const [straight, setStraight] = useState(false);
  const { width, height } = useWindowDimensions();
  const scrollRef = useRef(null);
  // useScrollSnap({ ref: scrollRef, duration: 100, delay: 50 });
  const [animation, setAnimation] = useState(true);
  const [selfSubmitted, SetSelfSubmitted] = useState(false);
  const [otherSubmitted, SetOtherSubmitted] = useState(false);
  const [yourName, setYourName] = useState("");
  const [yourNumber, setYourNumber] = useState("");
  const [friendName, setFriendName] = useState("");
  const [friendNumber, setFriendNumber] = useState("");
  const [feedbackOne, setFeedbackOne] = useState("");
  const [feedbackTwo, setFeedbackTwo] = useState("");
  const [feedbackSubmitted, SetFeedbackSubmitted] = useState(false);
  const [tickets, setTickets] = useState(239);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const minSwipeDistance = 10;

  useEffect(() => {
    const fetchTickets = async () => {
      return await getInvites();
    };

    fetchTickets().then((result) => {
      if (result) setTickets(result.remaining);
    });
  }, []);

  const handleSpin = useCallback(() => {
    setSpin((prev) => !prev);
    setStraight(false);
    setAnimation(false);
  }, []);

  //   const onNameChanged = useCallback((e: { target: { value: string } }) => {
  //     setYourName(e.target.value);
  //   }, []);

  //   const submit = useCallback(() => {
  //     SetOtherSubmitted(true);
  //   }, []);

  const selfSubmit = (e: any) => {
    e.preventDefault();
    if (yourName && yourNumber) {
      createDoc({ firstName: yourName, tel: yourNumber, submittedBy: "self" });
      inviteUpdate();
    }
    SetSelfSubmitted(true);
    setTickets(tickets - 1);
  };

  const friendSubmit = (e: any) => {
    e.preventDefault();
    if (friendName && friendNumber) {
      createDoc({
        firstName: friendName,
        tel: friendNumber,
        submittedBy: "friend",
      });
      inviteUpdate();
    }
    SetOtherSubmitted(true);
    setTickets(tickets - 1);
  };

  const handleFeedback = (e: any) => {
    e.preventDefault();
    if (feedbackOne || feedbackTwo) {
      createFeedbackDoc({ badBecause: feedbackOne, improveBy: feedbackTwo });
      SetFeedbackSubmitted(true);
    }
  };

  useEffect(() => {
    if (spin) {
      setStraight(true);
    }
  }, [spin]);

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      if (mx) {
        handleSpin();
      }
    }
  );

  const handleAccept = () => {
    setSpin(true);
    setAnimation(false);
  };

  return (
    <div ref={scrollRef}>
      <Wrapper>
        <NavPara>natta</NavPara>
        <StyledScrollchor
          to="ticket"
          animate={{ duration: 800, easing: swing }}
        >
          <AcceptButton
            style={{ alignSelf: "flex-end" }}
            onClick={handleAccept}
          >
            <IoTicketOutline /> <ButtonPara>Accept Invite</ButtonPara>
          </AcceptButton>
        </StyledScrollchor>
      </Wrapper>
      <Container height={height} width={width} id="ticket">
        {animation && (
          <AnimationDiv
            // {...bind()}
            // onDragEnd={() => handleSpin()}
            // onTouchMove={() => handleSpin()}
            // onTouchEnd={() => handleSpin()}
            onTouchStart={(e) => {
              setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
              setTouchStart(e.targetTouches[0].clientX);
            }}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={() => {
              if (!touchStart || !touchEnd) return;
              const distance = touchStart - touchEnd;
              const isLeftSwipe = distance > minSwipeDistance;
              const isRightSwipe = distance < -minSwipeDistance;
              if (isLeftSwipe || isRightSwipe) handleSpin();
            }}
          >
            <SwipeAnimation
              animationData={swipe}
              // {...bind()}
              // onDragEnd={() => handleSpin()}
              // onTouchMove={() => handleSpin()}
              // onTouchEnd={() => handleSpin()}
              onTouchStart={(e) => {
                setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
                setTouchStart(e.targetTouches[0].clientX);
              }}
              onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
              onTouchEnd={() => {
                if (!touchStart || !touchEnd) return;
                const distance = touchStart - touchEnd;
                const isLeftSwipe = distance > minSwipeDistance;
                const isRightSwipe = distance < -minSwipeDistance;
                if (isLeftSwipe || isRightSwipe) handleSpin();
              }}
            />
          </AnimationDiv>
        )}
        <TicketDiv
          spin={spin}
          straight={straight}
          height={height}
          width={width}
          // {...bind()}
          // onDragEnd={() => handleSpin()}
          // onTouchMove={() => handleSpin()}
          // onTouchEnd={() => handleSpin()}
          onTouchStart={(e) => {
            setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
            setTouchStart(e.targetTouches[0].clientX);
          }}
          onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
          onTouchEnd={() => {
            if (!touchStart || !touchEnd) return;
            const distance = touchStart - touchEnd;
            const isLeftSwipe = distance > minSwipeDistance;
            const isRightSwipe = distance < -minSwipeDistance;
            if (isLeftSwipe || isRightSwipe) handleSpin();
          }}
        >
          <TicketImage
            spin={spin}
            straight={straight}
            src="img/front-ticket-main.png"
          />
          <BackTicketImage spin={spin} straight={straight} {...bind()}>
            {selfSubmitted ? (
              <FormDiv>
                <TopTitle>
                  Your spot is reserved
                  <GreenSpan>{tickets} remaining</GreenSpan>
                </TopTitle>
                <SuccessTitle>
                  We think we might like like you, {yourName}.
                </SuccessTitle>
                <SuccessIcon src="img/success.png" />
              </FormDiv>
            ) : (
              <FormDiv>
                <TopTitle>
                  Reserve your spot
                  <GreenSpan> {tickets} remaining</GreenSpan>
                </TopTitle>
                <DetailTitle>Your details:</DetailTitle>
                <Name
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setYourName(e.target.value)}
                ></Name>
                <Number
                  type="tel"
                  placeholder="Phone Number"
                  onChange={(e) => setYourNumber(e.target.value)}
                ></Number>
                <SubmitDiv>
                  <SubmitButton onClick={(e) => selfSubmit(e)}>
                    Submit
                  </SubmitButton>
                </SubmitDiv>
              </FormDiv>
            )}
            {otherSubmitted ? (
              <FormDiv>
                <SuccessTitleTwo>
                  Let&rsquo;s fly to Vegas and get married!
                </SuccessTitleTwo>
                <SuccessIcon src="img/success.png" />
              </FormDiv>
            ) : (
              <FormDiv>
                <FriendDetailTitle>
                  Your Friend&rsquo;s details:
                </FriendDetailTitle>
                <Name
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setFriendName(e.target.value)}
                ></Name>
                <Number
                  type="tel"
                  placeholder="Phone Number"
                  onChange={(e) => setFriendNumber(e.target.value)}
                ></Number>
                <SubmitDiv>
                  <SubmitButton onClick={(e) => friendSubmit(e)}>
                    Submit
                  </SubmitButton>
                </SubmitDiv>
              </FormDiv>
            )}
          </BackTicketImage>
        </TicketDiv>
        <LearnMore>
          <StyledScrollchor
            to="learn-more"
            animate={{ duration: 800, easing: swing }}
          >
            <LearnMoreText>Learn</LearnMoreText>
            <Chevron src="img/chevron.png" alt="chevron" />
            more
          </StyledScrollchor>
        </LearnMore>
      </Container>
      <Container height={height} width={width} id="learn-more">
        {/* <VideoTemp height={height} width={width} src="img/VideoDiv.png" /> */}
        <div
          className="muse-video-player"
          data-video="ddmSstq"
          data-search="0"
          data-links="0"
          data-logo="0"
          data-title="0"
          data-coverplayposition="center"
          data-width="576"
        ></div>
        <Script src="https://muse.ai/static/js/embed-player.min.js"></Script>
      </Container>
      <Container height={height} width={width}>
        <CompatDiv height={height} width={width}>
          <CompatTitle>Compatitibility Test</CompatTitle>
          <CompatSub>Are you a match for natta?</CompatSub>
          <div style={{ height: "360px", width: "400px" }}></div>
          <Deck />
        </CompatDiv>
      </Container>
      <Container height={height} width={width}>
        <ParaDiv height={height} width={width}>
          <NattaTitle>
            natta <TealSpan>x</TealSpan> UoB
          </NattaTitle>
          <Subtitle>What&rsquo;s the deal?</Subtitle>
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
      </Container>
      <Container height={height} width={width}>
        <FeedbackDiv height={height} width={width}>
          <FeedbackTitle>Still Scrolling?</FeedbackTitle>
          <Para>
            If you&rsquo;ve got this far and think this sounds as shit as other
            dating apps, we&rsquo;d love to know why...
          </Para>
          <Feedback
            placeholder="This sounds shit because..."
            onChange={(e) => setFeedbackOne(e.target.value)}
          ></Feedback>
          <Feedback
            placeholder="I would hate it less if..."
            onChange={(e) => setFeedbackTwo(e.target.value)}
          ></Feedback>
          {!feedbackSubmitted ? (
            <FeedbackButton onClick={(e) => handleFeedback(e)}>
              Submit
            </FeedbackButton>
          ) : (
            <FeedbackSuccessIcon src="img/success.png" />
          )}
        </FeedbackDiv>
      </Container>
      <FooterDiv>
        <Footer> © 2023 Natta Chat Ltd</Footer>
      </FooterDiv>
    </div>
  );
};

export default Landing;
