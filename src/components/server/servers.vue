<template>
    <div class="main">
        <ServerModal ref="serverModal"></ServerModal>

        <div class="wrapper">
            <div class="title">
                <h1>Servers list</h1>
                <div class="filters">
                    <div class="filter">
                        <label>Promoted on top
                            <input v-model="filter.promoted" type="checkbox" id="promoted" checked>
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div class="filter">
                        <i>Hide</i>
                        <label>Empty
                            <input v-model="filter.empty" type="checkbox" id="empty">
                            <span class="checkmark"></span>
                        </label>
                        <label>Full
                            <input v-model="filter.full" type="checkbox" id="full">
                            <span class="checkmark"></span>
                        </label>
                        <label>Locked
                            <input v-model="filter.locked" type="checkbox" id="locked">
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
                <div class="search">
                    <i class="fa fa-search"></i>
                    <input v-model="filter.name" type="text" @keyup.esc="clearInput" placeholder="Search" />
                </div>
            </div>
            <div class="container">
                <div class="stats">
                    <!-- <a class="stats" href="https://altstats.net/" target="_blank"> -->
                    <span class="players">
                        Players online: <i>{{ servers.reduce((a, b) => a + (b.playersCount || 0), 0) }}</i>
                    </span>
                    <span class="servers">
                        Servers online: <i>{{ servers.length }}</i>
                    </span>
                </div>

                <table class="server">
                    <thead>
                        <th class="orderable" @click="sortBy('name')">Server Name <i
                                v-if="this.filter.orderBy.column === 'name'" class="fa" :class="sortByClass"></i></th>
                        <th class="center">&nbsp;</th>
                        <th @click="sortBy('playersCount')" class="orderable center">Players <i
                                v-if="this.filter.orderBy.column === 'playersCount'" class="fa" :class="sortByClass"></i>
                        </th>
                        <th class="center optional">Gamemode</th>
                        <th class="center optional">Language</th>
                        <th class="optional">&nbsp;</th>
                    </thead>
                    <tbody>
                        <tr v-for="server in getServerList" :key="server.id" v-on:click="showServerInfo(server.id)">
                            <td>
                                <div class="serverName">{{ server.name }}</div>
                                <div class="serverTags optional">
                                    <span v-for="(tag, i) in server.tags" :key="i">{{ tag }}</span>
                                </div>
                            </td>
                            <td class="center">
                                <div class="icons">
                                    <i v-if="server.verified" class="fa fa-check" title="Verified server"></i>
                                    <i v-if="server.promoted" class="fa fa-bolt" title="Promoted server"></i>
                                    <i v-if="server.passworded" class="fa fa-lock" title="Locked server"></i>
                                </div>
                            </td>
                            <td class="center players"><b>{{ server.playersCount }}</b> <span class="optional">/
                                    {{ server.maxPlayersCount }}</span></td>
                            <td class="center optional">{{ server.gameMode }}</td>
                            <td class="center optional">{{ getLanguage(server.language) }}
                                <!-- <img :src="getFlagImage(server.language)" /> -->
                            </td>
                            <td class="center optional connect">
                                <a :href="'altv://connect/' + server.address">Connect</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="copyright">
                <p>
                    Grand Theft Auto and Grand Theft Auto: V are registered trademarks of Take-Two Interactive Software.
                    <br />Any trademarks used belong to their respective owners. alt:V Multiplayer and altMP Project are not
                    affiliated with or endorsed by Take-Two Interactive Software.
                    <br />alt:V Multiplayer and altMP Project do not host any user-made servers and is not responsible for
                    user-made content. All user-made content are the property of their respective owners.
                    <br />
                    &copy; 2023 AMC Alternative Multiplayer Solutions LTD
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import ServerModal from '@/components/server/server-modal.vue';

    import {
        getRequest
    } from '@/utility/fetch';
    import getLanguage from '@/utility/locales';

    // const requireFlag = require.context('@/locales/flags', false);
    // const requireLang = require.context('@/locales/langs', false);

    export default {
        components: {
            ServerModal
        },
        data() {
            return {
                servers: [],
                serversInfo: {},
                filter: {
                    orderBy: {
                        column: "players",
                        orderDesc: -1
                    },
                    name: "",
                    promoted: ((localStorage.getItem("promoted") === null) ? true : (localStorage.getItem(
                        "promoted") === 'true')),
                    empty: ((localStorage.getItem("empty") === null) ? false : (localStorage.getItem("empty") ===
                        'true')),
                    full: ((localStorage.getItem("full") === null) ? false : (localStorage.getItem("full") === 'true')),
                    locked: ((localStorage.getItem("locked") === null) ? false : (localStorage.getItem("locked") ===
                        'true'))
                }
            }
        },
        methods: {
            getLanguage: getLanguage,
            fetchServers: async function () {
                console.log("Fetch servers from the API...");
                const data = await getRequest('https://api.alt-mp.com/servers');

                if (!data) {
                    return;
                }

                this.servers = data;
            },
            sortBy(filterName) {
                if (this.filter.orderBy.column !== filterName) {
                    this.filter.orderBy.column = filterName;
                    this.filter.orderBy.orderDesc = -1;
                } else
                    this.filter.orderBy.orderDesc = this.filter.orderBy.orderDesc === 1 ? -1 : 1;
            },
            // getLanguage(countryCode) {
            //     for(var lang in languages) {
            //         if(languages[lang]["1"] === countryCode)
            //             return languages[lang].local;
            //     }

            //     return countryCode;
            //     // if(countryCode in isoLangs)
            //     // {
            //     //     return isoLangs[countryCode].nativeName;
            //     // } else {
            //     //     return countryCode;
            //     // }
            //     // const fName = `./${countryCode}.json`;
            //     // if (requireLang.keys().indexOf(fName) !== -1) {
            //     //     return requireLang(fName).name;
            //     // } else {
            //     //     return countryCode;
            //     // }
            //     // var language = new Intl.DisplayNames([countryCode], {type: 'language'}).of(countryCode);
            //     // return language.charAt(0).toUpperCase() + language.slice(1);
            // },
            // getFlagImage(countryCode) {
            //     const fName = `./${countryCode}.svg`;
            //     if (requireFlag.keys().indexOf(fName) !== -1) {
            //         return requireFlag(fName);
            //     } else {
            //         return requireFlag(`./unk.svg`);
            //     }
            // },
            clearInput() {
                this.filter.name = "";
            },
            showServerInfo(id) {
                var server = this.servers.find(server => {
                    return server.id === id;
                });
                this.$refs.serverModal.open(server);
            }
        },
        beforeCreate() {
            document.body.className = 'servers';
        },
        mounted() {
            this.fetchServers();
            setInterval(this.fetchServers, 10000);
        },
        computed: {
            getServerList: function () {
                this.servers.sort((a, b) => {
                    if (this.filter.promoted) {
                        if (a.promoted > b.promoted) return -1;
                        if (a.promoted < b.promoted) return 1;
                    }

                    var leftSide = a[this.filter.orderBy.column];
                    var rightSide = b[this.filter.orderBy.column];

                    if (typeof leftSide === "string") {
                        leftSide = leftSide.toLowerCase();
                        rightSide = rightSide.toLowerCase();
                    }

                    if (leftSide > rightSide) {
                        return this.filter.orderBy.orderDesc;
                    }
                    if (leftSide < rightSide) {
                        return ((this.filter.orderBy.orderDesc === -1) ? 1 : -1);
                    }

                    return 0;
                    // return (a.players > b.players) ? -1 : 1
                    // return (a[this.filter.orderBy.column] > b[this.filter.orderBy.column])
                    //         ? this.filter.orderBy.orderDesc
                    //         : ((this.filter.orderBy.orderDesc === -1) ? 1 : -1)
                });

                return this.servers.filter(server => {
                    if (!server.players && this.filter.empty) return false;
                    if ((server.players === server.maxPlayers) && this.filter.full) return false;
                    if (server.passworded && this.filter.locked) return false;
                    if (!this.filter.name) return true;

                    var filter = this.filter.name.toLowerCase();
                    return (
                        server.name.toLowerCase().includes(filter) ||
                        this.getLanguage(server.language).toLowerCase().includes(filter) ||
                        server.tags.filter(tag => tag.toLowerCase().includes(filter))[0]
                        // this.searchTags(server, filter)
                    );
                })
            },
            sortByClass: function () {
                return {
                    'fa-chevron-down': this.filter.orderBy.orderDesc,
                    'rotate-up': this.filter.orderBy.orderDesc === 1,
                };
            }
        },
        watch: {
            'filter.promoted': function (newValue) {
                console.log("before promoted: " + localStorage.getItem("promoted"));
                localStorage.setItem("promoted", newValue);
                console.log("after promoted: " + localStorage.getItem("promoted"));
            },
            'filter.empty': function (newValue) {
                localStorage.setItem("empty", newValue);
            },
            'filter.full': function (newValue) {
                localStorage.setItem("full", newValue);
                console.log("changing filter.full: " + newValue);
            },
            'filter.locked': function (newValue) {
                localStorage.setItem("locked", newValue);
            }
        }
    }
