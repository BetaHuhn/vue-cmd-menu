<template>
    <div class="md:col-span-2">
        <div id="before-background" class="grid gap-6 grid-cols-1 md:grid-cols-2 col-span-2 content-start before-background relative px-4 xl:px-0">
            <div class="relative">
                <img src="/illustrations/terminal.svg" class="m-auto">
            </div>
            <div class="grid gap-6 content-start">
                <Icon :name="icon" size="50px" />
                <div class="grid justify-items-start gap-3">
                    <h3 class="text-xl md:text-2xl font-medium leading-snug">{{ title }}</h3>
                    <p class="text-lg lg:text-xl leading-5 text-gray-500">{{ text }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
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
    .before-background::before {
        --background-offset: calc(3rem / -2);
        content: "";
        position: absolute;
        top: var(--background-offset);
        right: var(--background-offset);
        bottom: var(--background-offset);
        left: var(--background-offset);
        border-radius: 10px;
        z-index: -1;

        @apply bg-gray-400;
    }
</style>