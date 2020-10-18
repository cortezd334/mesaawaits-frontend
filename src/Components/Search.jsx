import React, {useState} from 'react';
import { search } from '../api';
import { useHistory } from 'react-router-dom'

function Search({restaurants, setRestaurants}) {

    const history = useHistory()

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
        .then(json => {
            setRestaurants(
                json.businesses
            )
                localStorage.search = {list: json.businesses}
        })
        history.push('/map')
    }

//unhandled rejection(typeError)
    // latitude: json.coordinates[latitude], longitude: json.coordinates.longitude,
    console.log(restaurants)
    return (
        <form className='form' onSubmit={handleSubmit}>
            <label className='item pad'> Cuisine:
                <input type='text' value={form.cuisine} name='cuisine' onChange={handleChange}/>
            </label>
            <label className='item pad'> Location:
                <input type='text' value={form.location} name='location' onChange={handleChange}/>
            </label>
            <input type='submit' value='Submit'/>
        </form>
    )
}

export default Search