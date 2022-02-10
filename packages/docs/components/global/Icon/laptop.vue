<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke-width="5" :stroke="color" fill="none">
    <path d="M11 13h41.77a2 2 0 012 2v26.38a3 3 0 01-3 3H12.13A3.12 3.12 0 019 41.28V14.94A2 2 0 0111 13zM55.25 51h-46a4.52 4.52 0 01-4.52-4.51v-2.08h54.53V47a4 4 0 01-4.01 4z"></path>
  </svg>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: 'currentColor'
		}
	}
}
</script>