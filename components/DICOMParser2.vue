<template>
	<div>
		<div class="mx-auto max-w-7xl">
			<div class="p-4">
				<div class="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
					<div class="space-y-1 text-center">
						<svg
							class="mx-auto h-12 w-12 text-gray-400"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 48 48"
							aria-hidden="true"
						>
							<path
								d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<div class="flex text-sm text-gray-600">
							<label
								for="file-upload"
								class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
							>
								<span>Upload a file</span>
								<input id="file-upload" name="file-upload" type="file" class="sr-only" />
							</label>
							<p class="pl-1">or drag and drop</p>
						</div>
						<p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
					</div>
				</div>
			</div>
		</div>
		<div class="container mx-auto p-3">
			<section class="p-6 border border-gray-400">
				<h1>ImageVault</h1>
				<input
					type="file"
					class="py-2 px-4 border border-gray-400 rounded-lg"
					@change="parseDICOMFile"
					webkitdirectory
					directory
					multiple
				/>
				<button class="py-2 px-4 ml-4 bg-blue-500 text-white rounded-lg" @click="sendDICOMData">Send DICOM Data</button>
				<p>Patient Information:</p>
				<table v-if="patient.name">
					<tr>
						<th>Data Element</th>
						<th>Value</th>
						<th>Anonymized</th>
					</tr>
					<tr>
						<td>Patient Name</td>
						<td>{{ patient.name }}</td>
						<td>{{ anonymize(patient.name) }}</td>
					</tr>
					<tr>
						<td>Patient ID</td>
						<td>{{ patient.id }}</td>
						<td>{{ anonymize(patient.id) }}</td>
					</tr>
					<tr>
						<td>Birth Date</td>
						<td>{{ patient.birthDate }}</td>
						<td>{{ anonymize(patient.birthDate) }}</td>
					</tr>
					<tr>
						<td>Gender</td>
						<td>{{ patient.gender }}</td>
						<td>{{ anonymize(patient.gender) }}</td>
					</tr>
				</table>
			</section>
		</div>
	</div>
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