</script>

<style scoped>
    /* .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
} */

    .wrapper {
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;
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
        background: #202020;
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .main {
        overflow: scroll;
        overflow-x: hidden;
    }

    .title {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .title h1 {
        font-size: 2em;
        font-weight: 900;
        text-transform: uppercase;
    }

    .container .stats {
        margin-bottom: 1rem;
        margin-top: 1rem;
        text-decoration: none;
    }

    .container .stats i {
        font-style: normal !important;
    }

    .container .stats span {
        display: inline-block;
        margin-right: 15px;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 13px;
        color: rgba(255, 255, 255, .5);
    }

    .container .stats span i {
        color: rgba(255, 255, 255, .8);
        margin-left: 3px;
        font-weight: 600;
        transition: color .2s;
    }

    .icons>* {
        margin-right: 15px;
    }

    .container {
        padding-bottom: 30px;
    }

    .filters {
        display: flex;
        flex-wrap: wrap;
        margin-right: auto !important;
    }

    .search input {
        background: none;
        font-size: 1em;
        font-family: inherit;
        font-weight: 400;
        border: none;
        margin-left: .7em;
        color: #F0F0F0;
        letter-spacing: .5px;
    }

    .search input::placeholder {
        transition: opacity .3s;
        font-weight: 600;
        letter-spacing: 0;
    }

    .search input:focus::placeholder {
        opacity: 0;
    }

    .title .search {
        padding: .7em;
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 15px;
    }

    .filters i,
    .search i {
        opacity: .5;
    }

    /* .filters input[type=text] {
  display: inline-block;
  padding: .7em;
  border: 2px solid rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  width: 330px;
} */

    .filters input[type=checkbox] {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .filters label {
        display: inline-block;
        position: relative;
        padding-left: 28px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .filters .filter {
        display: flex;
        align-items: center;
    }

    .filters .filter i {
        text-transform: uppercase;
        font-style: normal;
        letter-spacing: .05em;
        font-weight: 500;
    }

    @media screen and (max-width: 768px) {
        .title h1 {
            font-size: 1em;
        }

        .filters .filter>* {
            margin-bottom: 10px;
        }

        .optional {
            display: none !important;
        }

        table.server {
            font-size: 12px !important;
        }

        table.server thead th:not(.optional) {
            padding-right: 10px !important;
        }

        table.server td:not(:first-child) {
            white-space: nowrap;
        }

        table.server tbody tr td:first-child {
            line-height: initial;
        }
    }

    .filter>* {
        padding-right: 20px;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 16px;
        width: 16px;
        background-color: transparent;
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        transition: background-color .3s;
    }

    .filters label:hover input~.checkmark {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .filters label:hover input:checked~.checkmark {
        background-color: rgba(255, 255, 255, 0.1);
    }

    /* When the checkbox is checked, add a blue background */
    .filters label input:checked~.checkmark {
        background-color: rgba(255, 255, 255, 0.05);
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .filters label input:checked~.checkmark:after {
        display: block;
    }

    .filters label .checkmark:after {
        left: 6px;
        top: 3px;
        width: 2px;
        height: 5px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .title>*:not(:last-child),
    .filters>* {
        margin-right: 20px;
    }

    .connect a {
        color: #eee;
        text-transform: uppercase;
        margin: 0 10px;
        opacity: 0.5;
        transition: all 0.2s;
        text-decoration: none;
        font-weight: 500;
        font-size: 12px;
        letter-spacing: 1.5px;
    }

    .connect a:hover {
        opacity: 1;
    }

    .center {
        text-align: center !important;
    }

    table.server {
        width: 100%;
        border: 5px solid #222222;
        /* border-collapse: collapse; */
        margin-bottom: 40px;
        border-radius: 8px;
        border-spacing: 0;
        box-shadow: 0px 0px 30px -10px #000;
    }

    table.server thead {
        line-height: 40px;
        background-color: #222222;
        border-bottom: 3px solid #222222;
        border-radius: 5px;
    }

    table.server thead th:first-child {
        padding-left: 10px;
        white-space: initial;
    }

    table.server thead th {
        position: sticky;
        top: -20px;
        text-transform: uppercase;
        font-size: .8em;
        letter-spacing: .07em;
        text-align: left;
        background-color: #222222;
        border-bottom: 3px solid #222222;
        color: rgba(255, 255, 255, .5);
        z-index: 1000;
        transition: color .3s;
    }

    table.server thead th.orderable {
        cursor: pointer;
    }

    table.server thead th:hover {
        color: rgba(255, 255, 255, 1);
    }

    table.server thead th i {
        padding-left: 5px;
        padding-right: 5px;
        opacity: .4;
        display: inline-block;
        transition: transform .3s;
    }

    .rotate-up {
        transform: rotate(180deg);
    }

    table.server tr {
        border-bottom: 3px solid #222222;
        cursor: pointer;
        background: #1c1c1c;
        transition: background .2s;
    }

    table.server tr.info {
        display: none;
    }

    table.server tr:nth-child(even) {
        background: #202020;
    }

    table.server tr:hover {
        background-color: #272727;
    }
    

    table.server tbody tr td:first-child {
        padding: 1em;
    }

    table.server tr .serverName {
        display: inline-block;
        margin-bottom: .7rem;
        font-weight: 500;
    }

    table.server tr .serverTags {
        display: block;
    }

    table.server tr .serverTags span {
        font-size: .75em;
        padding: 4px 8px;
        background: rgba(240, 240, 240, 0.1);
        border-radius: 3px;
        margin-right: .5em;
        font-weight: 500;
    }

    table.server tr .players .optional {
        font-size: .8em;
        opacity: .7;
    }

    table.server tr .fa-check {
        color: #00ad56
    }

    table.server tr .fa-bolt {
        color: #FFB900
    }

    .copyright {
        text-align: center;
        font-size: 11px;
        letter-spacing: 0.5px;
        line-height: 20px;
        opacity: 0.2;
        margin-top: 40px;
    }
</style>
