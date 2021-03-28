firebase.initializeApp(firebaseConfig);
let db = firebase.firestore()
new Vue({
  el: '#app',
  data: {
    doctors: [],
    specialties: [],
    inputAddDoctorFirstName: null,
    inputAddDoctorLastName: null,
    inputAddDoctorSpeciatly: null,
    inputAddDoctorPrefix: null,
    inputAddDoctorMedicalEducation: null,
    inputAddDoctorInternship: null,
    inputAddDoctorResidency: null,
    inputAddDoctorFellowship: null,
    inputAddDoctorImagePath: null,
    inputAddDoctorRank: null,
    inputAddDoctorBiography: null,

    doctorFirstName: null,
    doctorLastName: null,
    doctorSpeciatly: null,
    doctorPrefix: null,
    doctorMedicalEducation: null,
    doctorInternship: null,
    doctorResidency: null,
    doctorFellowship: null,
    doctorImagePath: null,
    doctorRank: null,
    doctorBiography: null,

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
              doctorId: doc.id,
              doctorFirstName: data.firstName,
              doctorLastName: data.lastName,
              doctorSpeciatly: data.specialty,
              doctorCreated: data.created,
              doctorSpecialty: data.specialty,
              doctorMedicalEducation: data.medicalEducation,
              doctorInternship: data.internship,
              doctorResidency: data.residency,
              doctorFellowship: data.fellowship,
              doctorImagePath: data.imagePath,
              doctorRank: data.rank,
              doctorBiography: data.biography,
            }
          })
        )
        .then(doctors => this.doctors = doctors)
    },
    addDoctor() {
      return db.collection('doctors').add({
          firstName: this.inputAddDoctorFirstName,
          lastName: this.inputAddDoctorLastName,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          specialty: this.inputAddDoctorSpeciatly,
          biography: this.inputAddDoctorBiography,
          medicalEducation: this.inputAddDoctorMedicalEducation,
          residency: this.inputAddDoctorResidency,
          internship: this.inputAddDoctorInternship,
          fellowship: this.inputAddDoctorFellowship,
          imagePath: this.inputAddDoctorImagePath,
        })
        .then(() => {
          alert(`New Doctor Saved: ${this.inputAddDoctorLastName}`)
          this.clearModals()
          this.fetchDoctors()
        })
    },
    updateDoctor(doctor) {
      return db.collection('doctors').doc(doctor.id)
        .set({
            firstName: doctor.firstName,
        })
        .then(() => {
          alert(`Updated Doctor:`)
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
