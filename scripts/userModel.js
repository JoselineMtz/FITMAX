export const userModel = {
    users: JSON.parse(localStorage.getItem("users")) || [],

    findUser: (username) => {
        return userModel.users.find((user) => user.username === username);
    },

    saveUser: (user) => {
        userModel.users.push(user);
        localStorage.setItem("users", JSON.stringify(userModel.users));
    },
};
