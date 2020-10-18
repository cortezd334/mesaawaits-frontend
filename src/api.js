const API = 'http://localhost:3000';
//how can I pass user here?
//as props if I feed it through
//doesn't that take away some of the functionality?
//make this fetch in reservation?

const token = localStorage.getItem('token')

const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
}

const authHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
}


// export async function handleAuthResponse(resp) {
//     if(resp.user){
//         localStorage.token = resp.token
//         setUser({id: json.user.id, username: json.user.username, token: json.token})
//         history.push("/profile")
//     }
//   }

export async function search(body) {
    const resp = await fetch(`${API}/search`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })
    return await resp.json()
}

export async function geoSearch(body) {
    const resp = await fetch(`${API}/geoSearch`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })
    return await resp.json()
}

export async function createUser(data) {
    const resp = await fetch(`${API}/users`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    return await resp.json()
}

export async function login(data) {
    const resp = await fetch(`${API}/login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    return await resp.json();
}

// export async function newRes(data) {
//     const resp = await fetch(`${API}/reservations`, {
//         method: 'POST',
//         headers: authHeaders,
//         body: JSON.stringify(data)
//     })
//     return await resp.json();
// }

export async function persist(data) {
    const resp = await fetch(`${API}/persist`, {
        headers: authHeaders
    })
    return await resp.json();
}
