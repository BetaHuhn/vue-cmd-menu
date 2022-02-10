<template>
    <div>
        <div class="grid gap-6 content-start px-4 xl:px-0">
            <Icon :name="icon" size="50px" />
            <div class="grid justify-items-start gap-3">
                <h3 class="text-xl md:text-2xl font-medium leading-snug">{{ title }}</h3>
                <p class="text-lg lg:text-xl leading-5 text-gray-500">{{ text }}</p>
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