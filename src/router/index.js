import { createWebHistory, createRouter } from "vue-router";

import CreateJobPost from "@/components/JobPosts/CreateJobPost.vue";
import EditJobPost from "@/components/JobPosts/EditJobPost.vue";
import ListJobPosts from "@/components/Admin/ListJobPosts.vue";
import MyJobPosts from "@/components/JobPosts/MyJobPosts.vue";
import JobApplicants from "@/components/JobPosts/JobApplicants.vue";
import MyJobApplications from "@/components/JobPosts/MyJobApplications.vue";
import JobPosts from "@/components/JobPosts/JobPosts.vue";
import SuggestedJobs from "@/components/JobPosts/SuggestedJobs.vue";
import ManageUsers from "@/components/Admin/ManageUsers.vue";

import CreateClientDetail from "@/components/ClientDetails/CreateClientDetail.vue";
import EditClientDetail from "@/components/ClientDetails/EditClientDetail.vue";
import ClientProfile from "@/components/ClientDetails/ClientProfile.vue";
import ViewClientProfile from "@/components/ClientDetails/ViewClientProfile.vue";
import ListClientDetails from "@/components/Admin/ListClientDetails.vue";
import AllClients from "@/components/ClientDetails/AllClients.vue";

import CreateFreelancerDetail from "@/components/FreelancerDetails/CreateFreelancerDetail.vue";
import EditFreelancerDetail from "@/components/FreelancerDetails/EditFreelancerDetail.vue";
import FreelancerProfile from "@/components/FreelancerDetails/FreelancerProfile.vue";
import ViewFreelancerProfile from "@/components/FreelancerDetails/ViewFreelancerProfile.vue";
import AllFreelancers from "@/components/FreelancerDetails/AllFreelancers.vue";
import SuggestedFreelancers from "@/components/FreelancerDetails/SuggestedFreelancers.vue";

import CreateCategory from "@/components/Admin/CreateCategory.vue"
import EditCategory from "@/components/Admin/EditCategory.vue"
import ListCategories from "@/components/Admin/ListCategories.vue"

import CreateCity from "@/components/Admin/CreateCity.vue"
import EditCity from "@/components/Admin/EditCity.vue"
import ListCities from "@/components/Admin/ListCities.vue"

import ActivityLog from "@/components/Admin/ActivityLog.vue"
import ListFreelancerDetails from "@/components/Admin/ListFreelancerDetails.vue"



import CreateProject from "@/components/FreelancerProjects/CreateProject.vue";
import EditProject from "@/components/FreelancerProjects/EditProject.vue";
import FreelancerProjects from "@/components/FreelancerProjects/FreelancerProjects.vue";


