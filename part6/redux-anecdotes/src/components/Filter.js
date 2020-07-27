import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(props.addFilter(event.target.value))
        // input-field value is in variable event.target.value
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    addFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter