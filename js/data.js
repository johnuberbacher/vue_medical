firebase.initializeApp(firebaseConfig);
let db = firebase.firestore()
new Vue({
  el: '#app',
  data: {
    doctors: [],
    specialties: [],
    inputDoctorFirstName: null,
    inputDoctorLastName: null,
    inputDoctorSpeciatly: null,
    inputDoctorPrefix: null,
    inputDoctorMedicalEducation: null,
    inputDoctorInternship: null,
    inputDoctorResidency: null,
    inputDoctorFellowship: null,
    inputDoctorImagePath: null,
    inputDoctorRank: null,
    inputDoctorBiography: null,
    inputSpecialtyName: null,
    inputSpecialtyDescription: null,
    selectedDoctor: '',
    selectedRoute: '',
  },
  methods: {
    clearModals() {
      $('.modal').modal('hide')
      $('.modal .form').reset();
    },
    add() {
      return db.collection("users")
        .add({
          firstName: coords_val,
        })
        .then(refDoc => {
          this.fetch()
        })
    },
    fetchDoctors() {
      console.log("Fetching Doctors");
      return db.collection("doctors")
        .orderBy('lastName')
        .get()
        .then(querySnapshot =>
          querySnapshot.docs.map(doc => {
            let data = doc.data()
            return {
              id: doc.id,
              firstName: data.firstName,
              lastName: data.lastName,
              prefix: data.prefix,
              specialty: data.specialty,
              medicalEducation: data.medicalEducation,
              internship: data.internship,
              residency: data.residency,
              fellowship: data.fellowship,
              imagePath: data.imagePath,
              rank: data.rank,
              biography: data.biography,
            }
          })
        )
        .then(doctors => this.doctors = doctors)
    },
    addDoctor() {
      return db.collection('doctors').add({
          firstName: this.inputDoctorFirstName,
          lastName: this.inputDoctorLastName,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          specialty: this.inputDoctorSpeciatly,
          biography: this.inputDoctorBiography,
          medicalEducation: this.inputDoctorMedicalEducation,
          residency: this.inputDoctorResidency,
          internship: this.inputDoctorInternship,
          fellowship: this.inputDoctorFellowship,
          imagePath: this.inputDoctorImagePath,
        })
        .then(() => {
          alert(`New Doctor Saved: ${this.inputDoctorLastName}`)
          this.clearModals()
          this.fetchDoctors()
        })
    },
    updateDoctor(doctor) {
      return db.collection('doctors').doc(doctor.id)
        .set({
          firstName: doctor.firstName,
          lastName: doctor.lastName,
        })
        .then(() => {
          alert(`Updated Doctor:  ${doctor.prefix} ${doctor.firstName} ${doctor.lastName} - ${doctor.id}`)
          return this.fetchDoctors()
        })
    },
    deleteDoctor(id) {
      var txt;
      var accept = confirm("You are about to delete this record, are you sure?");
      if (accept == true) {
        return db.collection('doctors').doc(id)
          .delete()
          .then(() => {
            return this.fetchDoctors()
          })
      }
    },

    fetchSpecialties() {
      console.log("Fetching Specialties");
      return db.collection("specialties")
        .orderBy('specialtyName')
        .get()
        .then(querySnapshot =>
          querySnapshot.docs.map(doc => {
            let data = doc.data()
            return {
              id: doc.id,
              specialtyName: data.specialtyName,
              specialtyDescription: data.specialtyDescription,
              specialtyDoctorCount: data.specialtyDoctorCount,
              specialtyImagePath: data.specialtyImagePath,
            }
          })
        )
        .then(specialties => this.specialties = specialties)
    },
    addSpecialty() {
      return db.collection('specialties').add({
          specialtyName: this.specialtyName,
          specialtyDescription: this.specialtyDescription,
          specialtyDoctorCount: this.specialtyDoctorCount,
          specialtyImagePath: this.specialtyImagePath,
        })
        .then(() => {
          alert(`New Specialty Saved: ${this.specialtyName}`)
          this.clearModals()
          this.fetchSpecialties()
        })
    },
    updateSpecialty(specialty) {
      return db.collection('specialties').doc(specialty.id)
        .set({
            specialtyName: specialty.specialtyName,
            specialtyDescription: specialty.specialtyDescription,
            specialtyDoctorCount: specialty.specialtyDoctorCount,
            specialtyImagePath: specialty.specialtyImagePath,
        })
        .then(() => {
          alert(`Updated Specialty:  ${specialty.specialtyName}`)
          return this.fetchSpecialties()
        })
    },
    deleteSpecialty(id) {
      var txt;
      var accept = confirm("You are about to delete this record, are you sure?");
      if (accept == true) {
        return db.collection('specialties').doc(id)
          .delete()
          .then(() => {
            return this.fetchSpecialties()
          })
      }
    },

  },
  created() {
    this.fetchDoctors();
      this.fetchSpecialties();
  },
})

async function sample() {
  await delay(1000);
  console.log("This is the delay")
  //document.getElementById('send_id').click();
}
sample();

async function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
