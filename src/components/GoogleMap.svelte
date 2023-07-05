<script lang="ts">
	import { onMount } from 'svelte';

	let mapDiv: HTMLDivElement;

	onMount(() => {
		if (typeof window !== 'undefined') {
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDODHpx9iWx1fh2lNGJZk9GdY_r9iqwXME&callback=initMap`;
			script.async = true;
			window.initMap = () => {
				const uluru = { lat: -22.9058837, lng: -43.5234336 }; // Altere estas coordenadas conforme necessário
				const map = new google.maps.Map(mapDiv, { zoom: 8, center: uluru });
				const marker = new google.maps.Marker({ position: uluru, map: map });
			};
			document.head.appendChild(script);
		}
	});
</script>

<div id="google-map" bind:this={mapDiv} />

<style>
	#google-map {
		height: 500px;
		width: 100%;
	}
</style>
