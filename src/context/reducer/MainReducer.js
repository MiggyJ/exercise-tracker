export default (state, action) => {
    switch (action.type) {
        case 'CHANGE_USER':
            return ({
                ...state,
                user: action.payload
            })
        case 'CHANGE_PAGE':
            return ({
                ...state,
                page: action.payload
            })
        case 'CHANGE_SUGGESTED':
            return ({
                ...state,
                suggested: action.payload
            })
        default:
            return state
    }
}