import { useRouter } from 'next/router';
import TablaEmpleados from '../components/empleados/tabla-empleados';

export default function GestionUsuarios() {
    const router = useRouter();

    return(
        <div>
            <div>
                <h1>Gestión de Usuarios</h1>
            </div>
            <TablaEmpleados/>
        </div>
    );
}