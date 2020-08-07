<template>
    <div class="main">
        <div class="intro">
            <img src="@/assets/v_logo.svg" alt="">
            <h1>
                alt:V Multiplayer
                <br> <span>Branding</span>
            </h1>
        </div>
        <div class="item fonts">
            <span class="title">
                Fonts
                <span></span>
            </span>
            <div class="head">
                <h2>
                    <a href="https://rsms.me/inter/" target="_blank">Inter</a>
                </h2>
                <span>by Rasmus Andersson</span>
            </div>
            <div class="samples">
                <span class="regular">
                    Regular
                </span>
                <span class="medium">
                    Medium
                </span>
                <span class="bold">
                    Bold
                </span>
                <span class="extrabold">
                    ExtraBold
                </span>
            </div>
        </div>
        <div class="item colors">
            <span class="title">
                Colors
                <span></span>
            </span>
            <div class="wrapper">
                <div class="color green" @click="copy('#008736', $event)">
                    #008736
                </div>
                <div class="color white" @click="copy('#F1F2F2', $event)">
                    #F1F2F2
                </div>
                <div class="color dark" @click="copy('#2D2D2D', $event)">
                    #2D2D2D
                </div>
                <div class="color black" @click="copy('#1F1F1F', $event)">
                    #1F1F1F
                </div>
            </div>
        </div>
        <div class="item logos">
            <span class="title">
                Logo
                <span></span>
            </span>
            <div class="wrapper">
                <div class="logo">
                    <div class="preview">
                        <img src="/branding/svg/logo.svg" alt="">
                    </div>
                    <div class="info">
                        Green
                        <div class="links">
                            <a href="/branding/svg/logo.svg">SVG</a>
                            <a href="/branding/png/logo.png">PNG</a>
                        </div>
                    </div>
                </div>
                <div class="logo">
                    <div class="preview">
                        <img src="/branding/svg/logo_black.svg" alt="">
                    </div>
                    <div class="info">
                        Dark
                        <div class="links">
                            <a href="/branding/svg/logo_black.svg">SVG</a>
                            <a href="/branding/png/logo_black.png">PNG</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="item naming">
            <span class="title">
                Naming
                <span></span>
            </span>
            <div class="name correct">
                <div class="rate">
                    <i class="fas fa-check-circle fa-fw"></i>
                    Correct:
                </div>
                <span>alt:V Multiplayer, in short alt:V by the altMP Team</span>
            </div>
            <div class="name incorrect">
                <div class="rate">
                    <i class="fas fa-times-circle fa-fw"></i>
                    Incorrect:
                </div>
                <span>AltV, altV, ALTV or altV:MP</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            copy(text, event) {
                navigator.clipboard.writeText(text);

                event.target.classList.add('copied');
                setTimeout(() => {
                    event.target.classList.remove('copied');
                }, 3000);
            }
        },
        beforeCreate() {
            document.body.className = 'branding';
        }
    };
</script>

