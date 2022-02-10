<template>
    <div class="w-full px-6">
        <div class="mt-8 relative rounded-lg container mx-auto flex flex-col items-center pt-12 sm:pt-24 pb-24 sm:pb-32 md:pb-48 lg:pb-56 xl:pb-64">
            <div class="w-full sm:w-2/3 mb-2 sm:mb-5">
                <h1 class="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-center text-gray-300 font-bold leading-tight">
                    What are you waiting for?
                </h1>
            </div>
            <div class="w-full md:w-11/12 xl:w-1/2 mb-5 sm:mb-10">
                <p class="text-gray-500 dark:text-gray-300 text-center md:text-xl">
                    Get your own VPN up and running in minutes with Aletsch. Free to use and open source, Aletsch runs ony any server and lets you connect all your devices to a fast and secure VPN.
                </p>
            </div>
            <div class="flex justify-center items-center mb-4 sm:mb-2">
                <a :href="settings.getStartedUrl">
                    <button class="mt-2 text-gray-400 bg-primary-500 border-0 py-3 px-8 focus:outline-none hover:bg-primary-400 rounded-lg text-lg">
                        Coming soon
                    </button>
                </a>
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
