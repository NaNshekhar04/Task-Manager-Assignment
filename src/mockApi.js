export const mockApi = {
    register: (username, password) => {
        const existingUser = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = existingUser.find(user => user.username === username);

        if (userExists) {
            return { success: false, message: 'User already exists' };
        }

        existingUser.push({ username, password });
        localStorage.setItem('users', JSON.stringify(existingUser));
        return { success: true };
    },

    login: (username, password) => {
        const existingUser = JSON.parse(localStorage.getItem('users')) || [];
        const user = existingUser.find(user => user.username === username && user.password === password);

        if (user) {
            return { success: true };
        }

        return { success: false, message: 'Invalid credentials' };
    },
};
