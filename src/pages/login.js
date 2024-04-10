import { useState } from 'react';
import { useRouter } from 'next/router';
import BigImage from '../components/BigImage';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import styles from '../styles/Container.module.css';

export default function Login() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <BigImage/>
      <LoginForm/>
    </div>
  );
}
