import { createRouter, createWebHistory } from 'vue-router';
import JobSearch from '../views/JobSearch.vue';
import RegisterCompany from '../views/RegisterCompany.vue';
import CompanyDashboard from '../views/CompanyDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: JobSearch,
  },
  {
    path: '/register-company',
    name: 'register-company',
    component: RegisterCompany,
  },
  {
    path: '/company-dashboard',
    name: 'company-dashboard',
    component: CompanyDashboard,
  },
  {
    path: '/create-job',
    name: 'create-job',
    component: CompanyDashboard,
    props: { initialTab: 'Create Job' },
  },
  {
    path: '/settings',
    name: 'settings',
    component: JobSearch,
  },
  {
    path: '/help',
    name: 'help',
    component: JobSearch,
  },
  {
    path: '/accessibility',
    name: 'accessibility',
    component: JobSearch,
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: JobSearch,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
