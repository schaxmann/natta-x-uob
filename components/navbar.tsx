// /** @format */

// import { AcceptButton, Menu, Para, Wrapper, ButtonPara } from "./navbar.styles";
// import { IoTicketOutline } from "react-icons/io5";

// export default function NavBar() {
//   const handleLogout = async (e: any) => {
//     e.preventDefault();
//     // if (e.target.classList.contains("sign-in")) {
//     //   router.push("/sign-in");
//     // }
//     // if (e.target.classList.contains("sign-up")) {
//     //   router.push("/sign-up");
//     // }
//     // if (e.target.classList.contains("logout") && user) {
//     //   try {
//     //     await logOut();
//     //     router.push("/");
//     //   } catch (err) {
//     //     console.log(err);
//     //   }
//     // }
//   };

//   return (
//     <Wrapper>
//       <Para>natta</Para>
//       <a>
//         <AcceptButton style={{ alignSelf: "flex-end" }}>
//           {" "}
//           <IoTicketOutline /> <ButtonPara>Accept Invite</ButtonPara>
//         </AcceptButton>
//       </a>
//       {/* <LogoutButton onClick={handleLogout} className="sign-in" type="submit">
//         Sign In
//       </LogoutButton>
//       <LogoutButton onClick={handleLogout} className="sign-up" type="submit">
//         Sign Up
//       </LogoutButton> */}
//     </Wrapper>
//   );
// }
