/**
 * auth.js – Login, registro, sesiones, 2FA y social-login
 */
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async e => {
      e.preventDefault();
      const data = {
        username: registerForm.username.value,
        email: registerForm.email.value,
        password: registerForm.password.value,
        pin: registerForm.pin.value
      };
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (res.ok) {
          alert('Registrado con éxito');
          window.location = 'index.html';
        } else {
          alert(result.message || 'Error al registrar');
        }
      } catch(err) {
        console.error(err);
        alert('Fallo de red');
      }
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const data = {
        email: loginForm.email.value,
        password: loginForm.password.value
      };
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (res.ok) {
          sessionStorage.setItem('token', result.token);
          window.location = 'index.html';
        } else {
          alert(result.message || 'Credenciales inválidas');
        }
      } catch(err) {
        console.error(err);
        alert('Fallo de red');
      }
    });
  }

  // 2FA stub
  window.send2FA = async function(email) {
    await fetch('/api/auth/2fa', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email}) });
    alert('Código 2FA enviado');
  };

  // Social login
  window.socialLogin = provider => {
    window.location = `/api/auth/${provider}`;
  };
});
