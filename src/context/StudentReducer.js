const studentReducer = (state, action) => {
    switch(action.type) {
        case 'SET_STUDENTS':
            return {
                ...state,
                students: action.payload,
            }

        case 'FILTER_NAMES':
            return {
                ...state,
                filterNameResults: action.payload.nameResults,
                nameFilterTrigger: action.payload.triggerNameFilter,
            }
        
        case 'FILTER_TAGS':
            return {
                ...state,
                filterTagResults: action.payload.tagResults,
                tagFilterTrigger: action.payload.triggerTagFilter,
            }
 
        default:
            return state
    }
}

export default studentReducer