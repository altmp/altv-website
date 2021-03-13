<template id="modal-template">
    <transition name="modal">
        <div v-show="show" class="modal-mask">
            <span class="modal-close" @click="close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path fill="white" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z">
                    </path>
                </svg>
            </span>
            <div class="modal-wrapper" @click.self="close">
                <div class="modal-container">
                    <div v-if="server.bannerUrl" class="banner">
                        <img :src="server.bannerUrl" />
                    </div>
                    <div class="server">
                        <div class="container">
                            <div class="title">
                                <h1>{{ server.name }}</h1>
                            </div>
                            <div class="information">
                                <div class="server-information">
                                    <table style="width: 100%;">
                                        <tbody>
                                            <tr>
                                                <td>Players</td>
                                                <td><b>{{ server.players }}</b> / {{ server.maxPlayers }}</td>
                                            </tr>
                                            <tr>
                                                <td>Language</td>
                                                <td>{{ this.getLanguage(server.language) }}</td>
                                            </tr>
                                            <tr v-if="!server.useCdn">
                                                <td>IP</td>
                                                <td>{{ server.host }}</td>
                                            </tr>
                                            <tr v-if="!server.useCdn">
                                                <td>Port</td>
                                                <td>{{ server.port }}</td>
                                            </tr>
                                            <tr v-if="server.useCdn">
                                                <td>Host</td>
                                                <td>{{ server.cdnUrl }}</td>
                                            </tr>
                                            <tr>
                                                <td>Gamemode</td>
                                                <td>{{ server.gameMode }}</td>
                                            </tr>
                                            <tr>
                                                <td>Website</td>
                                                <td>{{ server.website }}</td>
                                            </tr>
                                            <tr>
                                                <td>Description</td>
                                                <td>{{ server.description }}</td>
                                            </tr>
                                            <tr>
                                                <td>Tags</td>
                                                <td class="serverTags">
                                                    <span v-for="tag in server.tags" :key="tag">
                                                        {{ tag }}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="charts">
                                    <h2>Players Stat</h2>
                                    <div class="loading-chart">
                                        <ServerChart class="chart" v-show="playerData !== null" ref="chartRef" :data="playerStat" :height="180"></ServerChart>
                                        <i v-if="playerData === null">Loading...</i>
                                    </div>
                                    <div class="filter">
                                        <div class="radio-group">
                                            <input v-model="period" id="1day" type="radio" name="time" value="1d" checked />
                                            <label for="1day">1 day</label>

                                            <input v-model="period" id="1week" type="radio" name="time" value="7d" />
                                            <label for="1week">1 week</label>

                                            <input v-model="period" id="1month" type="radio" name="time" value="31d" />
                                            <label for="1month">1 month</label>
                                        </div>
                                        <div class="radio-group">
                                            <input v-model="type" id="avg" type="radio" name="type" value="avg" checked />
                                            <label for="avg">Average</label>

                                            <input v-model="type" id="max" type="radio" name="type" value="max" />
                                            <label for="max">Max</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="connect" colspan="2">
                                <a v-if="server.useCdn" :href="'altv://connect/' + server.cdnUrl">Connect</a>
                                <a v-else :href="'altv://connect/' + server.host + ':' + server.port">Connect</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import ServerChart from '@/components/server/server-chart.vue';

import { getRequest } from '@/utility/fetch';
import getLanguage from '@/utility/locales';

