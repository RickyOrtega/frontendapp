import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    MenuItem,
    Typography,
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    crearEmpleado,
    obtenerEmpleados,
    actualizarEmpleado,
    eliminarEmpleado,
} from "@/data/empleados";
import dayjs from "dayjs";

/* Fuente: https://mui.com/material-ui/react-table/ */

export default function TablaEmpleados() {
    const [open, setOpen] = useState(false);
    const [empleados, setEmpleados] = useState([]);
    const [empleadoEditando, setEmpleadoEditando] = useState(null);

    const handleClickOpen = (empleado) => {
        if (empleado) {
            setNuevoEmpleado({
                ...empleado,
                email: empleado.email[0].email,
                telefono: empleado.telefono[0].numero,
                indicativo: empleado.telefono[0].indicativo,
                tipo: empleado.telefono[0].tipo,
            });


        } else {
            setNuevoEmpleado({
                nombres: '',
                apellidos: '',
                tipo_identificacion: '',
                identificacion: '',
                fecha_ingreso: null,
                salario_mensual: '',
                cargo: '',
                departamento: '',
                email: '',
                telefono: '',
                indicativo: '',
                tipo: '',
            });
        }
        setEmpleadoEditando(empleado);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const emails = [
        {
            id: 1,
            email: '',
            empleado: 1,
        }
    ];

    const telefonos = [
        {
            id: 1,
            tipo: '',
            numero: '',
            indicativo: '',
            empleado: 1,
        }
    ];

    const [nuevoEmpleado, setNuevoEmpleado] = useState({
        nombres: '',
        apellidos: '',
        tipo_identificacion: '',
        identificacion: '',
        fecha_ingreso: null,
        salario_mensual: '',
        cargo: '',
        departamento: '',
    });

    const handleInputChange = (event) => {
        setNuevoEmpleado({
            ...nuevoEmpleado,
            [event.target.name]: event.target.value,
        });
    };

    const handleCrearNuevoEmpleado = () => {
        setEmpleadoEditando(null);
        handleClickOpen(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (empleadoEditando) {
            await actualizarEmpleado(empleadoEditando.id, nuevoEmpleado);
        } else {
            await crearEmpleado(nuevoEmpleado);
        }
        handleClose();
        cargarEmpleados();
    };

    const cargarEmpleados = () => {
        obtenerEmpleados()
            .then(empleados => {
                setEmpleados(empleados);
            })
            .catch(error => {
                console.error("Error al obtener los empleados:", error);
            });
    }

    useEffect(() => {
        cargarEmpleados();
    }, [nuevoEmpleado]);

    const onDeleteempleado = async (id) => {
        await eliminarEmpleado(id);
        cargarEmpleados();
    };

    return (
        <div style={{ margin: '1rem 0' }}>
            <Button variant="contained" color="primary" onClick={handleCrearNuevoEmpleado} style={{ marginBottom: '1rem' }}>
                Crear nuevo empleado
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Nombres</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Apellidos</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Tipo Documento</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Documento</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>F. Ingreso</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Salario Mensual</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Cargo</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Departamento</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Email</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Teléfono</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {empleados.map((empleado) => (
                        <TableRow key={empleado.id}>
                            <TableCell>{empleado.nombres}</TableCell>
                            <TableCell>{empleado.apellidos}</TableCell>
                            <TableCell>{empleado.tipo_identificacion}</TableCell>
                            <TableCell>{empleado.identificacion}</TableCell>
                            <TableCell>{empleado.fecha_ingreso}</TableCell>
                            <TableCell>{empleado.salario_mensual}</TableCell>
                            <TableCell>{empleado.cargo}</TableCell>
                            <TableCell>{empleado.departamento}</TableCell>
                            <TableCell>{empleado.email[0].email}</TableCell>
                            <TableCell>{empleado.telefono[0].numero}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleClickOpen(empleado)} style={{ marginRight: '0.5rem' }}>
                                    Editar
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => onDeleteempleado(empleado.id)}>
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <DialogTitle>Nuevo empleado</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} method="POST">
                        <Typography variant="h7" gutterBottom>
                            Información Personal
                        </Typography>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    label="Nombres"
                                    name="nombres"
                                    value={nuevoEmpleado.nombres}
                                    fullWidth
                                    margin="normal"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Apellidos"
                                    name="apellidos"
                                    value={nuevoEmpleado.apellidos}
                                    fullWidth
                                    margin="normal"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <TextField
                                    select
                                    label="Tipo de documento"
                                    variant="outlined"
                                    fullWidth
                                    name="tipo_identificacion"
                                    value={nuevoEmpleado.tipo_identificacion}
                                    displayEmpty
                                    margin="normal"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="nit">NIT</MenuItem>
                                    <MenuItem value="cc">Cédula de ciudadanía</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    label="Número de documento"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    name="identificacion"
                                    value={nuevoEmpleado.identificacion}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="h7" gutterBottom>
                            Información Laboral
                        </Typography>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    label="Departamento"
                                    name="departamento"
                                    value={nuevoEmpleado.departamento}
                                    fullWidth
                                    margin="normal"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Cargo"
                                    name="cargo"
                                    value={nuevoEmpleado.cargo}
                                    fullWidth
                                    margin="normal"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Fecha de ingreso"
                                        value={nuevoEmpleado.fecha_ingreso ? dayjs(nuevoEmpleado.fecha_ingreso) : dayjs()}
                                        inputFormat="yyyy/MM/dd"
                                        onChange={(newValue) => {
                                            setNuevoEmpleado({
                                                ...nuevoEmpleado,
                                                fecha_ingreso: newValue,
                                            });
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Salario mensual"
                                    name="salario_mensual"
                                    value={nuevoEmpleado.salario_mensual}
                                    fullWidth
                                    margin="normal"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="h7" gutterBottom>
                            Información de contacto
                        </Typography>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    label="Correo electrónico"
                                    name="email"
                                    value={nuevoEmpleado.email}
                                    fullWidth
                                    margin="normal"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Teléfono"
                                    name="telefono"
                                    value={nuevoEmpleado.telefono}
                                    fullWidth
                                    margin="normal"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Indicativo"
                                    name="indicativo"
                                    value={nuevoEmpleado.indicativo}
                                    fullWidth
                                    margin="normal"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    label="Tipo teléfono"
                                    variant="outlined"
                                    fullWidth
                                    name="tipo"
                                    value={nuevoEmpleado.tipo}
                                    margin="normal"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="tel">Fijo</MenuItem>
                                    <MenuItem value="cel">Celular</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {empleadoEditando ? 'Actualizar empleado' : 'Crear empleado'}
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
