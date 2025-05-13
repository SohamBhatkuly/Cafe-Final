// import { View, Text } from 'react-native'
// import React, { useEffect, useState } from 'react'
// // import auth, { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase'; // Adjust the path as needed

// export default function useAuth() {
//     const [user, setUser] = useState(null);

//     useEffect(()=>{
//         const unsub = onAuthStateChanged(auth, user=>{
//             console.log('got user: ', user);
//             if(user){
//                 setUser(user);
//             }else{
//                 setUser(null);
//             }
//         });
//         return unsub;
//     }, [])

//     return { user }
// }