export default {
    template: '#modal-template',
    data: function() {
        return {
            show: false,
            server: {},
            playerData: null,
            period: '1d',
            type: 'avg',
            options: {
                // responsive: true,
                // maintainAspectRatio: true,
                // aspectRatio: 1,
                legend: {
                    display: false
                },
                scales:{
                    xAxes: [{
                        display: false //this will remove all the x-axis grid lines
                    }],
                    yAxes: [{
                        ticks: {
                            stepSize: 1
                        }
                    }]
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'index',
                    intersect: false
                }
            },
            // chartData: {
            //     labels: [
            //         "00:00",
            //         "01:00",
            //         "02:00",
            //         "03:00",
            //         "04:00",
            //         "05:00",
            //         "06:00",
            //         "07:00",
            //         "08:00",
            //         "09:00",
            //         "10:00",
            //         "11:00",
            //         "12:00",
            //         "13:00",
            //         "14:00",
            //         "15:00",
            //         "16:00",
            //         "17:00",
            //         "18:00",
            //         "19:00",
            //         "20:00",
            //         "21:00",
            //         "22:00",
            //         "23:00",
            //     ],
            //     datasets: [
            //         {
            //             label: "Players",
            //             borderColor: "rgba(255, 255, 255, 0.6)",
            //             pointBackgroundColor: "white",
            //             pointBorderColor: "white",
            //             borderWidth: 1,
            //             backgroundColor: "rgba(255, 255, 255, 0.03)",
            //             data: [60, 55, 32, 10, 2, 12, 53, 100, 80, 94, 44, 64, 77, 84, 23, 89, 130, 300, 280, 290, 230, 170, 180, 190]
            //         }
            //     ]
            // }
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: "Players",
                        borderColor: "rgba(255, 255, 255, 0.6)",
                        pointBackgroundColor: "white",
                        pointBorderColor: "white",
                        pointRadius: 0,
                        borderWidth: 1,
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        data: []
                    }
                ]
            }
        };
    },
    components: {
        ServerChart
    },
    mounted() {
        this.$refs.chartRef.renderChart();
    },
    methods: {
        getLanguage: getLanguage,
        getPlayerData: async function () {
            this.playerData = null;

            const playerData = await getRequest(`https://api.altv.mp/${this.type}/${this.server.id}/${this.period}`);

            if (!playerData) {
                return;
            }

            this.playerData = playerData;
        },
        open: async function(server) {
            this.show = true;
            this.server = server;

            this.period = '1d';
            this.type = 'avg';

            this.playerData = null;

            await this.update();
        },
        close: function() {
            this.show = false;
        },
        update: async function() {
            await this.getPlayerData();

            this.chartData.labels = [];
            this.chartData.datasets[0].data = [];

            this.playerData.forEach(data => {
                var date = new Date(data.t * 1000);
                // var dateFormat = `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;

                this.chartData.labels.push(date.toLocaleString());
                this.chartData.datasets[0].data.push(data.c);
            }, this);

            if(this.$refs.chartRef.$data._chart)
                this.$refs.chartRef.$data._chart.destroy();

            this.$refs.chartRef.renderChart(this.chartData, this.options);
        }
    },
    computed: {
        playerStat: function() {
            return this.chartData;
        }
    },
    watch: {
        playerData: function() {
            //this.$refs.chartRef.renderChart(this.chartData, this.options);
        },
        type: async function() {
            await this.update();
        },
        period: async function() {
            await this.update();
        }
    }
};
</script>

<style scoped>

div.connect {
    text-align: center !important;
    text-transform: uppercase;
    padding-top: 10px;
    margin-bottom: 10px;
}

div.connect a {
    width: 100px;
    text-decoration: none;
    font-weight: bold;
    font-size: .9em;
    color: white;
    display: inline-block;
    margin-bottom: 5px;
    padding: 10px 10px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(150, 150, 150, 0.05) !important;
    border-radius: 10px;
    transition: background-color .4s, border-color .4s;
}

div.connect a:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.1) !important;
}

div.connect a:active {
    border-color: rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.1) !important;
}

.filter {
    display: flex;
    margin-top: 20px;
    /* margin-bottom: 20px; */
    text-align: center;
    justify-content: center;
    align-items: center;
}

.filter .radio-group {
    margin-right: 20px;
}

.filter .radio-group input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.filter .radio-group i {
    text-transform: uppercase;
    font-style: normal;
    opacity: .5;
    margin-right: 10px;
}

.filter .radio-group label {
    display: inline-block;
    margin-bottom: 5px;
    padding: 6px 10px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    margin-left: -1px;
    margin-right: -1px;
    font-size: .8em;
    text-transform: uppercase;
    transition: background-color .5s, border-color .5s;
    /* border-radius: 10px; */
}

