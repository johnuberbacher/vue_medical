firebase.initializeApp(firebaseConfig);
let db = firebase.firestore()
new Vue({
  el: '#app',
  data: {
    doctors: [],
    inputDoctorFirstName: null,
    inputDoctorLastName: null,
    inputDoctorSpeciatly: null,
    inputDoctorMedicalEducation: null,
    inputDoctorInternship: null,
    inputDoctorResidency: null,
    inputDoctorFellowship: null,
    inputDoctorImagePath: null,
    inputDoctorRank: null,
    inputDoctorBiography: null,
    selectedDoctor: '',
    selectedRoute: '',
  },
  methods: {
    clearModals(){
        $('.modal').modal('hide')
        $('.modal .form').reset();
    },
    add() {
      return db.collection("users")
        .add({ firstName: coords_val, })
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
              biography: data.specialty,
            }
          })
         )
        .then(doctors => this.doctors = doctors)
    },
    addDoctor() {
      return db.collection('doctors').add({ firstName: this.inputfirstName, lastName: this.inputlastName, created: firebase.firestore.FieldValue.serverTimestamp(), firstName: this.inputfirstName, lastName: this.inputlastName, })
        .then(() => {
          alert(`New Doctor Saved: ${this.inputlastName}`)
          this.clearModals()
          this.fetchDoctors()
        })
    },
    updateDoctor(doctor) {
      return db.collection('doctors').doc(doctor.id)
        .set({ firstName: doctor.firstName, lastName: doctor.lastName,})
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

  },
  created() {
    this.fetchDoctors();
  },
})

async function sample() {
    await delay(1000);
    console.log("This is the delay")
    //document.getElementById('send_id').click();
}
sample();

async function delay(delayInms) {
  return new Promise(resolve  => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
