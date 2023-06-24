<script lang="ts">
	import { page } from '$app/stores';

	let currentPath: string;
	$: currentPath = $page.url.pathname;
	$: isActive = (path: string) => currentPath === path;

	const menuItems = [
		{ href: "/nossa-historia", text: "Nossa história" },
		{ href: "/informacoes-casamento", text: "Informações do Casamento" },
		{ href: "/rsvp", text: "RSVP" },
		{ href: "/lista-presentes", text: "Lista de presentes" },
		{ href: "/fotos", text: "Fotos" },
		{ href: "/faq", text: "FAQ" },
		{ href: "/contato", text: "Contato" },
	];
</script>

<nav class="nav container">
	<div class="nav__logo">
		<img src="" alt="Logo casamento Gean & Jullyana" />
	</div>
	<ul class="nav__list">
		{#each menuItems as item (item.href)}
			<li class="nav__item">
				<a href={item.href} class="nav__link" class:active={isActive(item.href)}>
					{item.text}
				</a>
			</li>
		{/each}
	</ul>
</nav>


<style lang="scss">
	.nav {
		display: flex;
		flex-direction: column;
		gap: map-get($spacings, 5);

		&__logo {
			align-self: center;
		}

		&__list {
			display: flex;
			justify-content: space-between;
		}

		&__link {
			&.active {
				color: red; // Estilo para o link ativo
			}
		}
	}
</style>
