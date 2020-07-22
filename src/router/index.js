import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/home.vue';
import Downloads from '@/components/downloads.vue';
import ReportTos from '@/components/report-tos.vue';
import HostingApplication from '@/components/hosting-application.vue';

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        alias: '/index.html',
        component: Home,
        name: 'Home',
        props: {
            bodyClass: 'home'
        }
    },
    {
        path: '/downloads/',
        component: Downloads,
        name: 'Downloads',
        props: {
            bodyClass: 'downloads'
        }
    },
    {
        path: '/report-violation/',
        component: ReportTos,
        name: 'Report ToS violation',
        props: {
            bodyClass: 'report-tos'
        }
    },
    {
        path: '/hosting-application/',
        component: HostingApplication,
        name: 'Apply for hosting verification',
        props: {
            bodyClass: 'hosting-application'
        }
    }
];

const router = new VueRouter({
    base: __dirname,
    linkExactActiveClass: 'active',
    base: process.env.BASE_URL,
    routes
});

export default router;
