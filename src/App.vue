<template>
	<NavbarMain />
	<div class="container m-3">
		<router-view />
	</div>
</template>
<script>
import NavbarMain from './components/Navbar-main.vue'
export default {
	name: 'App',
	components: { NavbarMain },
}
</script>
<style></style>
