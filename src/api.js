const API = 'http://localhost:3000';

    // fetch(`${API}/search`)
    // .then(res => res.json())
    // .then(console.log)

export const search = (body) => {
    console.log(body)
    return fetch(`${API}/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(console.log)
}

export const createUser = (data) => {
    fetch(`${API}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(console.log)
}