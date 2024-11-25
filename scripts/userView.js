export const userView = {
    redirect: (url) => {
        window.location.href = url;
    },

    setupRegisterForm: () => {
        const form = document.getElementById("registerForm");
        form.onsubmit = (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();
            const role = document.getElementById("role").value;

            appController.registerUser(name, username, password, confirmPassword, role);
        };
    },

    setupLoginForm: () => {
        const form = document.getElementById("loginForm");
        form.onsubmit = (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            appController.loginUser(username, password);
        };
    },
};
