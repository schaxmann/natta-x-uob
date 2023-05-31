import {
  collection,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  addDoc,
  query,
  where,
  or,
  and,
  orderBy,
  OrderByDirection,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "@/config/firebase";

export const createDoc = async (userInfo: object) => {
  try {
    await addDoc(collection(db, "users"), userInfo);
    console.log("User info added!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const createFeedbackDoc = async (feedback: object) => {
  try {
    await addDoc(collection(db, "feedback"), feedback);
    console.log("Feedback added!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getInvites = async () => {
  const docRef = doc(db, "stats", "invites");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const inviteUpdate = async () => {
  const docRef = doc(db, "stats", "invites");
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  if (docData) {
    try {
      await updateDoc(doc(db, "stats", "invites"), {
        remaining: docData.remaining - 1,
      });
      console.log("Invite count updated!");
    } catch (e) {
      console.error("Error updating: ", e);
    }
  }
};

// export const checkUserDoc = async (user: any) => {
//   const docRef = doc(db, "users", user.uid);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     return true;
//   } else {
//     return false;
//   }
// };

// const backendInfo = {
//   nattaCount: 0,
//   nightCount: 0,
//   extendsRemaining: 3,
//   likesRemaining: 3,
//   subscribed: false,
//   matchesTotal: 0,
//   matchesLastNight: 0,
//   likesSentLastNight: 0,
//   lastLogin: serverTimestamp(),
//   reportsMade: 0,
//   reportsReceived: 0,
//   reported: false,
//   likedUsers: [],
// };

// export const modifyDoc = async (user: any, userInfo: object) => {
//   try {
//     await updateDoc(doc(db, "users", user.uid), userInfo);
//     await updateDoc(doc(db, "users", user.uid), backendInfo);
//     console.log("User doc updated!");
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };

// export const loginUpdate = async (user: any) => {
//   try {
//     await updateDoc(doc(db, "users", user.uid), {
//       lastLogin: serverTimestamp(),
//     });
//     console.log("Last login updated!");
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };

// export const rateChat = async (user: any, roomId) => {
//   try {
//     const userDocRef = doc(db, "users", user.uid);
//     const roomDocRef = doc(db, "rooms", roomId);
//     const userDocSnap = await getDoc(userDocRef);
//     const roomDocSnap = await getDoc(roomDocRef);
//     const otherUserUID = "";
//     if (userDocSnap.data() && roomDocSnap.data()) {
//       if (roomDocSnap.data().firstUserUID == user.uid) {
//         await updateDoc(userDocRef, {
//           likedUsers: [
//             ...userDocSnap.data().likedUsers,
//             roomDocSnap.data().secondUserUID,
//           ],
//         });
//       } else if (roomDocSnap.data().secondUserUID == user.uid) {
//         await updateDoc(userDocRef, {
//           likedUsers: [
//             ...userDocSnap.data().likedUsers,
//             roomDocSnap.data().firstUserUID,
//           ],
//         });
//       }
//       console.log("Like added!");
//     }
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };

// export const checkUserDoc = async (user: any) => {
//   const docRef = doc(db, "users", user.uid);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const getQuestion = async (question: string) => {
//   const docRef = doc(db, "questions", question);
//   const docSnap = await getDoc(docRef);
//   return docSnap.data();
// };

// export const writeQuestion = async (question: string, roomId) => {
//   const roomDocRef = doc(db, "rooms", roomId);
//   await updateDoc(roomDocRef, {
//     currentQuestion: question,
//   });
// };

// export const getName = async (user: any, roomId: string) => {
//   let otherUserName = "";
//   try {
//     const userDocRef = doc(db, "users", user.uid);
//     const roomDocRef = doc(db, "rooms", roomId);
//     const userDocSnap = await getDoc(userDocRef);
//     const roomDocSnap = await getDoc(roomDocRef);

//     if (roomDocSnap.data()!.firstUserUID == user.uid) {
//       otherUserName = roomDocSnap.data()!.firstUserName;
//     } else if (roomDocSnap.data()!.secondUserUID == user.uid) {
//       otherUserName = roomDocSnap.data()!.secondUserName;
//     }
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
//   console.log(otherUserName, "OTHER USER");
//   return otherUserName;
// };

// // export const getJoined = async (question: string) => {
// //   const docRef = doc(db, "questions", question);
// //   const docSnap = await getDoc(docRef);
// //   return docSnap.data();
// // };

// // export const setQuestions = async () => {
// //   let qNum = 4;
// //   for (let index = 1; index < 51; index++) {
// //     await setDoc(doc(db, "questions", `${index}`), {
// //       question: `This is Question ${index}`,
// //     });
// //   }
// // };

// export const createRoom = async (user: any) => {
//   console.log(user);
//   let returnInfo = { joined: "", roomId: "" };
//   try {
//     const docSnap = await getDoc(doc(db, "users", user.uid));
//     const userData = docSnap.data();
//     const roomsRef = collection(db, "rooms");

//     if (userData) {
//       // if(userData.seeking == "noPreference"){}

//       const prefQuery = query(
//         roomsRef,
//         and(
//           where("status", "==", "waiting"),
//           where("firstUserGender", "==", userData.seeking),
//           or(
//             where("firstUserSeeking", "==", userData.gender),
//             where("firstUserSeeking", "==", "noPreference")
//           )
//         ),
//         orderBy("started"),
//         limit(1)
//       );

//       // const noPrefQuery = query(
//       //   roomsRef,
//       //   or(where("firstUserSeeking", "==", userData.gender),
//       //   where("firstUserSeeking", "==", "noPreference")),
//       // );

//       let roomMatchDoc = "";

//       const querySnapshot = await getDocs(prefQuery);
//       if (querySnapshot) {
//         querySnapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
//           roomMatchDoc = doc.id;
//         });
//         if (roomMatchDoc) {
//           await updateDoc(doc(db, "rooms", roomMatchDoc), {
//             status: "chatting",
//             secondUserUID: user.uid,
//             secondUserName: `${userData.firstName} ${userData.surname.charAt(
//               0
//             )}`,
//             userJoined: serverTimestamp(),
//           });
//           returnInfo.joined = "second";
//           returnInfo.roomId = roomMatchDoc;
//           console.log("User added to room!");
//         }
//         if (!roomMatchDoc) {
//           const docRef = await addDoc(collection(db, "rooms"), {
//             status: "waiting",
//             firstUserUID: user.uid,
//             firstUserGender: userData.gender,
//             firstUserSeeking: userData.seeking,
//             firstUserName: `${userData.firstName} ${userData.surname.charAt(
//               0
//             )}`,
//             secondUserName: null,
//             secondUserUID: null,
//             extended: null,
//             started: serverTimestamp(),
//             userJoined: null,
//             ended: null,
//             currentQuestion: null,
//             outcome: null,
//           });
//           returnInfo.joined = "first";
//           returnInfo.roomId = docRef.id;
//           console.log("User doc created!");
//         }
//       }
//     }
//     return returnInfo;
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };
