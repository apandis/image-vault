<template>
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
      const file = event.target.files[0];
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