import HomeComponent from "@/components/HomeComponent.vue"
import SignUp from '../views/SignUp.vue'
import LoginComp from '../views/LoginComp.vue'
//import store from '../store/index'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeComponent,
  },
  {
    path: "/users",
    name: "Users",
    component: ManageUsers,
    meta: { requiresAuth: true, roles: ['Admin']}
  },
  {
    path: "/activitylog",
    name: "ActivityLog",
    component: ActivityLog,
    meta: { requiresAuth: true, roles: ['Admin']}
  },
  {
    path: "/clients",
    name: "Clients",
    component: AllClients,
    meta: { requiresAuth: true }
  },
  {
    path: "/createClientDetail",
    name: "createClientDetail",
    component: CreateClientDetail,
    meta: { requiresAuth: true, roles: ['Client', 'Admin']}
  },
  {
    path: "/editClientDetail",
    name: "EditClientDetail",
    component: EditClientDetail,
    meta: { requiresAuth: true, roles: ['Client', 'Admin']}
  },
  {
    path: "/clientprofile",
    name: "ClientProfile",
    component: ClientProfile,
    meta: { requiresAuth: true, roles: ['Client']}
  },
  {
    path: "/viewclientprofile",
    name: "ViewClientProfile",
    component: ViewClientProfile,
    meta: { requiresAuth: true }
  },
  {
    path: "/clientdetails",
    name: "ClientDetails",
    component: ListClientDetails,
    meta: { requiresAuth: true, roles: ['Admin']}
  },
  {
    path: "/freelancerdetails",
    name: "FreelancerDetails",
    component: ListFreelancerDetails,
    meta: { requiresAuth: true, roles: ['Admin']}
  },
  {
    path: "/suggestedFreelancers",
    name: "SuggestedFreelancers",
    component: SuggestedFreelancers,
    meta: { requiresAuth: true, roles: ['Client']}
  },
  {
    path: "/createjobpost",
    name: "CreateJobPost",
    component: CreateJobPost,
    meta: { requiresAuth: true, roles: ['Client', 'Admin']}
  },
  {
    path: "/listJobPosts",
    name: "ListJobPosts",
    component: ListJobPosts,
    meta: { requiresAuth: true, roles: ['Admin']}
  },
  {
    path: "/myJobPosts",
    name: "MyJobPosts",
    component: MyJobPosts,
    meta: { requiresAuth: true, roles: ['Client']}
  },
  {
    path: "/myjobapplications",
    name: "MyJobApplications",
    component: MyJobApplications,
    meta: { requiresAuth: true, roles: ['Freelancer']}
  },
  {
    path: "/jobApplicants",
    name: "JobApplicants",
    component: JobApplicants,
    meta: { requiresAuth: true, roles: ['Client']}
  },
  {
    path: "/JobPosts",
    name: "JobPosts",
    component: JobPosts,
    meta: { requiresAuth: true }
  },
  {
    path: "/SuggestedJobs",
    name: "SuggestedJobs",
    component: SuggestedJobs,
    meta: { requiresAuth: true, roles: ['Freelancer']}
  },
  {
    path: "/edit",
    name: "EditJobPost",
    component: EditJobPost,
    meta: { requiresAuth: true, roles: ['Client', 'Admin']}
  },
  {
    path: "/createcategory",
    name: "CreateCategory",
    component: CreateCategory,
    meta: { requiresAuth: true, roles: ['Admin']}
  },
  {
    path: "/editcategory",
    name: "EditCategory",
    component: EditCategory,
    meta: { requiresAuth: true, roles: ['Admin']}
  },
  {
    path: "/categories",
    name: "Categories",
    component: ListCategories,
    meta: { requiresAuth: true, roles: ['Admin']}
  },
  {
    path: "/createCity",
    name: "CreateCity",
    component: CreateCity,
    meta: { requiresAuth: true, roles: ['Admin']}
  },
  {
    path: "/editCity",
    name: "EditCity",
    component: EditCity,
    meta: { requiresAuth: true, roles: ['Admin']}
  },
  {
    path: "/cities",
    name: "cities",
    component: ListCities,
    meta: { requiresAuth: true, roles: ['Admin']}
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/login",
    name: "login",
    component: LoginComp,
  },
  {
    path: "/createFreelancerDetail",
    name: "createFreelancerDetail",
    component: CreateFreelancerDetail,
    meta: { requiresAuth: true, roles: ['Freelancer']}
  },
  {
    path: "/editFreelancerDetail",
    name: "EditFreelancerDetail",
    component: EditFreelancerDetail,
    meta: { requiresAuth: true, roles: ['Admin', 'Freelancer']}
  },
  {
    path: "/freelancerprofile",
    name: "FreelancerProfile",
    component: FreelancerProfile,
    meta: { requiresAuth: true, roles: ['Freelancer']}
  },
  {
    path: "/viewfreelancerprofile",
    name: "ViewFreelancerProfile",
    component: ViewFreelancerProfile,
    meta: { requiresAuth: true }
  },
  {
    path: "/freelancers",
    name: "Freelancers",
    component: AllFreelancers,
    meta: { requiresAuth: true }
  },
  {
    path: "/FreelancerProjects",
    name: "FreelancerProjects",
    component: FreelancerProjects,
    meta: { requiresAuth: true }
  },
  {
    path: "/createproject",
    name: "CreateProject",
    component: CreateProject,
    meta: { requiresAuth: true, roles: ['Freelancer']}
  },
  {
    path: "/editProject",
    name: "EditProject",
    component: EditProject,
    meta: { requiresAuth: true, roles: ['Freelancer']}
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


const userId = localStorage.getItem('userId')
const userRole = localStorage.getItem('userRole')


router.beforeEach((to) => {
  if (to.matched.some(record => record.meta.requiresAuth)){
    const roles = to.meta.roles || ''

    if (userId == null) {
      router.push('/login')
    }
    else if(roles == ''){
      return;
    }
    else if (!roles.includes(userRole)){
      alert("Access denied! You'll be redirected to homepage")
      router.push('/')
    }else{
      return;
    }

}
})

export default router;