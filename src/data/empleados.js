const BASE_URL = 'http://localhost:8000/api/empleados/';
let csrfToken;
if (typeof window !== 'undefined') {
  csrfToken = window.localStorage.getItem('csrfToken');
}

export async function crearEmpleado(empleadoData){
    const ENDPOINT = BASE_URL + 'crear-empleado/';

    // Por como construí la API, el telefono y el email se envía independientemente, por lo que se debe hacer un pequeño ajuste
    // para enviar el objeto sin telefono y email, y luego enviarlos por separado.
    const {telefono, email, indicativo, tipo, ...empleadoSinTelefonoEmail} = empleadoData;

    //Ahora cambio el formato de fecha a yyyy-mm-dd
    empleadoSinTelefonoEmail.fecha_ingreso = new Date(empleadoSinTelefonoEmail.fecha_ingreso).toISOString().split('T')[0];

    // Creamos un nuevo objeto para telefono y otro para email
    const telefonoData = {
        numero: telefono,
        indicativo: indicativo,
        tipo: tipo
    };

    const emailData = {
        email: email
    };

    // Ahora un objeto para el envío del empleado, telefono y email
    const empleadoSeparado = {
        empleado: empleadoSinTelefonoEmail,
        telefono: telefonoData,
        email: emailData
    };

    const response = await fetch(ENDPOINT, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(empleadoSeparado)
    });
    const data = await response.json();
    return data;
}

export async function obtenerEmpleados(){
    const response = await fetch(BASE_URL, {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        }
    });
    const data = await response.json();

    return data;
}

export async function obtenerEmpleado(id){
    const ENDPOINT = BASE_URL + id + '/';
    const response = await fetch(ENDPOINT, {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        }
    });
    const data = await response.json();

    return data;
}

export async function actualizarEmpleado(id, empleadoData){
    const ENDPOINT = BASE_URL + "editar-empleado/" + id ;

    // La lógica no es muy distinta a la de crearEmpleado
    const {telefono, email, indicativo, tipo, ...empleadoSinTelefonoEmail} = empleadoData;

    //Ahora cambio el formato de fecha a yyyy-mm-dd
    empleadoSinTelefonoEmail.fecha_ingreso = new Date(empleadoSinTelefonoEmail.fecha_ingreso).toISOString().split('T')[0];

    // Creamos un nuevo objeto para telefono y otro para email
    const telefonoData = {
        numero: telefono,
        indicativo: indicativo,
        tipo: tipo
    };

    const emailData = {
        email: email
    };

    // Ahora un objeto para el envío del empleado, telefono y email
    const empleadoSeparado = {
        empleado: empleadoSinTelefonoEmail,
        telefono: telefonoData,
        email: emailData
    };

    console.log(empleadoSeparado);

    const response = await fetch(ENDPOINT, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(empleadoSeparado)
    });
    const data = await response.json();
    return data;
}

export async function eliminarEmpleado(id){
    const ENDPOINT = BASE_URL + "eliminar-empleado/" + id;
    const response = await fetch(ENDPOINT, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': csrfToken
        }
    });
    const data = await response.json();
    return data;
}