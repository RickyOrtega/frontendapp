const BASE_URL = 'http://localhost:8000/api/';

export async function iniciarSesion(username, password){
    const ENDPOINT = BASE_URL + 'login/';

    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });

    const data = await response.json();

    // guardamos el token en el localStorage
    localStorage.setItem('csrfToken', data.key);

    return data;
}