<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let timeLeft = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};
	const targetDate: number = new Date('2024-08-24T16:00:00').getTime();
	let intervalId: number;

	const calculateTimeLeft = (): void => {
		const now: number = new Date().getTime();
		let differenceInSeconds: number = Math.floor((targetDate - now) / 1000);

		if (differenceInSeconds < 0) {
			differenceInSeconds = 0;
			clearInterval(intervalId);
		}

		timeLeft = {
			days: Math.floor(differenceInSeconds / 86400),
			hours: Math.floor((differenceInSeconds % 86400) / 3600),
			minutes: Math.floor((differenceInSeconds % 3600) / 60),
			seconds: Math.floor(differenceInSeconds % 60)
		};
	};

	onMount(() => {
		calculateTimeLeft();
		intervalId = window.setInterval(calculateTimeLeft, 1000);
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<div class="counter__content">
	{timeLeft.days} dias,
	{timeLeft.hours} horas,
	{timeLeft.minutes} minutos,
	{timeLeft.seconds} segundos
</div>
