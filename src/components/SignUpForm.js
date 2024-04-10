import { useState } from "react";
import { useRouter } from "next/router";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";

export default function SignUpForm({ onToggleForm }) {
  const router = useRouter();

  //Usuario:
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [tipo_identificacion, setTipoIdentificacion] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [salario_mensual, setSalario_mensual] = useState("");
  const [cargo, setCargo] = useState("");
  const [departamento, setDepartamento] = useState("");

  //Email:
  const [email, setEmail] = useState("");
  const [empleado_email, setEmpleado_email] = useState("");

  //Teléfono:
  const [tipo, setTipo] = useState("");
  const [numero, setNumero] = useState("");
  const [indicativo, setIndicativo] = useState("");
  const [empleado_telefono, setEmpleado_telefono] = useState("");

  const [error, setError] = useState("");

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={10} sm={8} md={6} lg={6} xl={6}>
        <Typography variant="h5" align="center" gutterBottom>
          Crear cuenta
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form>
          <TextField
            label="Nombre de usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Select
                label="Tipo de documento"
                variant="outlined"
                fullWidth
                value={tipo_identificacion}
                onChange={(e) => setTipoIdentificacion(e.target.value)}
                displayEmpty
                margin="normal"
              >
                <MenuItem value="" disabled>
                  Selecciona el tipo de documento
                </MenuItem>
                <MenuItem value="nit">NIT</MenuItem>
                <MenuItem value="cc">Cédula de ciudadanía</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Número de documento"
                variant="outlined"
                fullWidth
                margin="normal"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" fullWidth>
            Crear cuenta
          </Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: 20 }}>
          ¿Ya tienes cuenta?{" "}
          <a href="#" onClick={onToggleForm}>
            Inicia sesión
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
}
