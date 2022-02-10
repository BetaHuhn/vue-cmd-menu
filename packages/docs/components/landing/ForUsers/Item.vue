<template>
    <div class="flex flex-col px-4 py-4">
        <h3 class="text-xl font-bold py-2">{{ title }}</h3>
        <p class="text-gray-500 flex-1 pt-2 pb-6 border-b-4 border-gray-400 hover:border-primary-500 transition-all duration-150">{{ text }}</p>
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