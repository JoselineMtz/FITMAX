import { userModel } from "./userModel.js";
import { userView } from "./userView.js";

const appController = {
    registerUser: (name, username, password, confirmPassword, role) => {
        // Validar campos requeridos
        if (!name || !username || !password || !confirmPassword || !role) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Verificar si el usuario ya existe
        if (userModel.findUser(username)) {
            alert("El usuario ya está registrado.");
            return;
        }

        // Guardar el usuario en LocalStorage
        userModel.saveUser({ name, username, password, role });
        alert("Usuario registrado con éxito.");
        userView.redirect("index.html");
    },

    loginUser: (username, password, role) => {
        // Buscar usuario en localStorage
        const user = userModel.findUser(username);

        // Verificar que el usuario exista
        if (!user) {
            alert("Usuario no encontrado.");
            return;
        }

        // Verificar la contraseña
        if (user.password !== password) {
            alert("Contraseña incorrecta.");
            return;
        }

        // Verificar el rol seleccionado
        if (user.role !== role) {
            alert("Rol incorrecto.");
            return;
        }

        // Redirigir al panel correspondiente según el rol
        switch (role) {
            case "admin":
                userView.redirect("panel-admin.html");
                break;
            case "instructor":
                userView.redirect("panel-instructor.html");
                break;
            case "cliente":
                userView.redirect("panelcliente.html");
                break;
            default:
                alert("Rol no válido.");
                break;
        }
    },
};

const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const role = document.getElementById("role").value;

        appController.registerUser(name, username, password, confirmPassword, role);
    };
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.onsubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        appController.loginUser(username, password, role);
    };
}
