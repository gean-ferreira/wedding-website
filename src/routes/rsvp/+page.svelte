<script lang="ts">
	import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
	import db from '@/libs/firebase';

	let name: string = '';
	let attendance: string = '';
	let nameError: string = '';
	let attendanceError: string = '';
	let msgReq: string = '';

	const normalizeName = (name: string) =>
		name
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.trim()
			.toLowerCase();

	const validateName = () => {
		if (!name.trim()) {
			nameError = 'Por favor, preencha o campo do nome.';
		} else if (name.length < 2) {
			nameError = 'Nome inválido.';
		} else {
			nameError = '';
		}
	};

	const validateAttendance = () => {
		if (!attendance) {
			attendanceError = 'Por favor, selecione uma opção de comparecimento.';
		} else {
			attendanceError = '';
		}
	};

	const updateGuest = async () => {
		const convidadosRef = collection(db, 'convidados');
		const q = query(convidadosRef, where('name', '==', name));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			msgReq = 'Convidado não encontrado!';
		} else {
			querySnapshot.forEach((convidado) => {
				console.log(convidado.id, ' => ', convidado.data());
				updateDoc(doc(db, 'convidados', convidado.id), {
					attendance: attendance,
					updatedAt: new Date()
				});
			});
			msgReq = 'Obrigado por responder!';
			name = '';
			attendance = '';
		}
	};

	const handleSubmit = () => {
		name = normalizeName(name);
		validateName();
		validateAttendance();

		if (!nameError && !attendanceError) {
			updateGuest();
		}
	};
</script>

<h1>RSVP Page!</h1>

<form class="form" on:submit|preventDefault={handleSubmit}>
	<label class="form__label" for="name">Nome:</label>
	<input class="form__input" type="text" id="name" bind:value={name} on:blur={validateName} /><br />

	{#if nameError}
		<p class="error-message">{nameError}</p>
	{/if}

	<label class="form__label" for="attendance">Irá comparecer?</label>
	<select
		class="form__select"
		id="attendance"
		bind:value={attendance}
		on:change={validateAttendance}
	>
		<option value="" selected disabled hidden>Selecione uma opção</option>
		<option value="2">Não comparecerei</option>
		<option value="3">Estarei presente</option>
	</select><br />

	{#if attendanceError}
		<p class="error-message">{attendanceError}</p>
	{/if}

	<button class="form__button" type="submit">enviar</button>
	{#if msgReq}
		<p>{msgReq}</p>
	{/if}
</form>
