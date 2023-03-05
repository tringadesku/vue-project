import { createStore } from 'vuex'

// firebase imports
import { auth, db } from '../firebase/config'
import { doc, setDoc, getDoc } from "firebase/firestore"; 

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const store = createStore({
  state: {
    user: null,
    authIsReady: false,
    userRole: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      console.log('user state changed:', state.user)

      // Get user's data from Firestore collection
      const userRef = doc(db, 'users', state.user.uid);
      getDoc(userRef)
        .then((doc) => {
          if (doc.exists()) {
            // Extract user's role from data
            state.userRole = doc.data().role;
            console.log('user role:', state.userRole);
          } else {
            console.log('user not found');
          }
        })
        .catch((error) => {
          console.log('error getting user data:', error);
        });
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload
    }
  },
  actions: {
    async signup(context, { email, password, pickedRole }) {
      console.log('signup action')
    
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (res) {
        const user = res.user
        var roli = pickedRole; 

        const adminEmails = ['admin1@example.com', 'admin2@example.com']
        console.log()
        if (adminEmails.includes(email)){
          roli = "Admin";
        }
        else{
          roli = pickedRole;
        }
        // Add user role
        await setDoc(doc(db, `users/${user.uid}`), {
          role: roli
        }, { merge: true })
        // Commit user to store
        context.commit('setUser', user)
      } else {
        throw new Error('could not complete signup')
      }
    },
    async login(context, { email, password }) {
      console.log('login action')

      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res) {
        context.commit('setUser', res.user)
      } else {
        throw new Error('could not complete login')
      }
    },
    async logout(context) {
      console.log('logout action')

      await signOut(auth)
      context.commit('setUser', null)
    }
  }
})

// wait until auth is ready
const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setAuthIsReady', true)
  store.commit('setUser', user)
  unsub()
})


// export the store
export default store