
function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.getElementById('togglePasswordIcon');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.classList.remove('bi-eye');
    toggleIcon.classList.add('bi-eye-slash');
  } else {
    passwordInput.type = 'password';
    toggleIcon.classList.remove('bi-eye-slash');
    toggleIcon.classList.add('bi-eye');
  }
}
