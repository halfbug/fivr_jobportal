
export default (state={
    status : "loading",
    availableJobs : [],
    allJobs : [],
}, action) => {
    switch (action.type) {
            case "CreateJob":
            
                console.log("getting ", action.payload);
                console.log(action.payload);
                return {
                // keep the old state
                ...state,
                // add all the cards from the database
                // they will come in a json format,
                // so we need to convert them to array
                availableJobs: Object.values(action.payload).concat(state.availablejobs),
                status : "created"
                };

            
            case "listJobs":
                    console.log("getting################################# ", action.payload);
                    console.log(action.payload);
                    return {
                    ...state,
                    availableJobs: action.payload.jobs,
                    status : "loaded",
                    allJobs : action.payload.jobs
                    };  
                    
            default:
                return state;
    }
  };