<template>
    <div class="mx-auto container px-4 xl:px-0 py-16 xl:py-32">
        <div class="">
            <div class="flex flex-wrap flex-row-reverse items-center justify-between">
                <div class="lg:w-1/2 w-full">
                    <div class="lg:pl-10 py-2">
                        <div class="inline-flex">
                            <p class="w-min text-primary-500 text-lg mb-4">{{ tag }}</p>
                        </div>
                        <h1 class="text-xl xl:text-4xl leading-snug f-f-l font-black">{{ title }}<span class="text-gray-600 font-normal ml-6">{{ sound }}</span></h1>
                        <p class="text-gray-500 text-lg lg:text-xl leading-5 f-f-r py-4 lg:py-6">{{ text }}</p>
                        <a :href="href" class="text-primary-500 text-xl">Learn more</a>
                    </div>
                </div>
                <div v-if="src" class="hidden lg:block lg:absolute lg:left-0 w-2/5">
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
        href: {
            type: String,
            default: undefined
        },
        tag: {
            type: String,
            default: undefined
        },
        sound: {
            type: String,
            default: undefined
        }
    }
}
</script>