
export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
}


const initialState = {
    status: 'all',
    colors: []
}

export const colorFilterChanged = (color, changeType) => {
    return { type: 'filters/colorFilterChanged', payload: { color, changeType } }
}
export const statusFilterChanged = ( status) => {
    return { type: 'status/statusFilterChanged', payload:  status  }
}




export default function filtersReducer(state = initialState, action) {
    switch (action.type) {
        case 'filters/colorFilterChanged': {
           
            var { color, changeType } = action.payload
            var colors = [...state.colors]; 
            if(changeType == 'removed'){
                var colors = state.colors.filter(item=>{
                    return item != color
                })
            }else if(changeType == 'added'){
                var index = state.colors.findIndex(item=>item == color)
                if(index == -1){
                    colors = [...colors, color]
                }
            }

            return {
                // Again, one less level of nesting to copy
                ...state,
                colors: colors
            }
        }
        case 'status/statusFilterChanged': {
            return {
                // Again, one less level of nesting to copy
                ...state,
                status: action.payload
            }
        }
        default:
            return state
    }
}