<style scoped>
    .main {
        height: auto;
        max-width: 1000px;
        padding: 20px;
        box-sizing: border-box;
        margin: 5em auto;
    }

    .intro {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .intro img {
        width: 10em;
        margin-right: 2em;
    }

    .intro h1 {
        font-weight: 400;
        font-size: 2.5em;
    }

    .intro h1 span {
        font-weight: 700;
    }

    .item {
        margin-top: 5em;
    }

    .item .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 2.5em;
        margin-bottom: 2rem;
    }

    .item .title span {
        width: 100%;
        margin-left: 1.5em;
        height: 2px;
        background: rgba(255, 255, 255, .1);
    }

    .naming .name {
        margin-bottom: 3em;
    }

    .naming .name .rate {
        margin-bottom: 1rem;
        font-size: 2em;
        font-weight: 600;
    }

    .naming .name .rate i {
        margin-right: .7rem;
    }

    .naming .name.correct .rate i {
        color: #008736;
    }

    .naming .name.incorrect .rate i {
        color: #E20338;
    }


    .naming .name span {
        font-size: 1.5em;
    }

    .fonts .head h2 {
        margin: 0;
        font-size: 7em;
        line-height: 1em;
    }

    .fonts .head h2 a {
        text-decoration: none;
        color: inherit
    }

    .fonts .head span {
        opacity: .7;
    }

    .fonts .samples {
        margin-top: 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 2em;
    }

    .fonts .samples .medium {
        font-weight: 500;
    }

    .fonts .samples .bold {
        font-weight: 700;
    }

    .fonts .samples .extrabold {
        font-weight: 800;
    }

    .colors .wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .colors .color {
        position: relative;
        width: 100%;
        background: green;
        border: 2px solid rgba(255, 255, 255, .1);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        height: 10rem;
        margin: 1rem;
        padding: 1.5rem;
        font-size: 1.5em;
        font-weight: 600;
        box-sizing: border-box;
        border-radius: 8px;
        transition: transform .2s;
    }

    .colors .color:hover {
        transform: scale(.97);
    }

    .colors .color::before {
        content: 'Copied';
        display: inline-block;
        position: absolute;
        top: 2.5em;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 5em;
        background: #1F1F1F;
        color: #eee;
        font-size: 1rem;
        font-weight: 500;
        text-align: center;
        padding: .5em;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 4px 15px 0 rgba(0,0,0,.2);
        transform: translateY(-20%);
        opacity: 0;
        transition: transform .2s, opacity .2s, backdrop-filter .2s;
    }

    .colors .color.copied::before {
        transform: translateY(0);
        opacity: 1;
    }

    .colors .color:first-of-type {
        margin-left: 0;
    }

    .colors .color:last-of-type {
        margin-right: 0;
    }

    .colors .color.green {
        background: #008736;
    }

    .colors .color.white {
        background: #F1F2F2;
        color: #231F20;
    }

    .colors .color.dark {
        background: #2D2D2D;
    }

    .colors .color.black {
        background: #1f1f1f;
    }

    .logos .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logos .logo {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        border: 2px solid rgba(255, 255, 255, .1);
        border-radius: 8px;
        box-sizing: border-box;
        margin: 1em;
    }

    .logos .logo:first-of-type {
        margin-left: 0;
    }

    .logos .logo:last-of-type {
        margin-right: 0;
    }

    .logos .logo .preview {
        width: 37%;
        padding: 2em;
        box-sizing: border-box;
        background-image: linear-gradient(45deg, #2d2d2d 25%, transparent 25%), linear-gradient(-45deg, #2d2d2d 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2d2d2d 75%), linear-gradient(-45deg, transparent 75%, #2d2d2d 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        align-self: stretch;
        display: flex;
        align-items: center;
    }

    .logos .logo .preview img {
        width: 100%;
    }

    .logos .logo .info {
        border-left: 2px solid rgba(255, 255, 255, .1);
        box-sizing: border-box;
        align-self: stretch;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2.5rem;
        font-size: 2.5em;
        font-weight: 600;
    }

    .logos .logo .info a {
        font-size: .8rem;
        background: rgba(255, 255, 255, .1);
        border-radius: 4px;
        color: #eee;
        text-decoration: none;
        padding: 4px 8px;
        margin-right: 8px;
        transition: background .2s;
        font-weight: 400;
    }

    .logos .logo .info a:hover {
        background: rgba(255, 255, 255, .2);
    }

    @media screen and (max-width: 768px) {
        .main {
            font-size: 12px;
        }
        .colors .wrapper,
        .logos .wrapper {
            display: block;
            border-radius: 8px;
            overflow: hidden;
            border: 2px solid rgba(255, 255, 255, .1);
            box-sizing: border-box;
        }
        .colors .color {
            align-items: center;
            height: 4em;
            margin: 0;
            border-radius: 0;
            border: none;
            backdrop-filter: none;
        }
        .colors .color::before {
            top: 0;
            width: 100%;
            height: 100%;
            box-shadow: none;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            background: rgba(0,0,0,.3);
            backdrop-filter: blur(20px);
            transform: translateY(0);
            border-radius: 0;
        }
        .colors .color:hover {
            transform: scale(1);
        }
        .logos .logo {
            margin: 0;
            border-radius: 0;
            border: 0;
        }
        .logos .logo:first-of-type {
            border-bottom: 2px solid rgba(255, 255, 255, .1);
        }
    }

    @media screen and (max-width: 425px) {
        .main {
            font-size: 11px;
        }
    }

    @media screen and (max-width: 385px) {
        .main {
            font-size: 10px;
        }
    }

    @media screen and (max-width: 360px) {
        .intro img {
            width: 8em;
        }
        .intro h1 {
            font-size: 2em;
        }
        .fonts .samples {
            flex-direction: column;
            align-items: flex-start;
        }

        .fonts .samples span {
            padding: .5em 0;
        }
        .logos .logo .preview {
            width: 47%;
        }
        .logos .logo .info {
            padding: 1.5rem;
        }
    }
</style>