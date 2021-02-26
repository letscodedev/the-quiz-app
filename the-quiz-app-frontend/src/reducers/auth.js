export const SIGN_IN = (pay) => {
    return  {
        type: 'SIGN_IN',
        payload: pay
    }
}

export const SIGN_OUT = () => {
    return  {
        type: 'SIGN_OUT'
    }
}


const AUTH = (state = null, action) => {
    switch(action.type) {
        case 'SIGN_IN': 
            const payload = action.payload
            return {...state, payload}
        case 'SIGN_OUT':
            return null
        default:
            return state
    }
}

export default AUTH;