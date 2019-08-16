import React from 'react';
class Test extends React.Component{
    render() {
        return <div>div</div>
    }
}
export default class extends React.Component {
    state = {
        inputVal: '0'
    }
    componentDidMount() {
        console.log('test page compoenentDidMount')
    }
    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
    render() {
        return <input value={this.state.inputVal} onChange={e => this.setState({inputVal: e.target.value})} />
    }
}