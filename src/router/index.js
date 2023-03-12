import { createWebHistory, createRouter } from "vue-router";

import CreateJobPost from "@/components/JobPosts/CreateJobPost.vue";
import EditJobPost from "@/components/JobPosts/EditJobPost.vue";
import ListJobPosts from "@/components/Admin/ListJobPosts.vue";
import MyJobPosts from "@/components/JobPosts/MyJobPosts.vue";
import JobApplicants from "@/components/JobPosts/JobApplicants.vue";
import MyJobApplications from "@/components/JobPosts/MyJobApplications.vue";
import JobPosts from "@/components/JobPosts/JobPosts.vue";
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

import HomeComponent from "@/components/HomeComponent.vue"
import SignUp from '../views/SignUp.vue'
import LoginComp from '../views/LoginComp.vue'
import store from '../store/index'

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
  },
  {
    path: "/activitylog",
    name: "ActivityLog",
    component: ActivityLog,
  },
  {
    path: "/clients",
    name: "Clients",
    component: AllClients,
  },
  {
    path: "/createClientDetail",
    name: "createClientDetail",
    component: CreateClientDetail,
  },
  {
    path: "/editClientDetail",
    name: "EditClientDetail",
    component: EditClientDetail,
  },
  {
    path: "/clientprofile",
    name: "ClientProfile",
    component: ClientProfile,
  },
  {
    path: "/viewclientprofile",
    name: "ViewClientProfile",
    component: ViewClientProfile,
  },
  {
    path: "/clientdetails",
    name: "ClientDetails",
    component: ListClientDetails,
  },
  {
    path: "/freelancerdetails",
    name: "FreelancerDetails",
    component: ListFreelancerDetails,
  },
  {
    path: "/suggestedFreelancers",
    name: "SuggestedFreelancers",
    component: SuggestedFreelancers,
  },
  {
    path: "/createjobpost",
    name: "CreateJobPost",
    component: CreateJobPost,
    //meta: { requiresAuth: true }
  },
  {
    path: "/listJobPosts",
    name: "ListJobPosts",
    component: ListJobPosts,
    //meta: { requiresAuth: true }
  },
  {
    path: "/myJobPosts",
    name: "MyJobPosts",
    component: MyJobPosts,
    //meta: { requiresAuth: true }
  },
  {
    path: "/myjobapplications",
    name: "MyJobApplications",
    component: MyJobApplications,
    //meta: { requiresAuth: true }
  },
  {
    path: "/jobApplicants",
    name: "JobApplicants",
    component: JobApplicants,
    //meta: { requiresAuth: true }
  },
  {
    path: "/JobPosts",
    name: "JobPosts",
    component: JobPosts,
    //meta: { requiresAuth: true }
  },
  {
    path: "/edit",
    name: "EditJobPost",
    component: EditJobPost,
  },
  {
    path: "/createcategory",
    name: "CreateCategory",
    component: CreateCategory,
    //meta: { requiresAuth: true }
  },
  {
    path: "/editcategory",
    name: "EditCategory",
    component: EditCategory,
    //meta: { requiresAuth: true }
  },
  {
    path: "/categories",
    name: "Categories",
    component: ListCategories,
    //meta: { requiresAuth: true }
  },
  {
    path: "/createCity",
    name: "CreateCity",
    component: CreateCity,
    //meta: { requiresAuth: true }
  },
  {
    path: "/editCity",
    name: "EditCity",
    component: EditCity,
    //meta: { requiresAuth: true }
  },
  {
    path: "/cities",
    name: "cities",
    component: ListCities,
    //meta: { requiresAuth: true }
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
  },
  {
    path: "/editFreelancerDetail",
    name: "EditFreelancerDetail",
    component: EditFreelancerDetail,
  },
  {
    path: "/freelancerprofile",
    name: "FreelancerProfile",
    component: FreelancerProfile,
  },
  {
    path: "/viewfreelancerprofile",
    name: "ViewFreelancerProfile",
    component: ViewFreelancerProfile,
  },
  {
    path: "/freelancers",
    name: "Freelancers",
    component: AllFreelancers,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


const userId = localStorage.getItem('userId')

router.beforeEach((to) => {
  if (to.matched.some(record => record.meta.requiresAuth)){
  if (userId == null) {
    router.push('/login')
  } else if (store.state.userRole != "Admin"){
    router.push(0)
  }else{
    return;
  }
}
})

export default router;