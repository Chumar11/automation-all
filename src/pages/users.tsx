import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { getUsers, createUser, updateUser, deleteUser } from "src/services";

interface User {
  _id: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  browserLimit: number; // Add this field
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    role: "admin" | "user";
    browserLimit: number;
  }>({
    email: "",
    password: "",
    role: "user",
    browserLimit: 1,
  });
  console.log("browser", formData);
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("/api/users");
  //       const data = await response.json();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditUser(null);
    setFormData({
      email: "",
      password: "",
      role: "user",
      browserLimit: formData?.browserLimit, // Keep the current browserLimit
    });
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editUser) {
        await updateUser(editUser._id, formData);
      } else {
        await createUser(formData);
      }
      handleClose();
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  return (
    <Card>
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <h1>Users Management</h1>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add User
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Browser Limit</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.role === "admin" ? "N/A" : user.browserLimit}
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setEditUser(user);
                        setFormData({
                          email: user.email,
                          password: "",
                          role: user.role,
                          browserLimit: user.browserLimit, // Don't use the || operator here
                        });
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editUser ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}
            >
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {!editUser && (
                <TextField
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              )}
              <FormControl>
                <InputLabel>Role</InputLabel>
                <Select
                  value={formData.role}
                  label="Role"
                  onChange={(e) => {
                    const newRole = e.target.value as "admin" | "user";
                    setFormData({
                      ...formData,
                      role: newRole,
                      // Reset browserLimit to 0 for admin, keep current or default for user
                      browserLimit:
                        newRole === "admin" ? 0 : formData.browserLimit || 1,
                    });
                  }}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              {formData.role === "user" && (
                <TextField
                  label="Browser Limit"
                  type="number"
                  value={formData.browserLimit}
                  onChange={(e) => {
                    const value = e.target.value;
                    const numValue = parseInt(value);
                    if (value === "") {
                      setFormData({ ...formData, browserLimit: 1 }); // Set to minimum if empty
                    } else if (!isNaN(numValue) && numValue >= 1) {
                      setFormData({ ...formData, browserLimit: numValue });
                    }
                  }}
                  inputProps={{
                    min: 1,
                    step: 1,
                  }}
                  error={formData?.browserLimit < 1}
                  helperText={
                    formData?.browserLimit < 1 ? "Minimum value is 1" : ""
                  }
                  required
                />
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editUser ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Card>
  );
};

export default Users;
