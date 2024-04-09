import { useState } from 'react';
import { useRouter } from 'next/router';
import BigImage from '../components/BigImage';
import LoginForm from '../components/LoginForm';
import styles from '../styles/Container.module.css';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === 'usuario' && password === 'contraseña') {
      router.push('/');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className={styles.container}>
      <BigImage/>
      <LoginForm/>
      
    </div>
  );
}
