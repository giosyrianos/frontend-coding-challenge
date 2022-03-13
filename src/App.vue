<template>
	<NavbarMain />
	<div class="m-3 center-all">
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
<style>
.center-all{
	display: grid;
	place-items: center;
}
</style>
