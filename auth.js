document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".auth-btn"); // botón login
  const registerBtn = document.querySelector(".register-btn"); // botón registro
  const logoutBtn = document.getElementById("logout-btn"); // botón logout
  const userInfo = document.getElementById("user-info"); // saludo usuario
  const profileBtn = document.querySelector(".profile-btn"); // icono de perfil

  // Registro
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const confirm = document.getElementById("register-password-confirm").value;

    // Validaciones
    if (name.length < 2) {
      alert("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor ingrese un correo electrónico válido.");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirm) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) {
      alert("Este correo ya está registrado.");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Usuario registrado con éxito.");
    window.location.href = "login.html";
  });
}

  // Login
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Bienvenido " + user.name);
        window.location.href = "index.html";
      } else {
        alert("Correo o contraseña incorrectos");
      }
    });
  }

  // Estado de sesión en la navegación
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    if (loginBtn) loginBtn.style.display = "none";
    if (registerBtn) registerBtn.style.display = "none";
    if (profileBtn) profileBtn.style.display = "none";

    if (userInfo) {
      userInfo.style.display = "inline";
      userInfo.textContent = `Hola, ${currentUser.name}`;
    }
    if (logoutBtn) logoutBtn.style.display = "inline";
  }

  // ----------- Logout -----------
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location.reload();
    });
  }
});