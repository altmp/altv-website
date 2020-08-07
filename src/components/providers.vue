<template>
    <div class="main">
        <div class="wrapper">
            <div class="title">
                <h1>Server hosting providers</h1>
                <p>
                    Want to host alt:V Server at a professional provider?
                    <br> This page provides a list of verified ones.
                </p>
            </div>
            <div class="container">
                <a class="item" href="https://www.power-host.org/">
                    <img src="@/assets/providers/powerhost.svg" alt="">
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
        width: 240px;
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