.filter .radio-group label:first-of-type {
    border-radius: 10px 0 0 10px;
}

.filter .radio-group label:last-child {
    border-radius: 0 10px 10px 0;
}

.filter .radio-group label:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.05);
}

.filter .radio-group input:checked + label:hover {
    border-color: rgba(255, 255, 255, 0.5);
}

.filter .radio-group input:checked + label {
    border-color: rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.1);
}

.serverTags span {
    display: inline-block;
    font-size: .8em;
    padding: 6px 10px;
    background: rgba(240, 240, 240, 0.1);
    border-radius: 5px;
    width: auto;
    transition: opacity .2s;
    margin-right: .5em;
    margin-bottom: 5px;
}

[v-cloak] {
    display: none;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    /* backdrop-filter: blur(1px); */
    display: table;
    transition: opacity .2s ease;
}

.modal-close {
    display: flex;
    align-items: center;
    position: absolute;
    top: 4em;
    right: 4em;
    width: 24px;
    height: 24px;
    padding: 1em;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 100px;
}

.modal-close:hover {
    border-color: rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
}

.modal-close:active {
    border-color: rgba(255, 255, 255, 0.6);
    background-color: rgba(255, 255, 255, 0.2) !important;
}

.modal-close svg {
    width: 100%;
    height: 100%;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-enter,
.modal-leave-to {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}

.modal-container {
    display: flex;
    margin: 0px auto;
    max-width: 100%;
    /* min-width: 70%; */
    width: min-content;
    /* max-height: 400px; */
    padding: 0 20px 0 0;
    background-color: rgba(30, 30, 30, 1);
    /* backdrop-filter: blur(5px); */
    border-radius: 20px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, .33);
    transition: all .2s ease;
}

.modal-container h1 {
    font-size: 1.5em;
}

.modal-container .banner {
    display: contents;
}

.modal-container .banner img {
    display: block;
    min-width: 160px;
    width: auto;
    border-radius: 20px 0 0 20px;
}

.modal-container .server {
    display: flex;
}

.modal-container .server .container {
    display: block;
    padding: 1em;
    box-sizing: border-box;
}

.modal-container .server .container .title h1 {
    font-size: 2em;
    padding-left: 20px;
    /* text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; */
}

.modal-container .server .container .information {
    display: flex;
    padding-left: 10px;
    padding-right: 0px;
    justify-content: center;
    height: auto;
    /* margin-bottom: 10px; */
    /* max-height: 70%; */
}

.modal-container .server .container .information .server-information {
    overflow: scroll;
    overflow-x: hidden;
    /* max-height: 400px; */
    width: auto;
    min-width: 400px;
}

.modal-container .information table {
    border-collapse: separate;
    border-spacing: 10px;
}

.modal-container .information table tr td:first-child {
    /* display: block; */
    text-transform: uppercase;
    font-size: .8em;
    text-align: right;
    vertical-align: middle;
    color: rgba(255, 255, 255, .4);
}

.modal-container .information table tr td:last-child {
    opacity: 1;
    font-style: normal;
    color: #fff;
    padding-left: 5px;
}

.modal-container .charts {
    /* max-width: 50%; */
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    /* max-height: 300px; */
    min-width: max-content;
}

.modal-container .charts {
    padding-bottom: 10px;
}

.modal-container .charts h2 {
    font-size: 1em;
    text-transform: uppercase;
    opacity: 1;
}

.modal-container .charts .loading-chart {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 180px;
    min-width: 400px;
}

.modal-container .charts .loading-chart .chart {
    height: 90%;
    width: 100%;
}

@keyframes Pulsate {
    from { opacity: .5; }
    50% { opacity: 0; }
    to { opacity: .5; }
}

.modal-container .charts .loading-chart i {
    text-transform: uppercase;
    font-style: normal;
    opacity: .5;
    animation: Pulsate 2s linear infinite;
}

::-webkit-scrollbar {
    width: 10px;
    scroll-margin-right: 3px;
}

/* Track */
::-webkit-scrollbar-track {
    background: transparent; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    background: #292929;
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555; 
}
</style>