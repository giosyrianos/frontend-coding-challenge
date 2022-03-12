<template>
	<div id="app">
		<nav class="navbar navbar-expand navbar-dark bg-dark">
			<router-link
				to="/"
				class="navbar-brand"
			>
				Projects
			</router-link>
			<div class="navbar-nav mr-auto">
				<li class="nav-item">
					<router-link
						to="/"
						class="nav-link"
						:class="router-link-active"
					>
						List
					</router-link>
				</li>
			</div>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'NavbarMain'
}
</script>
