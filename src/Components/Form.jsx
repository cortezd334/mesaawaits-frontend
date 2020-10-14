import React, {useState} from 'react';
import { search } from '../api';

function Form() {

    const yelpForm = {
        cuisine: '',
        location: ''
    }
    const [form, setForm] = useState(yelpForm)

    function handleChange(e) {
        let obj = {[e.target.name]: e.target.value}
        setForm(prevState => ({...prevState, ...obj}))
    }

    function handleSubmit(e) {
        e.preventDefault()

        search(form)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label> Cuisine:
                <input type='text' value={form.cuisine} name='cuisine' onChange={handleChange}/>
            </label>
            <label> Location:
                <input type='text' value={form.location} name='location' onChange={handleChange}/>
            </label>
            <input type='submit' value='Submit'/>
        </form>
    )
}

export default Form