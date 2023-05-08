import React, { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import styled, { css } from "styled-components";

import styles from "../pages/styles.module.css";
import { SubmitButton } from "@/pages";

const cards = [
  "card10.png",
  "card9.png",
  "card8.png",
  "card7.png",
  "card6.png",
  "card5.png",
  "card4.png",
  "card3.png",
  "card2.png",
  "card1.png",
];

const CompatDotDiv = styled.div`
  height: 50px;
  width: 150px;
  position: absolute;
  justify-self: center;
  align-self: center;
  top: 580px;
  display: flex;
  gap: 16px;
  align-content: center;
  justify-content: center;
`;

const WhiteDot = styled.img`
  height: 12px;
  width: 12px;
  opacity: 0.4;
`;

const AgainButton = styled.button`
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
  height: 27px;
  width: 35%;
  text-align: center;
  padding: 0;
  padding-top: 2px;
  border-radius: 8px;
  margin: 0;
  position: absolute;
  bottom: 25px;
  font-size: 12px;
  :hover {
    background-color: hsla(360, 100%, 100%, 0.1);
    cursor: pointer;
  }
`;

export const MatchIcon = styled.img`
  height: 40px;
  width: 40px;
  position: absolute;
  top: 28px;
`;

export const NoMatchIcon = styled.img`
  height: 40px;
  width: 40px;
  position: absolute;
  top: 48px;
`;

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -8,
  scale: 1,
  rot: 0,
  delay: i * 100,
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
  const [complete, setComplete] = useState(false);
  const [outcome, setOutcome] = useState(true);
  const [circle1, setCircle1] = useState(1);
  const [circle2, setCircle2] = useState(0.2);
  const [circle3, setCircle3] = useState(0.2);
  const [circle4, setCircle4] = useState(0.2);
  const [circle5, setCircle5] = useState(0.2);

  let likes = 0;
  let dislikes = 0;

  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) {
        if (index === 8) {
          setCircle1(0.2);
          setCircle2(1);
        }
        if (index === 6) {
          setCircle2(0.2);
          setCircle3(1);
        }
        if (index === 4) {
          setCircle3(0.2);
          setCircle4(1);
        }
        if (index === 2) {
          setCircle4(0.2);
          setCircle5(1);
        }
        if (index === 0) {
          setCircle5(0.2);
        }
        if ((index % 2 === 0 && dir === 1) || (index % 2 === 1 && dir === -1)) {
          likes++;
        } else {
          dislikes++;
        }
        gone.add(index);
      } // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length) {
        if (likes > dislikes || likes === dislikes) {
          setOutcome(true);
        } else {
          setOutcome(false);
        }
        setComplete(true);
        likes = 0;
        dislikes = 0;
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
      }
    }
  );
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {complete && (
        <div className={styles.outcome}>
          {outcome ? (
            <>
              <MatchIcon src="match.png" />
              <h2 className={styles.yesheader}>We were made for each other!</h2>
              <h4 className={styles.yessubheader}>
                When can we meet your parents?
              </h4>
            </>
          ) : (
            <>
              <NoMatchIcon src="failure.png" />
              <h2 className={styles.header}>It's not us, it's you...</h2>
              <h4 className={styles.subheader}> You may need clinical help.</h4>
            </>
          )}
          <AgainButton
            onClick={(e) => {
              setComplete(false);
              setCircle1(1);
            }}
          >
            Try Again
          </AgainButton>
        </div>
      )}
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className={styles.deck} key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            style={{
              backgroundColor: "white",
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
            }}
          />
        </animated.div>
      ))}
      <CompatDotDiv>
        <WhiteDot src="circle.png" style={{ opacity: circle1 }} />
        <WhiteDot src="circle.png" style={{ opacity: circle2 }} />
        <WhiteDot src="circle.png" style={{ opacity: circle3 }} />
        <WhiteDot src="circle.png" style={{ opacity: circle4 }} />
        <WhiteDot src="circle.png" style={{ opacity: circle5 }} />
      </CompatDotDiv>
    </>
  );
}

export default Deck;
