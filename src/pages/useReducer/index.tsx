import React, { useContext } from 'react';

import { StoreContext } from '../../store';

export default function() {
    const { state } = useContext(StoreContext);
    
    return <div>
        <h1>reducer page. global state: {state.isNewVersion ? 'hook' : 'class'}</h1>
        <p>useReducers 是在store中定义.在子组件中调用.</p>
    </div>
}