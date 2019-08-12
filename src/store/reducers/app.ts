
export const initState = {
    isNewVersion: true
}

export default function(state = initState, action: any) {
    switch (action.type) {
        case 'SWITCH_VERSION':  // 全局切换新旧状态
            return {...state, isNewVersion: !state.isNewVersion}
        default: return state;
    }
}