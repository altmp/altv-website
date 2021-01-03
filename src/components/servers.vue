<template>
    <div class="main">
        <div class="wrapper">
            <div class="title">
                <h1>Servers list</h1>
            </div>
            <div class="container">
                <div class="filters">
                    <input v-model="filter.name" type="text" @keyup.esc="clearInput" placeholder="Search servers by name, tags or language" />
                    
                    <label>Show empty servers
                        <input v-model="filter.empty" type="checkbox" id="empty" checked>
                        <span class="checkmark"></span>
                    </label>
                    <label>Hide full servers
                        <input v-model="filter.full" type="checkbox" id="full">
                        <span class="checkmark"></span>
                    </label>
                    <label>Hide locked servers
                        <input v-model="filter.locked" type="checkbox" id="locked">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <table class="server">
                    <thead>
                        <th>Server Name</th>
                        <th class="center">&nbsp;</th>
                        <th class="center">Players</th>
                        <th class="center">Gamemode</th>
                        <th class="center">Language</th>
                        <td>&nbsp;</td>
                    </thead>
                    <tbody>
                        <tr v-for="(server, i) in getServerList" :key="i">
                            <td>
                                <div class="serverName">{{ server.name }}</div>
                                <div class="serverTags">
                                    <span v-for="(tag, i) in server.tags" :key="i">
                                    {{ tag }}
                                    </span>
                                </div>
                            </td>
                            <td class="center"><div v-if="server.locked === true" class="lock"></div></td>
                            <td class="center"><b>{{ server.players }}</b> / {{ server.maxPlayers }}</td>
                            <td class="center">{{ server.gameMode }}</td>
                            <!-- <td class="center"><img :src="flagImage(server.language)" /></td> -->
                            <td class="center">{{ getLanguage(server.language) }} <img :src="getFlagImage(server.language)" /></td>
                            <td class="center connect">
                                <a :href="'altv://connect/' + server.host + ':' + server.port">Connect</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { getRequest } from '@/utility/fetch'
const requireFlag = require.context('@/locales/flags', false);
const requireLang = require.context('@/locales/langs', false);

export default {
    data() {
        return {
            servers: [],
            filter: {
                name: "",
                empty: true,
                full: false,
                locked: false
            }
        }
    },
    methods: {
        fetchServers: async function() {
            console.log("Fetch servers from the API...");
            const data = await getRequest('https://api.altv.mp/servers/list');

            if (!data) {
                return;
            }

            this.servers = data;
            this.servers.sort((a, b) => {
                if(a.promoted > b.promoted) return -1;
                if(a.promoted < b.promoted) return 1;

                return (a.players > b.players) ? -1 : 1
            });
        },
        getLanguage(countryCode) {
            const fName = `./${countryCode}.json`;
            if (requireLang.keys().indexOf(fName) !== -1) {
                return requireLang(fName).name;
            } else {
                return countryCode;
            }
        },
        getFlagImage(countryCode) {
            const fName = `./${countryCode}.svg`;
            if (requireFlag.keys().indexOf(fName) !== -1) {
                return requireFlag(fName);
            } else {
                return requireFlag(`./unk.svg`);
            }
        },
        clearInput() {
            this.filter.name = "";
        }
    },
    mounted() {
        console.log("Servers is mounted");
        this.fetchServers();
    },
    computed: {
        getServerList: function() {
            return this.servers.filter(server => {
                if(!server.players && !this.filter.empty) return false;
                if((server.players === server.maxPlayers) && this.filter.full) return false;
                if(server.locked && this.filter.locked) return false;
                if(!this.filter.name) return true;

                var filter = this.filter.name.toLowerCase();
                return (
                    server.name.toLowerCase().includes(filter) ||
                    this.getLanguage(server.language).toLowerCase().includes(filter) ||
                    server.tags.filter(tag => tag.toLowerCase().includes(filter))[0]
                    // this.searchTags(server, filter)
                );
            })
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

/* .wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
} */

.lock {
    background: gray;
    border-radius: 3px;
    width: 12.5px;
    height: 10px;
    margin-top: 0px;
    margin-left: 0px;
    position: relative;
}

.lock:before {
    content: "";
    display: block;
    position: absolute;
    border:3px solid gray;
    top: -9px;
    left: 0px;
    width: 7.5px;
    height: 13.5px;
    border-radius: 17.5px 17.5px 0 0;
}

.filters {
    margin-bottom: 20px;
}

.container {
    padding-bottom: 30px;
}

.filters input {
  background: none;
  font-size: 1em;
  font-family: inherit;
  font-weight: 400;
  border: none;
  margin-left: .7em;
  color: #F0F0F0;
  letter-spacing: .5px;
}

.filters input::placeholder {
  transition: opacity .3s;
  font-weight: 600;
  letter-spacing: 0;
}

.filters input:focus::placeholder {
  opacity: 0;
}

.filters i {
  opacity: .3;
}

.filters input[type=text] {
  display: inline-block;
  padding: .7em;
  border: 2px solid rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  width: 330px;
}

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
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
}

.filters label:hover input ~ .checkmark {
  background-color: rgba(255, 255, 255, 0.2);
}

/* When the checkbox is checked, add a blue background */
.filters label input:checked ~ .checkmark {
  background-color: rgba(255, 255, 255, 0.05);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.filters label input:checked ~ .checkmark:after {
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

.filters > * {
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
    border-collapse: collapse;
    margin-bottom: 40px;
}

table.server thead {
    line-height: 40px;
    background-color: #222222;
    border-bottom: 3px solid #222222;
}

table.server thead th:first-child {
    padding-left: 10px;
}

table.server thead th {
    text-align: left;
}

table.server tr {
    line-height: 40px;
    border-bottom: 3px solid #222222;
}

table.server tr:nth-child(even) {
    background-color: #1e1e1e;
}

table.server tr:hover {
    background-color: #202020;
}

table.server tbody tr td:first-child {
    padding-left: 10px;
}

table.server tr .serverName {
    display:inline-block;
}

table.server tr .serverTags {
  display: block;
}

table.server tr .serverTags span {
  font-size: .8em;
  padding: 2px 5px;
  background: rgba(240, 240, 240, 0.1);
  border-radius: 3px;
  width: auto;
  margin-top: .3em;
  transition: background .2s, opacity .2s;
  margin-right: .5em;
}
</style>