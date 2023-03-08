import { createWebHistory, createRouter } from "vue-router";

import CreateJobPost from "@/components/JobPosts/CreateJobPost.vue";
import EditJobPost from "@/components/JobPosts/EditJobPost.vue";
import ListJobPosts from "@/components/Admin/ListJobPosts.vue";
import MyJobPosts from "@/components/JobPosts/MyJobPosts.vue";
import JobPosts from "@/components/JobPosts/JobPosts.vue";
import TestComp from "@/components/TestComp.vue";

import CreateClientDetail from "@/components/ClientDetails/CreateClientDetail.vue";
import EditClientDetail from "@/components/ClientDetails/EditClientDetail.vue";
import ClientProfile from "@/components/ClientDetails/ClientProfile.vue";
import ViewClientProfile from "@/components/ClientDetails/ViewClientProfile.vue";
import ListClientDetails from "@/components/Admin/ListClientDetails.vue";
import AllClients from "@/components/ClientDetails/AllClients.vue";

import CreateCategory from "@/components/Admin/CreateCategory.vue"
import EditCategory from "@/components/Admin/EditCategory.vue"
import ListCategories from "@/components/Admin/ListCategories.vue"

import HomeComp from '../views/HomeComp.vue'
import SignUp from '../views/SignUp.vue'
import LoginComp from '../views/LoginComp.vue'
import store from '../store/index'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeComp,
  },
  {
    path: "/testcomp",
    name: "TestComp",
    component: TestComp,
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
    name: "categories",
    component: ListCategories,
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