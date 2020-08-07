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
                <div class="color green">
                    #008736
                </div>
                <div class="color white">
                    #F1F2F2
                </div>
                <div class="color dark">
                    #2D2D2D
                </div>
                <div class="color black">
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