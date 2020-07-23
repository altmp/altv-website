<template>
    <div class="main">
        <div class="wrapper">
            <div class="title">
                <h1>Downloads</h1>
                <p>
                    By downloading you accept our<br />
                    <a href="terms-of-service.pdf">Terms Of Service</a> and <a href="#">Privacy Policy</a>
                </p>
                <p class="dlMobile">
                    Downloads are unavaliable from mobile devices, please visit this page from a desktop.
                </p>
            </div>
            <div class="container">
                <div class="dl client">
                    <h2>Client</h2>
                    <p>
                        Installer / Updater: <b>~2MB</b><br />
                        Full client: <b>~170MB</b>
                    </p>
                    <div class="action">
                        <a href="https://cdn.altv.mp/altv-release.zip" class="btn">
                            Download
                        </a>
                        <a class="help" href="https://wiki.altv.mp/Troubleshooting" target="_blank">
                            Need help?
                        </a>
                    </div>
                </div>
                <!-- <div class="separator"></div> -->
                <div class="dl server">
                    <h2>Server</h2>
                    <div class="options">
                        <div class="os">
                            <label>
                                Windows
                                <input @change="updateServerVersion" type="checkbox"
                                    v-model="serverGeneratorForm.isLinux" name="os" />
                                <!-- if checked – linux! !-->
                                <div class="switch"></div>
                                Linux
                            </label>
                        </div>
                        <div class="branch">
                            <select @change="updateServerVersion" v-model="serverGeneratorForm.branch" name="branch">
                                <option value="release" selected>Release</option>
                                <option value="rc">Release candidate</option>
                                <option value="dev">Development</option>
                            </select>
                        </div>
                        <div class="addons">
                            <label>
                                <input v-model="serverGeneratorForm.includeDataFiles" type="checkbox" name="" />
                                <div class="check"></div>
                                Data files
                            </label>
                            <label v-if="serverGeneratorForm.branch == 'release'">
                                <input v-model="serverGeneratorForm.includeNodeJS" type="checkbox" name="" />
                                <div class="check"></div>
                                NodeJS Module
                                <!--<span class="notice">Deprecated</span>-->
                            </label>
                            <label v-if="serverGeneratorForm.branch != 'release'">
                                <input v-model="serverGeneratorForm.includeJS" type="checkbox" name="" />
                                <div class="check"></div>
                                JS Module
                            </label>
                            <label>
                                <input v-model="serverGeneratorForm.includeCsharp" type="checkbox" name="" />
                                <div class="check"></div>
                                C# Module
                            </label>
                            <label>
                                <input type="checkbox" v-model="serverGeneratorForm.includeSampleConfig" name="" />
                                <div class="check"></div>
                                Sample config file
                            </label>
                            <label>
                                <input type="checkbox" v-model="serverGeneratorForm.includeSampleResources" name="" />
                                <div class="check"></div>
                                Example resource pack
                            </label>
                        </div>
                    </div>
                    <a href="#" @click="bundleServer()" :disabled="serverGeneratorForm.isBundling" class="btn">
                        <span v-if="!serverGeneratorForm.isBundling">
                            Download <i>Build #{{ latestServerBuild }}</i>
                        </span>
                        <span v-else> {{ serverGeneratorForm.progress }}% </span>
                    </a>
                    <p class="dlMobile">
                        Downloads are unavaliable from mobile devices, please visit this page from a desktop.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import JSZip from 'jszip';
    import {
        saveAs
    } from 'file-saver';

    /* axios.defaults.params = {
      salt: Math.random().toString(36).substring(7)
    } */

    let Promise = window.Promise;
    if (!Promise) {
        Promise = JSZip.external.Promise;
    }

    export default {
        data() {
            return {
                latestServerBuild: '...',
                serverGeneratorForm: {
                    branch: 'release',
                    isLinux: false,
                    includeDataFiles: false,
                    includeNodeJS: false,
                    includeJS: false,
                    includeCsharp: false,
                    includeSampleConfig: false,
                    includeSampleResources: false,
                    isBundling: false,
                    progress: 0.0
                }
            };
        },
        created() {
            this.updateServerVersion();
        },
        beforeCreate() {
            document.body.className = 'downloads';
        },
        methods: {
            updateServerVersion() {
                this.latestServerBuild = '...';
                const target = this.serverGeneratorForm.isLinux ? 'x64_linux' : 'x64_win32';
                const branch = this.serverGeneratorForm.branch;
                this.serverGeneratorForm.includeDataFiles = false;
                this.serverGeneratorForm.includeNodeJS = false;
                this.serverGeneratorForm.includeJS = false;
                this.serverGeneratorForm.includeCsharp = false;
                this.serverGeneratorForm.includeSampleConfig = false;
                this.serverGeneratorForm.includeSampleResources = false;
                return axios.get(`https://cdn.altv.mp/server/${branch}/${target}/update.json`).then(serverInfo => {
                    this.latestServerBuild = serverInfo.data.latestBuildNumber;
                });
            },
            bundleServer: function () {
                this.serverGeneratorForm.isBundling = true;
                const zip = new JSZip();
                const target = this.serverGeneratorForm.isLinux ? 'x64_linux' : 'x64_win32';
                const branch = this.serverGeneratorForm.branch;

                const downloadFile = function (url) {
                    return new Promise((resolve, reject) => {
                        return axios
                            .get(url, {
                                responseType: 'blob'
                            })
                            .then(res => resolve(res.data))
                            .catch(err => reject(err));
                    });
                };

                let files = [];
                files.push({
                    url: `https://cdn.altv.mp/server/${branch}/${target}/altv-server` +
                        (!this.serverGeneratorForm.isLinux ? '.exe' : ''),
                    path: 'altv-server' + (!this.serverGeneratorForm.isLinux ? '.exe' : '')
                });

                if (this.serverGeneratorForm.includeDataFiles) {
                    files.push({
                        url: `https://cdn.altv.mp/server/${branch}/${target}/data/vehmodels.bin`,
                        path: 'data/vehmodels.bin'
                    });
                    files.push({
                        url: `https://cdn.altv.mp/server/${branch}/${target}/data/vehmods.bin`,
                        path: 'data/vehmods.bin'
                    });
                }

                if (this.serverGeneratorForm.includeNodeJS) {
                    files.push({
                        url: `https://cdn.altv.mp/node-module/${branch}/${target}/modules/` +
                            (!this.serverGeneratorForm.isLinux ? 'node-module.dll' : 'libnode-module.so'),
                        path: 'modules/' + (!this.serverGeneratorForm.isLinux ? 'node-module.dll' :
                            'libnode-module.so')
                    });

                    files.push({
                        url: `https://cdn.altv.mp/node-module/${branch}/${target}/` +
                            (!this.serverGeneratorForm.isLinux ? 'libnode.dll' : 'libnode.so.72'),
                        path: !this.serverGeneratorForm.isLinux ? 'libnode.dll' : 'libnode.so.72'
                    });
                }

                if (this.serverGeneratorForm.includeJS) {
                    files.push({
                        url: `https://cdn.altv.mp/js-module/${branch}/${target}/modules/js-module/` +
                            (!this.serverGeneratorForm.isLinux ? 'js-module.dll' : 'libjs-module.so'),
                        path: 'modules/js-module/' + (!this.serverGeneratorForm.isLinux ? 'js-module.dll' :
                            'libjs-module.so')
                    });

                    files.push({
                        url: `https://cdn.altv.mp/js-module/${branch}/${target}/modules/js-module/` +
                            (!this.serverGeneratorForm.isLinux ? 'libnode.dll' : 'libnode.so.72'),
                        path: 'modules/js-module/' + (!this.serverGeneratorForm.isLinux ? 'libnode.dll' :
                            'libnode.so.72')
                    });
                }

                if (this.serverGeneratorForm.includeCsharp) {
                    files.push({
                        url: `https://cdn.altv.mp/coreclr-module/${branch}/${target}/modules/` +
                            (!this.serverGeneratorForm.isLinux ? 'csharp-module.dll' :
                                'libcsharp-module.so'),
                        path: 'modules/' + (!this.serverGeneratorForm.isLinux ? 'csharp-module.dll' :
                            'libcsharp-module.so')
                    });

                    files.push({
                        url: `https://cdn.altv.mp/coreclr-module/${branch}/${target}/AltV.Net.Host.dll`,
                        path: 'AltV.Net.Host.dll'
                    });

                    files.push({
                        url: `https://cdn.altv.mp/coreclr-module/${branch}/${target}/AltV.Net.Host.runtimeconfig.json`,
                        path: 'AltV.Net.Host.runtimeconfig.json'
                    });
                }

                if (this.serverGeneratorForm.isLinux) {
                    files.push({
                        url: 'https://cdn.altv.mp/others/start.sh',
                        path: 'start.sh'
                    });
                }

                if (this.serverGeneratorForm.includeSampleConfig) {
                    files.push({
                        url: 'https://cdn.altv.mp/others/server.cfg',
                        path: 'server.cfg'
                    });
                }

                for (const file of files) {
                    zip.file(file.path, downloadFile(file.url), {
                        binary: true
                    });
                }

                new Promise((resolve, reject) => {
                    if (this.serverGeneratorForm.includeSampleResources) {
                        return downloadFile('https://cdn.altv.mp/samples/resources.zip')
                            .then(JSZip.loadAsync)
                            .then(resourceZip => {
                                // eslint-disable-next-line no-debugger
                                debugger;
                                resourceZip.forEach((relativePath, file) => {
                                    if (!file.dir) {
                                        zip.file(relativePath, file.async('blob'), {
                                            binary: true
                                        });
                                    }
                                });
                                resolve();
                            });
                    }
                    return resolve();
                }).then(() => {
                    return zip
                        .generateAsync({
                            type: 'blob'
                        }, metadata => {
                            this.serverGeneratorForm.progress = Math.round(metadata.percent);
                        })
                        .then(blob => {
                            this.serverGeneratorForm.isBundling = false;
                            saveAs(blob, 'altv-server.zip');
                        })
                        .catch(e => {
                            this.serverGeneratorForm.isBundling = false;
                            alert('Failed to bundle server! Please, contact us on Discord! Error: ' + e
                                .message);
                        });
                });
            }
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

    .title p,
    .dl p {
        margin: 25px 0;
        letter-spacing: 0.3px;
        line-height: 25px;
        font-size: 15px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
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
        -webkit-transition: all 0.2s;
        -o-transition: all 0.2s;
        transition: all 0.2s;
    }

    .title p a:hover::before {
        width: 100%;
    }

    .dlMobile {
        display: none;
    }

    .container {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 50%;
        max-width: 1024px;
    }

    .separator {
        width: 2px;
        height: 80%;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0));
        opacity: 0.1;
        -ms-flex-item-align: center;
        -ms-grid-row-align: center;
        align-self: center;
        margin: 0 50px;
    }

    .dl {
        min-width: 240px;
        padding: 0 30px;
        display: flex;
        flex-direction: column;
    }

    .dl h2 {
        text-transform: uppercase;
        font-size: 28px;
        letter-spacing: 1px;
        margin: 0;
    }

    .dl p b,
    .dl p a {
        color: #eee;
    }

    .dl.client {
        text-align: right;
        align-items: flex-end;
    }

    .dl.client .action {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .dl.client .help {
        display: inline-block;
        margin-top: 10px;
        color: rgba(255,255,255,.5);
        text-decoration: none;
        font-weight: 400;
        font-size: 14px;
        border-bottom: 1px solid currentColor;
        transition: color .2s;
        padding-bottom: 4px;
    }

    .dl.client .help:hover {
        color: rgba(255,255,255,.7);
    }

    .dl.server {
        align-items: flex-start;
    }

    .options {
        margin: 30px 0;
    }

    .options .os label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .options .os input {
        opacity: 0;
        width: 60px;
        height: 30px;
        position: absolute;
        visibility: hidden;
    }

    .options .os .switch {
        display: inline-block;
        width: 60px;
        height: 29px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 100px;
        position: relative;
        transition: all 0.2s;
    }

    .options .os .switch:hover {
        background: rgba(255, 255, 255, 0.15);
    }

    .options .os .switch::before {
        content: '';
        position: absolute;
        top: 7px;
        left: 7px;
        width: 15px;
        height: 15px;
        background: #eee;
        border-radius: 100px;
        transition: all 0.2s;
    }

    .options .os input:checked+.switch::before {
        transform: translateX(200%);
    }

    .options .branch select {
        border: 0;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        font-size: 15px;
        font-weight: 500;
    }

    .options .branch select option {
        background: #1a1a1a;
    }

    .options .addons label {
        display: block;
        margin: 10px 0;
    }

    .options .addons input {
        position: absolute;
        visibility: hidden;
        opacity: 0;
    }

    .options .addons .check {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        margin-right: 10px;
        transition: all 0.2s;
        text-align: center;
        vertical-align: middle;
    }

    .options .addons label:hover .check {
        background: rgba(255, 255, 255, 0.15);
    }

    .options .addons .check::before {
        font-family: 'Font Awesome 5 Free';
        content: '\f00c';
        font-size: 10px;
        vertical-align: middle;
        opacity: 0;
        transition: all 0.2s;
    }

    .options .addons input:checked+.check::before {
        opacity: 1;
    }

    .options .addons .notice {
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 500;
        opacity: .4;
        letter-spacing: .6px;
        margin-left: 13px;
        margin-top: 4px;
        position: absolute;
    }

    @media screen and (max-width: 1024px) {
        .title {
            margin-bottom: 20px;
        }

        .title h1 {
            font-size: 30px;
        }

        .title p,
        .dl p {
            font-size: 13px;
        }

        .container {
            width: calc(100% - 30px);
        }

        .dl h2 {
            font-size: 24px;
        }

        .options {
            font-size: 14px;
        }
    }

    @media screen and (max-width: 768px) {

        .container,
        .title p:not(.dlMobile) {
            display: none;
        }

        .dlMobile {
            display: block;
        }
    }
</style>