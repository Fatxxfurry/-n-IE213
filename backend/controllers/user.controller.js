import User from "../models/user.model.js";
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      name: newName,
      email: newEmail,
      password: newPassword,
      address: newAddress,
      role: newRole,
      phoneNumber: newPhoneNumber,
    } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (newName) {
      user.name = newName;
    }
    if (newEmail) {
      user.email = newEmail;
    }
    if (newPassword) {
      user.password = newPassword;
    }
    if (newAddress) {
      user.address = [...newAddress];
    }
    if (newRole) {
      user.role = newRole;
    }
    if (newPhoneNumber) {
      user.phoneNumber = newPhoneNumber;
    }
    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.log("Error in updateUser controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
