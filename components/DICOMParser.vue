<template>
	<main>
		<div class="mx-auto max-w-7xl py-6 p-6">
			<div class="flex items-center justify-center w-full">
				<label
					for="dropzone-file"
					class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
				>
					<div class="flex flex-col items-center justify-center pt-5 pb-6">
						<svg
							aria-hidden="true"
							class="w-10 h-10 mb-3 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
							></path>
						</svg>
						<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
							<span class="font-semibold">Click to upload</span> or drag and drop
						</p>
						<p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
					</div>
					<input id="dropzone-file" type="file" class="hidden" />
				</label>
			</div>
		</div>
	</main>
</template>

//
<script setup>
	// import dicomParser from 'dicom-parser';

	// const dicomData = ref();

	// const parseDICOMFile = async (event) => {
	//   const file = event.target.files[0];
	//   const fileReader = new FileReader();
	//   this.dicomData = 12;
	//   fileReader.onload = (e) => {
	//     const buffer = new Uint8Array(e.target.result);
	//     const dataSet = dicomParser.parseDicom(buffer);
	//     console.log('Dataset:', dataSet);
	//     this.dicomData = dataSet;
	//   };

	//   fileReader.readAsArrayBuffer(file);
	// };

	// const sendDICOMData = async () => {
	//   if (!this.dicomData) {
	//     console.error('No DICOM data to send');
	//     return;
	//   }

	//   try {
	//     const response = await fetch('https://your-remote-dicom-server.com/dicomweb', {
	//       method: 'POST',
	//       body: JSON.stringify(this.dicomData),
	//       headers: {
	//         'Content-Type': 'application/dicom+json',
	//       },
	//     });
	//     const result = await response.json();
	//     console.log('DICOM data sent successfully:', result);
	//   } catch (error) {
	//     console.error('Failed to send DICOM data:', error);
	//   }
	// };
	//
</script>
<script>
	import dicomParser from 'dicom-parser';
	export default {
		data() {
			return {
				patient: {
					name: '',
					id: '',
					birthDate: '',
					gender: '',
				},
			};
		},
		methods: {
			parseDICOMFile(event) {
				// const file = event.target.files[0];
				const fileReader = new FileReader();
				fileReader.onload = (e) => {
					const buffer = new Uint8Array(e.target.result);
					const dataSet = dicomParser.parseDicom(buffer);
					this.patient.name = dataSet.string('x00100010');
					this.patient.id = dataSet.string('x00100020');
					this.patient.birthDate = dataSet.string('x00100030');
					this.patient.gender = dataSet.string('x00100040');
				};
				fileReader.readAsArrayBuffer(file);
			},
			async sendDICOMData() {
				// ...
			},
			anonymize(value) {
				return value
					.split('')
					.map((char, index) => (index === 0 ? char : '*'))
					.join('');
			},
		},
	};
</script>

<style lang="scss" scoped></style>
