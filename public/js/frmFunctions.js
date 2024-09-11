document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');
    
    togglePassword.addEventListener('click', function () {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        
        // Cambia las clases del icono dependiendo del tipo de campo
        if (type === 'text') {
            this.classList.remove('fa-eye'); 
            this.classList.add('fa-eye-slash');
        } else {
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye'); 
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const alerts = document.querySelectorAll('.alert-wrapper');

    alerts.forEach(alert => {
        const duration = 5000; 
        const progressBar = alert.querySelector('.progress-bar');
        const fadeOut = alert.querySelector('.fade-out');

      // Set progress bar duration
    progressBar.style.transitionDuration = `${duration}ms`;
    setTimeout(() => {
        progressBar.style.width = '0%';
    }, 100);

        // Automatically hide the alert after duration
        setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => {
            alert.remove();
        }, 1000); 
    }, duration);

        // Close button functionality
        const closeButton = alert.querySelector('.close');
        closeButton.addEventListener('click', () => {
        alert.classList.add('fade-out');
        setTimeout(() => {
            alert.remove();
        }, 1000);
        });
    });
});
