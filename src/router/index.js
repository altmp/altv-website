import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/home.vue';
import Downloads from '@/components/downloads.vue';
import Servers from '@/components/server/servers.vue';
import ReportTos from '@/components/report-tos.vue';
import HostingApplication from '@/components/hosting-application.vue';
import Providers from '@/components/providers.vue';
import Branding from '@/components/branding.vue';

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
        path: '/servers/',
        component: Servers,
        name: 'Server List',
        props: {
            bodyClass: 'servers'
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
    },
    {
        path: '/providers/',
        component: Providers,
        name: 'Verified Hosting Providers',
        props: {
            bodyClass: 'providers'
        }
    },
    {
        path: '/branding/',
        component: Branding,
        name: 'Branding Guidelines',
        props: {
            bodyClass: 'providers'
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
