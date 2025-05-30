import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const newUser = { name, email, password, role: "user" };

      localStorage.setItem("user", JSON.stringify(newUser));
      set({ user: newUser, loading: false });
      toast.success("Signup successful!");
    } catch (error) {
      set({ loading: false });
      toast.error("An error occurred during signup");
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      const mockUsers = [
        {
          email: "admin@example.com",
          password: "admin",
          name: "Admin",
          role: "admin",
        },
        {
          email: "user@example.com",
          password: "user",
          name: "User",
          role: "user",
        },
      ];

      const foundUser = mockUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        localStorage.setItem("user", JSON.stringify(foundUser));
        set({ user: foundUser, loading: false });
        toast.success("Login successful!");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.message || "An error occurred");
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem("user");
      set({ user: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("An error occurred during logout");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      set({ user, checkingAuth: false });
    } catch (error) {
      console.log(error.message);
      set({ checkingAuth: false, user: null });
    }
  },
}));
