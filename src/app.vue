<template>
  <div>
    <div class="nav">
      <div class="logos">
        <div class="home">
          <router-link to="/">
            <img src="img/v_logo.svg" alt="">
          </router-link>
        </div>
      </div>
      <div :class="{ menu: true, active: isMenuActive }" id="menu">
        <router-link to="/" v-on:click.native="closeMenuButton">home</router-link>
        <router-link to="/downloads" v-on:click.native="closeMenuButton">downloads</router-link>
        <a href="https://forum.altv.mp/">forums</a>
        <a href="https://wiki.altv.mp/">wiki</a>
        <a href="https://natives.altv.mp/">natives</a>
        <!--<a href="https://servers.altv.mp/">servers</a>-->
        <button id="closebutton" @click="closeMenuButton">
          &times;
        </button>
      </div>
      <div class="social">
        <a target="_blank" href="https://discord.gg/q3zUUEC">
          <i class="fab fa-discord"></i>
        </a>
        <a target="_blank" href="https://twitter.com/altVMP">
          <i class="fab fa-twitter"></i>
        </a>
        <a target="_blank" href="https://vk.com/altvmp">
          <i class="fab fa-vk"></i>
        </a>
        <a target="_blank" href="https://www.youtube.com/c/altVMP">
          <i class="fab fa-youtube"></i>
        </a>
        <a target="_blank" href="https://www.patreon.com/altVMP">
          <i class="fab fa-patreon"></i>
        </a>
      </div>
      <div @click="openMenuButton" class="burger" id="openbutton">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isMenuActive: false
    }
  },
  methods: {
    openMenuButton () {
      this.isMenuActive = true
    },
    closeMenuButton () {
      this.isMenuActive = false
    }
  }
}
</script>

<style>
  *:focus {
    outline: 0;
  }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, sans-serif;
    color: #eee;
    background-color: #1b1b1b;
    user-select: none;
  }
  body::before {
    content: "";
    background: url('/img/back.png') no-repeat center/cover;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    transition: opacity .3s;
    opacity: .15;
  }
  body.home::before {
    opacity: 1;
  }
  .nav {
    background: rgba(34, 34, 34, .7);
    border-bottom: 1px solid rgba(238, 238, 238, .02);
    height: 85px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 30px;
    width: 100%;
    z-index: 999;
  }
  .nav .logos,
  .nav .social {
    flex: 2;
  }
  .nav .logos, .nav .logos .altlist {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .nav .logos .home {
    margin-right: 15px;
  }
  .nav .logos .home img {
    width: 40px;
  }
  .nav .logos .altlist a {
    opacity: .5;
    transition: all .2s;
    margin-left: 10px;
  }
  .nav .logos .altlist a:hover {
    opacity: .8;
  }
  .nav .logos .altlist a img {
    width: 17px;
  }
  .nav .menu {
    display: inline-block;
  }
  .nav .menu a {
    color: #eee;
    text-transform: uppercase;
    margin: 0 10px;
    opacity: .5;
    transition: all .2s;
    text-decoration: none;
    font-weight: 500;
    font-size: 12px;
    letter-spacing: 1.5px;
  }
  .nav .menu a:hover {
    opacity: 1;
  }
  .nav .menu button {
    background: none;
    border: none;
    color: #999;
    position: absolute;
    top: 19px;
    right: 29px;
    font-size: 36px;
    padding: 0;
    display: none;
  }
  .nav .social {
    text-align: right;
  }
  .nav .social a {
    color: #eee;
    text-decoration: none;
    opacity: .5;
    font-size: 17px;
    margin-left: 15px;
    transition: all .2s;
  }
  .nav .social a:hover {
    opacity: 1;
  }
  .nav .burger {
    display: none;
  }
  .nav .burger span {
    display: block;
    width: 22px;
    height: 2px;
    margin: 4px 0;
    background: #999;
  }
  .main {
    width: 100%;
    height: calc(100vh - 85px);
    padding: 20px;
    box-sizing: border-box;
    position: relative;
  }
  .fade-enter-active, .fade-leave-to {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .btn {
    display: inline-block;
    padding: 15px 30px;
    font-size: 15px;
    font-weight: 600;
    background: rgba(255,255,255,.075);
    color: #eee;
    text-decoration: none;
    text-transform: uppercase;
    border-radius: 5px;
    letter-spacing: 1px;
    transition: all .2s;
    margin-bottom: 5px;
  }
  .btn.small {
    padding: 10px 30px;
    opacity: .8;
    font-size: 13px;
  }
  .btn:hover {
    background: rgba(255,255,255,.12);
  }
  .btn i {
    font-style: normal;
    font-size: 10px;
    font-weight: 400;
    vertical-align: middle;
    opacity: .4;
    letter-spacing: 0;
    margin-left: 5px;
  }
  @media screen and (max-width: 1024px) {
    .nav .logos {
      flex: none;
      margin-right: 20px;
    }
    .nav .menu a {
      margin: 0 5px;
    }
  }
  @media screen and (max-width: 768px) {
    .nav {
      position: relative;
    }
    .nav .burger {
      display: inline-block;
    }
    .nav .menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #222;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 99;
      opacity: 0;
      visibility: hidden;
      transition: all .3s;
    }
    .nav .menu.active {
      opacity: .96;
      visibility: visible;
    }
    .nav .menu a {
      font-size: 14px;
      padding: 20px;
    }
    .nav .menu button {
      display: block;
    }
    .nav .social {
      display: none;
    }
    .btn {
      font-size: 13px;
      padding: 15px 25px;
    }
  }
</style>
