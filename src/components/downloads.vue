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
                        Full Client: <b>~170MB</b>
                    </p>
                    <div class="action">
                        <a
                            class="help"
                            href="https://docs.altv.mp/articles/troubleshooting/client.html"
                            target="_blank"
                        >
                            Help & Troubleshooting
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

                            <DownloadCheckbox name="js-bytecode-module" v-model="options.include">
                                JS Bytecode Module
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
                    <p class="dlMobile">
                        Downloads are unavailable on mobile devices, please visit this page from a desktop.
                    </p>
                </div>
            </div>
            <div class="split hide-mobile">
                <a href="https://cdn.altv.mp/altv-release.zip" class="btn btn-client">
                    Download Client
                </a>
                <a href="#" @click="tryBundleServe" :disabled="isBundling" class="btn btn-server">
                    <span v-if="!isBundling">
                        Download Server <br /><i>Build #{{ version }}</i>
                    </span>
                    <span v-else> {{ progress.toFixed(1) }}% </span>
                </a>
            </div>
            <br />
            <div class="split hide-mobile">
                <div class="client-recommendations">
                    <h4 class="min-requirements" style="text-align: center">Client Requirements</h4>
                    <div class="requirement" v-for="(requirement, index) in requirements" :key="index">
                        <div class="key">
                            {{ requirement.key }}
                        </div>
                        <div class="value">
                            {{ requirement.value }}
                        </div>
                    </div>
                </div>
                <div class="server-recommendations">
                    <h4 class="min-requirements" style="text-align: center">Server Requirements</h4>
                    <div class="requirement" v-for="(requirement, index) in serverRequirements" :key="index">
                        <div class="key">
                            {{ requirement.key }}
                        </div>
                        <div class="value">
                            {{ requirement.value }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DownloadCheckbox from './download-checkbox.vue';
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
            filesCb: {},
            options: {
                branch: 'release',
                arch: 'x64_win32',
                include: []
            },
            requirements: [
                { key: 'OS', value: 'Windows 10+ 64 Bit' },
                {
                    key: 'Processor',
                    value:
                        'Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 CPUs) / AMD Phenom 9850 Quad-Core Processor (4 CPUs) @ 2.5GHz'
                },
                { key: 'RAM', value: '4GB' },
                { key: 'Video Card', value: 'NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11)' },
                { key: 'Sound Card', value: '100% DirectX 10 compatible' },
                { key: 'HDD Space', value: '65GB' }
            ],
            serverRequirements: [
                { key: 'OS', value: 'Latest Windows Server / Ubuntu 18.04+ / Debian 10' },
                { key: 'CPU', value: '3.2ghz (4 Core)' },
                { key: 'RAM', value: 'Varies by Script / Gamemode' },
                { key: 'DISK', value: 'Varies by Script / Gamemode' }
            ]
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
            this.options.arch = e.target.checked ? 'x64_linux' : 'x64_win32';
            this.updateServerVersion();
        },
        async updateServerVersion() {
            this.version = '...';

            this.options.include = [];

            const res = await axios.get(
                `https://cdn.altv.mp/server/${this.options.branch}/${this.options.arch}/update.json`
            );
            this.version = res.data.version;
        },
        hasModule(name) {
            return this.options.include.includes(name);
        },
        addFiles(files, callback = null) {
            Object.assign(this.files, files);
            Object.keys(files).forEach(fPath => {
                this.filesCb[fPath] = callback ? callback : resp => resp.arrayBuffer();
            });
        },
        async addFolder(path, cb, prefix) {
            try {
                const manifest = await (await fetch(`${path}/update.json`)).json();

                Object.keys(manifest.hashList).forEach(fPath => {
                    if (prefix !== undefined) {
                        fPath = `${prefix}/${fPath}`;
                    }

                    this.addFiles({
                        [fPath]: `${path}/${fPath}`
                    });
                });
            } catch (e) {
                alert(`Failed to download ${path}. ${e.message}`);
            }
        },
        async bundleServer() {
            const cdnUrl = 'https://cdn.altv.mp';
            const branch = this.options.branch;
            const arch = this.options.arch;

            const serverBinName = arch === 'x64_win32' ? 'altv-server.exe' : 'altv-server';
            this.addFiles({
                [serverBinName]: `${cdnUrl}/server/${branch}/${arch}/${serverBinName}`
            });

            const modules = {
                'data-files': `data/${branch}`,
                'js-module': `js-module/${branch}/${arch}`,
                'csharp-module': `coreclr-module/${branch}/${arch}`,
                'js-bytecode-module': `js-bytecode-module/${branch}/${arch}`
            };

            await Promise.all(
                Object.entries(modules)
                    .filter(([name]) => this.hasModule(name))
                    .map(([, path]) => this.addFolder(`${cdnUrl}/${path}`))
            );

            if (this.hasModule('sample-config')) {
                this.addFiles(
                    {
                        'server.cfg': `${cdnUrl}/others/server.cfg`
                    },
                    async resp =>
                        Buffer.from(
                            (await resp.text())
                                .replace(
                                    /modules:\s*\[[\s\S]*?\]/gm,
                                    `modules: [${this.options.include
                                        .filter(opt => opt.endsWith('module'))
                                        .map(opt => `'${opt}'`)
                                        .join(', ')}]`
                                )
                                .replace(
                                    /resources:\s*\[[\s\S]*?\]/gm,
                                    `resources: [${this.hasModule('example-resources') ? "'chat', 'freeroam'" : ''}]`
                                )
                        )
                );
            }

            // console.log(this.files);

            const files = Object.entries(this.files);
            const progressPerFile = !this.hasModule('example-resources')
                ? 90 / files.length // 10% for zipping
                : 80 / files.length; // 10% for zipping, 10% for example resources

            const zip = new Zip();
            const stream = new ReadableStream({
                start(controller) {
                    zip.ondata = (err, chunk, final) => {
                        if (err) {
                            controller.error(err);
                        }

                        controller.enqueue(chunk);

                        if (final) {
                            controller.close();
                        }
                    };
                }
            });

            const tasks = files.map(([path, url]) => {
                const fStream = new AsyncZipDeflate(path, { level: 1 });
                zip.add(fStream);

                return fetch(url)
                    .then(resp => this.filesCb[path](resp))
                    .then(buff => {
                        this.progress += progressPerFile;
                        fStream.push(new Uint8Array(buff), true);
                    });
            });

            if (this.hasModule('example-resources')) {
                tasks.push(
                    fetch(`${cdnUrl}/example-resources/resources.zip`)
                        .then(resp => resp.arrayBuffer())
                        .then(
                            buff =>
                                new Promise((resolve, reject) => {
                                    this.progress += 5;

                                    unzip(new Uint8Array(buff), (err, files) => {
                                        this.progress += 5;

                                        if (err) {
                                            return reject(err);
                                        }

                                        Object.keys(files).forEach(path => {
                                            const fStream = new AsyncZipDeflate(`resources/${path}`, { level: 1 });
                                            zip.add(fStream);
                                            fStream.push(files[path], true);
                                        });

                                        resolve();
                                    });
                                })
                        )
                );
            }

            await Promise.all(tasks);
            zip.end();

            const blob = await new Response(stream).blob();
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
            this.filesCb = {};

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
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 64px;
    padding-bottom: 64px;
}

