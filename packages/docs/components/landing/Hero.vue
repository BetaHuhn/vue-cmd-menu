<template>
    <div class="w-full">
        <div class="mt-8 relative rounded-lg container mx-auto flex flex-col items-center pt-6 sm:pt-12">
            <div class="w-full sm:w-2/3 mb-8 sm:mb-5">
                <h1 class="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-center text-gray-300 font-bold font-mono leading-tight">
                    Your Own Private and Secure VPN
                </h1>
            </div>
            <div class="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
                <p class="text-gray-500 dark:text-gray-300 text-center md:text-xl">
                    Aletsch makes it easy to create and run your own fast and secure VPN server, powered by Wireguard. It runs on your own server and you remain in full control.
                </p>
            </div>
            <div class="flex justify-center items-center mb-4 sm:mb-2">
                <a :href="settings.getStartedUrl">
                    <button class="mt-2 text-gray-400 bg-primary-500 border-0 py-3 px-8 focus:outline-none hover:bg-primary-400 rounded-lg text-lg">
                        Coming soon
                    </button>
                </a>
            </div>
            <p class="mb-10 sm:mb-20 text-gray-600">Free & open source</p>
        </div>
        <div class="relative mx-auto flex justify-center mb-10">
            <div class="z-10 w-full">
                <!-- <img src="/screenshot.png" alt="Screenshot of the WebCrate app" class="shadow-2xl z-10 relative m-auto" /> -->
                <img src="/glacierScreenshot.png" class="relative m-auto w-screen">
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'settings'
        ])
    },
    methods: {
        trackClick() {
            this.$ackee.action('395a0f04-31d6-49bd-bf6e-a5050a8fc031', {
                key: 'Hero',
                value: 1
            })
        }
    }
}
</script>

<style>
    #screenshot::before {
        background: url('/glacierBackground.png');
        --background-offset: calc(100vh / -2);
        content: "";
        position: absolute;
        top: var(--background-offset);
        right: calc(var(--background-offset) - 3rem);
        bottom: var(--background-offset);
        left: calc(var(--background-offset) - 3rem);
        z-index: -1;
        background-repeat: no-repeat;
        background-position: center;

    }

    @media screen and (max-width: 1200px) {
        #screenshot::before {
            top: calc(var(--background-offset) + 8em);
            bottom: calc(var(--background-offset) + 7em);
        }
    }

     @media screen and (max-width: 1024px) {
        #screenshot::before {
            --background-offset: calc(100vh / -2);
            top: var(--background-offset);
            right: var(--background-offset);
            bottom: var(--background-offset);
            left: var(--background-offset);
        }
    }
</style>
