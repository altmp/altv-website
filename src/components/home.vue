<template>
    <div class="main">
        <div class="wrapper">
            <div class="text">
                <h1>alt:V Multiplayer</h1>
                <p>
                    A free alternative multiplayer client for GTA:V.
                    <br />Our client provides perfect synchronization on custom dedicated servers.
                    <br />Play with your friends and make your own gamemodes with JS, C# and much more.
                </p>
                <router-link class="stats" to="/servers" v-on:click.native="closeMenuButton">
                <!-- <a class="stats" href="https://altstats.net/" target="_blank"> -->
                    <span class="players">
                        Players online: <i>{{ playerCount }}</i>
                    </span>
                    <span class="servers">
                        Servers online: <i>{{ serverCount }}</i>
                    </span>
                </router-link>
                <div class="sep"></div>
                <router-link class="btn" to="/downloads">download</router-link>
                <span class="launch">
                    Before starting, unpack
                    <i>altv.exe</i> to an empty folder.
                    <br />Run as administrator.
                </span>
            </div>
            <div class="vid">
                <iframe src="https://www.youtube-nocookie.com/embed/TpQvhqLfjDw" frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
            </div>
        </div>
        <div class="copyright">
            <p>
                Grand Theft Auto and Grand Theft Auto: V are registered trademarks of Take-Two Interactive Software.
                <br />Any trademarks used belong to their respective owners. alt:V Multiplayer and altMP Project are not
                affiliated with or endorsed by Take-Two Interactive Software.
                <br />alt:V Multiplayer and altMP Project do not host any user-made servers and is not responsible for
                user-made content. All user-made content are the property of their respective owners.
                <br />
            </p>
        </div>
        <div class="socialMobile">
            <a target="_blank" href="https://discord.altv.mp">
                <i class="fab fa-discord"></i>
            </a>
            <a target="_blank" href="https://twitter.com/altVMP">
                <i class="fab fa-twitter"></i>
            </a>
            <a target="_blank" href="https://github.com/altmp">
                <i class="fab fa-github"></i>
            </a>
            <a target="_blank" href="https://instagram.com/altvmp/">
                <i class="fab fa-instagram"></i>
            </a>
            <a target="_blank" href="https://www.youtube.com/c/altVMP">
                <i class="fab fa-youtube"></i>
            </a>
            <a target="_blank" href="https://facebook.com/altvmp/">
                <i class="fab fa-facebook"></i>
            </a>
            <a target="_blank" href="https://www.patreon.com/altVMP">
                <i class="fab fa-patreon"></i>
            </a>
        </div>
    </div>
</template>

<script>
    import {
        getRequest
    } from '@/utility/fetch'

    export default {
        data() {
            return {
                playerCount: 0,
                serverCount: 0
            }
        },
        beforeCreate() {
            document.body.className = 'home';
        },
        methods: {
            async fetchPlayers() {
                const data = await getRequest('https://api.altv.mp/servers/');

                if (!data) {
                    return;
                }

                this.playerCount = data.playersCount;
                this.serverCount = data.serversCount;
            }
        },
        mounted() {
            this.fetchPlayers()
        }
    };
</script>

<style scoped>
    .main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .wrapper {
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: space-around;
        align-items: center;
        max-width: 1800px;
    }

    .text h1 {
        font-size: 48px;
        margin: 0;
        font-weight: 700;
    }

    .text p {
        font-size: 15px;
        margin: 30px 0;
        margin-bottom: 15px;
        font-weight: 400;
        letter-spacing: 0.5px;
        line-height: 25px;
        opacity: 0.7;
    }

    .text .stats {
        margin-bottom: 30px;
        display: inline-block;
        text-decoration: none;
    }

    .text .stats span {
        display: inline-block;
        margin-right: 15px;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 13px;
        color: rgba(255, 255, 255, .35);
        transition: color .2s;
    }

    .text .stats:hover span {
        color: rgba(255, 255, 255, .5);
    }

    .text .stats span i {
        color: rgba(255, 255, 255, .6);
        margin-left: 3px;
        font-weight: 600;
        transition: color .2s;
    }

    .text .stats:hover span i {
        color: rgba(255, 255, 255, .75);
    }

    .text .stats span i {
        font-style: normal;
    }

    .text .sep {
        display: block;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, rgba(255, 255, 255, 0.075), rgba(0, 0, 0, 0));
        margin-bottom: 30px;
    }

    .text .launch {
        display: inline-block;
        vertical-align: middle;
        margin-left: 30px;
        font-weight: 500;
        letter-spacing: 0.5px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
        line-height: 17px;
    }

    .text .launch i {
        font-style: normal;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.5);
    }

    .vid {
        width: calc(250px + 17vw);
        height: 320px;
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.7);
    }

    .vid iframe {
        width: 100%;
        height: 100%;
    }

    .copyright {
        text-align: center;
        font-size: 11px;
        letter-spacing: 0.5px;
        line-height: 20px;
        opacity: 0.2;
    }

    .socialMobile {
        opacity: 0.5;
        font-size: 18px;
        display: none;
        padding: 30px;
    }

    .socialMobile a {
        color: #eee;
        text-decoration: none;
        transition: all 0.2s;
        margin-left: 15px;
    }

    @media screen and (max-width: 1440px) {
        .text h1 {
            font-size: 38px;
        }

        .text p {
            font-size: 14px;
            margin: 25px 0;
            line-height: 23px;
        }

        .text .sep {
            margin-bottom: 25px;
        }

        .text .launch {
            margin-left: 20px;
            width: 40%;
            line-height: 20px;
            vertical-align: middle;
        }
    }

    @media screen and (max-width: 1024px) {
        .text {
            padding-right: 30px;
        }

        .text h1 {
            font-size: 36px;
        }

        .text p {
            font-size: 13px;
            margin: 20px 0;
            line-height: 20px;
        }

        .text .sep {
            margin-bottom: 20px;
        }

        .text .launch {
            display: block;
            margin-left: 0;
            margin-top: 20px;
            width: 100%;
        }

        .vid {
            height: 250px;
        }

        .copyright {
            line-height: 18px;
            letter-spacing: 0.2px;
            zoom: 80%;
        }
    }

    @media screen and (max-width: 768px) {
        .wrapper {
            flex-direction: column;
        }

        .text p {
            font-size: 12px;
            margin: 20px 0;
            line-height: 20px;
        }

        .text p br {
            display: none;
        }

        .vid {
            display: none;
        }

        .copyright {
            display: none;
        }

        .socialMobile {
            display: block;
        }
    }
</style>
