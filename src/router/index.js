import { createWebHistory, createRouter } from "vue-router";
import CreateComponent from "@/components/Students/CreateComponent.vue";
import CreateJobPost from "@/components/JobPosts/CreateJobPost.vue";
import ListJobPosts from "@/components/JobPosts/ListJobPosts.vue";
import EditComponent from "@/components/Students/EditComponent.vue";
import ListComponent from "@/components/Students/ListComponent.vue";
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
    path: "/create",
    name: "Create",
    component: CreateComponent,
    meta: { requiresAuth: true }
  },
  {
    path: "/createjobpost",
    name: "CreateJobPost",
    component: CreateJobPost,
    meta: { requiresAuth: true }
  },
  {
    path: "/listJobPosts",
    name: "ListJobPosts",
    component: ListJobPosts,
    //meta: { requiresAuth: true }
  },
  {
    path: "/view",
    name: "view",
    component: ListComponent,
    //meta: { requiresAuth: true }
  },
  {
    path: "/edit",
    name: "edit",
    component: EditComponent,
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


router.beforeEach((to) => {
  if (to.matched.some(record => record.meta.requiresAuth)){
  if (!store.state.user) {
    router.push('/login')
  } else if (store.state.userRole != "Admin"){
    router.push(0)
  }else{
    return;
  }
}
})

export default router;