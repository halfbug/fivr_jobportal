import {firestore, firebase } from "firebaseConfig";

// get me the firebase jobbase
// const jobbaseRef = firebase.jobbase().ref();
// console.log(jobbaseRef)
//  

var user = firebase.auth().currentUser;

// Add new job
 export const createJob = (job) => async dispatch => {
   console.log(user)
    //job.userId = user.uid

    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            console.log(user);
            job.userid = user.uid
            job.status = "open"
            job.createdAt = Date.now()
            console.log(job)
            firestore.collection('jobs').add(job).then(() => {
                // register was succesful by sending true
                 dispatch({ type: "CreateJob", payload: {job} });
                 dispatch({ type: 'clearError'});
             }).catch(err => {
               console.log(err);
               dispatch({ type: 'setError' , 
               payload : {
                    msg : err.message, 
                    status : "error" , 
                    id: err.code
                }
             });
        
         });
        }
        
        else // user is undefined if no user signed in
        dispatch({ type: 'setError' , 
        payload : {
            msg : "", 
            status : "error" , 
            id: 77889}
        });
      
       });

  
};

// get all available jobs
export const listJobs = (type) => async dispatch => {
    // console.log(user)
     //job.userId = user.uid
 
    //  firebase.auth().onAuthStateChanged(function(user) {

        var user = firebase.auth().currentUser;
         if(user){
             console.log(user);
            //  job.userid = user.uid
            var jobs=[];
            //  

            let jobRef = firestore.collection('jobs').where("status","==",type);
let allJobs = jobRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
        let job = doc.data();
        job.id = doc.id;
      jobs.push(job)
    });
    console.log(jobs)
    dispatch({ type: "listJobs", payload: {jobs} });
    dispatch({ type: 'clearError'});

  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
// console.log(jobs)
            //  firestore.collection('jobs')
            //     .where("status","==",type)
            //     .get().then((querySnapshot)=> {
            //         // let evntl=[];
            //          var job = [];
              
            //         querySnapshot.forEach(function(jd) {
                       
            //           job.push(jd.data())
              
                      
            //         });
            //          jobs = [...new Set(job)]
            //         console.log(jobs)
       
                    
            //     })
            //     .catch(function(error) {
            //       console.log("Error getting documents: ", error);
            //     });
                
                // dispatch({ type: "ListJobs", payload: {jobs} });
                // dispatch({ type: 'clearError'});
         }
         else{
             console.log('error')
         }
        // });
    }; 
