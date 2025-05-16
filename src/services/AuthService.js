const AuthService = {
  // Get all registered users
  getUsers: () => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  },

  // Save users to localStorage
  saveUsers: (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  },

  // Register a new user
  registerUser: (username, password) => {
    const users = AuthService.getUsers();

    // Check if username already exists
    if (users.some((user) => user.username === username)) {
      return { success: false, message: "Username already exists" };
    }

    const newUser = {
      id: Date.now(),
      username,
      password, // In a real app, you would hash this password
    };

    const updatedUsers = [...users, newUser];
    AuthService.saveUsers(updatedUsers);

    return {
      success: true,
      user: { id: newUser.id, username: newUser.username },
    };
  },

  // Login a user
  loginUser: (username, password) => {
    const users = AuthService.getUsers();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Store user session in localStorage (excluding password)
      const userSession = { id: user.id, username: user.username };
      localStorage.setItem("user", JSON.stringify(userSession));
      return { success: true, user: userSession };
    }

    return { success: false, message: "Invalid username or password" };
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return localStorage.getItem("user") !== null;
  },

  // Get current user
  getCurrentUser: () => {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
  },

  // Logout user
  logoutUser: () => {
    localStorage.removeItem("user");
    return true;
  },
};

export default AuthService;
