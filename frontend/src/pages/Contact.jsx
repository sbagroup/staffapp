import { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Stack } from "@mui/material";

// Backend URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Contact() {
  const initialForm = {
    name: "",
    email: "",
    telephone: "",
    address: "",
    customerId: "",
    message: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Reset form
  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Email is invalid";

    if (!form.telephone.trim())
      newErrors.telephone = "Telephone is required";
    else if (!/^\d{7,15}$/.test(form.telephone))
      newErrors.telephone = "Telephone must be 7-15 digits";

    if (!form.customerId.trim())
      newErrors.customerId = "Customer ID is required";

    if (!form.message.trim())
      newErrors.message = "Message is required";
    else if (form.message.split(/\s+/).length > 100)
      newErrors.message = "Max 100 words";

    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Request failed: ${res.status}`);
      }

      alert(data.message || "Message sent successfully!");
      resetForm(); // ✅ reset on success
    } catch (err) {
      console.error("Frontend error:", err);
      alert(err.message || "Failed to send message");

      resetForm(); // ✅ reset on error (your requirement)
    } finally {
      setLoading(false);
    }
  };

  // Cancel / Exit
  const handleCancel = () => {
    resetForm();
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Staff Detail
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Employee Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            fullWidth
            label="Employee Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            label="Employee Contact Number"
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            margin="normal"
            error={!!errors.telephone}
            helperText={errors.telephone}
          />

          <TextField
            fullWidth
            label="Employee Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Employee ID"
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            margin="normal"
            error={!!errors.customerId}
            helperText={errors.customerId}
          />

          <TextField
            fullWidth
            label="Additional Information"
            name="message"
            value={form.message}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            error={!!errors.message}
            helperText={errors.message}
          />

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default Contact;