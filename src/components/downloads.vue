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
                    Downloads are unavailable on mobile devices, please visit this page from a desktop.
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
                        <a class="help" href="https://wiki.altv.mp/wiki/Tutorial:Troubleshoot_Client" target="_blank">
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
                                <input
                                    type="checkbox"
                                    name="os"
                                    :checked="options.arch === 'x64_linux'"
                                    @change="onChangeOs"
                                />

                                <!-- if checked – linux! !-->
                                <div class="switch"></div>
                                Linux
                            </label>
                        </div>
                        <div class="branch">
                            <select @change="updateServerVersion" v-model="options.branch" name="branch">
                                <option value="release" selected>Release</option>
                                <option value="rc">Release candidate</option>
                                <option value="dev">Development</option>
                            </select>
                        </div>
                        <div class="addons">
                            <DownloadCheckbox name="data-files" v-model="options.include">
                                Data files
                            </DownloadCheckbox>

                            <DownloadCheckbox name="js-module" v-model="options.include">
                                JS Module
                            </DownloadCheckbox>

                            <DownloadCheckbox name="csharp-module" v-model="options.include">
                                C# Module
                            </DownloadCheckbox>

                            <DownloadCheckbox name="sample-config" v-model="options.include">
                                Sample config file
                            </DownloadCheckbox>

                            <DownloadCheckbox name="example-resources" v-model="options.include">
                                Example resource pack
                            </DownloadCheckbox>
                        </div>
                    </div>
                    <a href="#" @click="tryBundleServe" :disabled="isBundling" class="btn">
                        <span v-if="!isBundling">
                            Download <i>Build #{{ version }}</i>
                        </span>
                        <span v-else> {{ progress.toFixed(1) }}% </span>
                    </a>
                    <p class="dlMobile">
                        Downloads are unavailable on mobile devices, please visit this page from a desktop.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DownloadCheckbox from './download-checkbox.vue'
    import axios from 'axios';
    import { Zip, AsyncZipDeflate, unzip } from 'fflate';
    import { saveAs } from 'file-saver';

    export default {
        components: {
            DownloadCheckbox
        },
        data() {
            return {
                version: '...',
                isBundling: false,
                progress: 0.0,
                files: {},
                options: {
                    branch: 'release',
                    arch: 'x64_win32',
                    include: []
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
            onChangeOs(e) {
                this.options.arch = e.target.checked ? 'x64_linux' : 'x64_win32'
                this.updateServerVersion()
            },
            async updateServerVersion() {
                this.version = '...';

                this.options.include = [];

                const res = await axios.get(`https://cdn.altv.mp/server/${this.options.branch}/${this.options.arch}/update.json`);
                this.version = res.data.version;
            },
            hasModule(name) {
                return this.options.include.includes(name);
            },
            addFiles(files) {
                Object.assign(this.files, files);
            },
            async addFolder(path, prefix) {
                try {
                    const manifest = await (await fetch(`${path}/update.json`)).json();

                    Object.keys(manifest.hashList)
                        .forEach((fPath) => {
                            if (prefix !== undefined) {
                                fPath = `${prefix}/${fPath}`
                            }

                            this.addFiles({
                                [fPath]: `${path}/${fPath}`
                            });
                        });
                } catch (e) {
                    alert(`Failed to download ${path}. ${e.message}`)
                }
            },
            async bundleServer() {
                const branch = this.options.branch;
                const arch = this.options.arch;

                const serverBinName = arch === 'x64_win32' ? 'altv-server.exe' : 'altv-server';
                this.addFiles({
                    [serverBinName]: `https://cdn.altv.mp/server/${branch}/${arch}/${serverBinName}`
                });

                if (this.hasModule('data-files')) {
                    this.addFiles({
                        'data/vehmodels.bin': `https://cdn.altv.mp/server/${branch}/${arch}/data/vehmodels.bin`,
                        'data/vehmods.bin': `https://cdn.altv.mp/server/${branch}/${arch}/data/vehmods.bin`
                    });

                    if (branch !== 'release') {
                        this.addFiles({
                            'data/clothes.bin': `https://cdn.altv.mp/server/${branch}/${arch}/data/clothes.bin`
                        });
                    }
                }

                if (this.hasModule('js-module')) {
                    await this.addFolder(`https://cdn.altv.mp/js-module/${branch}/${arch}`);
                }

                if (this.hasModule('csharp-module')) {
                    await this.addFolder(`https://cdn.altv.mp/coreclr-module/${branch}/${arch}`);
                }

                if (this.hasModule('sample-config')) {
                    this.addFiles({
                        'server.cfg': 'https://cdn.altv.mp/others/server.cfg'
                    });
                }

                // console.log(this.files);

                const files = Object.entries(this.files);
                const progressPerFile = !this.hasModule('example-resources')
                    ? 90 / files.length // 10% for zipping
                    : 80 / files.length // 10% for zipping, 10% for example resources

                const zip = new Zip();
                const stream = new ReadableStream({
                    start(controller) {
                        zip.ondata = (err, chunk, final) => {
                            if (err) {
                                writable.abort(err.message);
                            }

                            controller.enqueue(chunk);

                            if (final) {
                                controller.close();
                            }
                        }
                    }
                });

                const tasks = files.map(([path, url]) => {
                    const fStream = new AsyncZipDeflate(path, { level: 1 });
                    zip.add(fStream);

                    return fetch(url)
                        .then(res => res.arrayBuffer())
                        .then(data => {
                            this.progress += progressPerFile;
                            fStream.push(new Uint8Array(data), true);
                        });
                });

                if (this.hasModule('example-resources')) {
                    tasks.push(fetch('https://cdn.altv.mp/samples/resources.zip')
                        .then(res => res.arrayBuffer())
                        .then(data => new Promise((resolve, reject) => {
                            this.progress += 5;
                            
                            unzip(new Uint8Array(data), (err, files) => {
                                this.progress += 5;

                                if (err) {
                                    return reject(err);
                                }

                                Object.keys(files)
                                    .forEach(path => {
                                        const fStream = new AsyncZipDeflate(path, { level: 1 });
                                        zip.add(fStream);

                                        fStream.push(files[path], true);
                                    });
                                
                                resolve();
                            })
                        })))
                }

                await Promise.all(tasks);
                zip.end();

                const blob = await (new Response(stream).blob());
                this.progress = 100;
                
                saveAs(blob, 'altv-server.zip');
            },
            async tryBundleServe() {
                if (this.isBundling) return;
                this.isBundling = true;

                try {
                    await this.bundleServer();
                } catch (e) {
                    alert(`Failed to bundle server! Please, contact us on Discord!\nError: ${e.message}`);
                }

                this.progress = 0;
                this.files = {};

                this.isBundling = false;
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
