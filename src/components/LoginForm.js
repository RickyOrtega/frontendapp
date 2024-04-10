import { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { iniciarSesion } from '@/data/sesion';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await iniciarSesion(username, password);
      if (data.key) {
        localStorage.setItem('token', data.key);
      } else {
        setError('Credenciales incorrectas');
      }

      router.push('/gestion-usuarios');

    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={6} xl={6}>
          <Typography variant="h5" align="center" gutterBottom>
            Iniciar Sesión
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Iniciar sesión
            </Button>
          </form>
      </Grid>
    </Grid>
  );
}