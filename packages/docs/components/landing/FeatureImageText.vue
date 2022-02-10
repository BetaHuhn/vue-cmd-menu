<template>
    <div class="mx-auto container px-4 xl:px-0 py-16 xl:py-32">
        <div class="">
            <div class="flex flex-wrap items-center justify-between" :class="reverse && 'flex-row-reverse'">
                <div class="lg:w-1/2 w-full">
                    <div class="lg:pr-10 py-2" :class="reverse && 'lg:pr-0 lg:pl-10'">
                        <div class="inline-flex">
                            <p class="w-min text-primary-500 text-lg mb-4">{{ tag }}</p>
                        </div>
                        <h1 class="text-xl xl:text-4xl leading-snug f-f-l font-black">{{ title }}</h1>
                        <p class="text-gray-500 text-lg lg:text-xl leading-5 f-f-r py-4 lg:py-6">{{ text }}</p>
                    </div>
                </div>
                <div v-if="src" class="lg:w-2/5 w-full">
                    <img class="w-full" :src="src" :alt="alt" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        reverse: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        src: {
            type: String,
            default: undefined
        },
        alt: {
            type: String,
            default: undefined
        },
        tag: {
            type: String,
            default: undefined
        }
    }
}
</script>