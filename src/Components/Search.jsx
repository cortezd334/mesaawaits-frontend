import React, {useState} from 'react';
import { search } from '../api';
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Search({setRestaurants}) {

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
        })
        history.push('/map')
        // pushing to map do I want map or restaurant list?
    }

    return (
        <Form className='form-inline' onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group>
                    <Form.Label className='item'> Cuisine</Form.Label>
                    <Form.Control type='text' value={form.cuisine} name='cuisine' onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className='item'> Location</Form.Label>
                    <Form.Control type='text' value={form.location} name='location' onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Button type='submit' variant="outline-info">Submit</Button>
                </Form.Group>
            </Form.Row>
        </Form>
    )
}

export default Search