.split {
    display: flex;
    justify-content: space-between;
    min-width: 650px;
    max-width: 650px;
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

.min-requirements {
    margin-top: 0px;
    text-transform: uppercase;
    font-family: 'Inter';
    opacity: 0.7;
}

.requirement {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-width: 300px;
    max-width: 300px;
    font-size: 12px;
    padding-bottom: 6px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 12px;
}

.requirement .key {
    color: rgba(255, 255, 255, 0.7);
    padding-right: 24px !important;
    box-sizing: border-box;
    text-align: left;
}

.requirement .value {
    text-align: right;
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
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    font-weight: 400;
    font-size: 14px;
    border-bottom: 1px solid currentColor;
    transition: color 0.2s;
    padding-bottom: 4px;
}

.dl.client .help:hover {
    color: rgba(255, 255, 255, 0.7);
}

.dl.server {
    align-items: flex-start;
}

.btn-client,
.btn-server {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    min-width: 250px;
    max-width: 250px;
    text-align: center;
}

.options {
    margin: 30px 0;
}

.options .os label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
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

.options .os input:checked + .switch::before {
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
    width: 100%;
}

.options .branch select option {
    background: #1a1a1a;
}

.options .addons .notice {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    opacity: 0.4;
    letter-spacing: 0.6px;
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

    .hide-mobile {
        display: none;
    }

    .dlMobile {
        display: block;
    }
}
</style>
