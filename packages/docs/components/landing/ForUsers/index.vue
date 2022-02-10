<template>
    <div class="mx-auto container px-4 xl:px-0 py-16 xl:py-32">
        <div class="flex flex-wrap items-center justify-between w-full">
            <div class="lg:pr-10 py-2">
                <h1 class="text-xl xl:text-4xl leading-snug f-f-l font-black">{{ title }}</h1>
                <p class="text-gray-500 text-lg lg:text-xl leading-5 f-f-r py-2 lg:py-4">{{ text }}</p>
            </div>
        </div>
        <div class="relative z-10 sm:w-3/4 w-11/12 hidden md:block m-auto pt-6 py-12">
            <img src="/screenshot.png" alt="Screenshot of the WebCrate app" class="shadow-xl" />
        </div>
        <div class="flex responsive-flex-wrap">
           <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }
}
</script>

<style>
    @media screen and (max-width: 768px) {
        .responsive-flex-wrap {
            flex-wrap: wrap;
        }
    }
</style>