<template>
    <div class="col-md-8">
      <table class="table table-striped">
        <thead class="table-dark">
          <tr>
            <th>User Id</th>
            <th>Role</th>
            <th>Full Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.role }}</td>
            <td v-if="user.firstName != ''">{{ user.firstName}}  {{ user.lastName }}</td>
            <td v-if="user.firstName == ''" class="fw-light"> User details not defined yet</td>
            <td>
              <button class="btn btn-danger"  @click="deleteUser(user.id)">Delete User</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
import { collection, getDocs, doc, deleteDoc} from "firebase/firestore";
import { db } from "@/firebase/config";
import axios from "axios";

  
  export default {
    data() {
      return {
        users: [],
        FreelancerDetails: [],
        ClientDetails: []
      }
    },
    created() {

    let apiURL = 'http://localhost:4000/api/getFreelancerDetails';
    axios.get(apiURL).then(res => {
        this.FreelancerDetails = res.data
     }).catch(error => {
        console.log(error)
     })

     let apiiURL = 'http://localhost:4000/api/getClientDetails';
    axios.get(apiiURL).then(res => {
        this.ClientDetails = res.data
     }).catch(error => {
        console.log(error)
     })

     const getUsers = async () => {
  const usersCollection = collection(db, "users");
  const querySnapshot = await getDocs(usersCollection);
  const users = [];

  querySnapshot.forEach(async (doc) => {
    const data = doc.data();
    const user = {
      id: doc.id,
      role: data.role,
      firstName: "",
      lastName: "",
    };

    if(user.role == 'Freelancer'){
        const freelancerDetails = this.FreelancerDetails.find(
          (details) => details.freelancerId === user.id
        );

        console.log(freelancerDetails)
        if (freelancerDetails) {
          user.firstName = freelancerDetails.firstName;
          user.lastName = freelancerDetails.lastName;
        }

    }
    else if(user.role == "Client"){
      const clientDetails = this.ClientDetails.find(
        (details) => details.clientId === user.id
      );

      if (clientDetails) {
        user.firstName = clientDetails.firstName;
        user.lastName = clientDetails.lastName;
      }
    }

    users.push(user);
  });

  return users;
};

    // Call getUsers function and log the users
    getUsers().then((users) => {
    console.log(users);
    this.users = users;
    }).catch((error) => {
    console.log(error);
    });
    },
    methods:{
        async deleteUser(userId) {
          try {
            const userRef = doc(db, "users", userId);
            await deleteDoc(userRef);
            const updatedUsers = this.users.filter((user) => user.id !== userId);
            this.users = updatedUsers;
            console.log(`User with ID ${userId} has been deleted`);
          } catch (error) {
            console.error(error);
          }
        },
      },
    }


  </script>