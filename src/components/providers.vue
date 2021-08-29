<template>
    <div class="main">
        <div class="wrapper">
            <div class="title">
                <h1>verified hosting providers</h1>
                <p>
		Using one of our verified alt:V hosting providers is the easiest way to host your own server 
		<br />without the need of any server administration knowledge.
                </p>
            </div>
            <div class="container">
		<a class="item" href="https://aksunucum.com/cart.php?gid=17">
			<img src="@/assets/providers/aksunucum.png" alt="">
                </a>
                <a class="item" href="https://citadelservers.com/game-servers/grand-theft-auto-alt-v-game-hosting">
                        <img src="@/assets/providers/citadelservers.png" alt="">
                </a>
                <a class="item" href="https://clans.hu/jatekszerver-berles/altv">
                        <img src="@/assets/providers/clanshu.png" alt="">
                </a>
		<a class="item" href="https://deinserverhost.de/altv-server-mieten">
			<img src="@/assets/providers/deinserverhost.svg" alt="">
                </a>
		<a class="item" href="https://www.g-portal.com/altV">
                        <img src="@/assets/providers/gportal.png" alt="">
                </a>
                <a class="item" href="https://iceline-hosting.com/altv-hosting">
			<img src="@/assets/providers/iceline-hosting.png" alt="">
                </a>
		<a class="item" href="https://www.ips-hosting.com/game-servers/altv">
                        <img src="@/assets/providers/ips-hosting.png" alt="">
                </a>
                <a class="item" href="https://lordhosting.fr/altv.php">
			<img src="@/assets/providers/lordhosting.png" alt="">
		</a>
                <a class="item" href="https://www.nexus-games.com/">
			<img src="@/assets/providers/nexus-games.png" alt="">
		</a>
                <a class="item" href="https://admin.serverproject.eu/order/create?product=altv">
			<img src="@/assets/providers/serverproject.png" alt="">
                </a>
		<a class="item" href="https://www.slimmweb.com/gta5-altv-sunucu-kirala">
                        <img src="@/assets/providers/slimmweb.png" alt="">
                </a>
		<a class="item" href="https://www.srkhost.eu/services/altv">
			<img src="@/assets/providers/srkhost.png" alt="">
		</a>
		<a class="item" href="https://techkings.de/spiele/gta-5?mtm_campaign=altv">
                        <img src="@/assets/providers/techkings.png" alt="">
                </a>
		<a class="item" href="https://vibegames.net/game-hosting/altv">
                        <img src="@/assets/providers/vibegames.png" alt="">
                </a>
		<a class="item" href="https://zap-hosting.com/de/shop/product/cloud-gameserver/five-altv-linux/">
			<img src="@/assets/providers/zap-hosting.png" alt="">
		</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        beforeCreate() {
            document.body.className = 'providers';
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
        margin: 50px 0;
        width: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .title {
        margin-bottom: 30px;
        text-align: center;
    }

    .title h1 {
        text-transform: uppercase;
        font-weight: 900;
        font-size: 38px;
        margin-top: 0;
    }

    .title p {
        margin: 25px 0;
        letter-spacing: .3px;
        line-height: 25px;
        font-size: 15px;
        font-weight: 500;
        color: rgba(255, 255, 255, .7);
    }

    .title p a {
        font-weight: 700;
        text-decoration: none;
        position: relative;
        color: #eee;
    }

    .title p a::before {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background: #eee;
        -webkit-transition: all .2s;
        -o-transition: all .2s;
        transition: all .2s;
    }

    .title p a:hover::before {
        width: 100%;
    }

    .container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 50%;
        max-width: 1024px;
    }

    .container .item {
        display: inline-flex;
        align-items: center;
        position: relative;
        justify-content: center;
        background: rgba(255, 255, 255, .04);
        border: 1px solid rgba(255, 255, 255, .2);
        height: 200px;
        border-radius: 10px;
        margin: 12px;
        box-sizing: border-box;
        overflow: hidden;
        transition: background .2s, border .2s;
    }

    .container .item:hover {
        background: rgba(255, 255, 255, .07);
        border: 1px solid rgba(255, 255, 255, .4);
    }

    .container .item img {
        max-width: 80%;
        height: auto;
        object-fit: cover;
    }

    @media screen and (max-width: 1024px) {
        .title {
            margin-bottom: 20px;
        }

        .title h1 {
            font-size: 30px;
        }

        .title p {
            font-size: 13px;
        }

        .container {
            width: calc(100% - 30px);
        }
    }
</style>
