
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, IconButton, Switch,
  Dialog, DialogActions, DialogContent, DialogTitle, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {

  const a =  useSelector((state) => state.counter)
  // console.log(a)
  const initialData = [
    { id: 1, name: 'Alice', age: 25, active: true },
    { id: 2, name: 'Bob', age: 30, active: false },
    { id: 3, name: 'Charlie', age: 28, active: true },
  ];

  const [rows, setRows] = useState(initialData);
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', age: '', active: false });

  // State for the confirmation dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);

  const handleEditClick = (row) => {
    setEditRowId(row.id);
    setEditFormData({ name: row.name, age: row.age, active: row.active });
  };

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  const handleSaveClick = (id) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, ...editFormData } : row
    );
    setRows(updatedRows);
    setEditRowId(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteRowId(id); // Store the id of the row to be deleted
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };

  const handleDeleteConfirm = () => {
    const updatedRows = rows.filter((row) => row.id !== deleteRowId);
    setRows(updatedRows);
    setOpenDeleteDialog(false); // Close the dialog after deletion
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false); // Close the dialog if user cancels
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStatusChange = (e) =>  {
    setEditFormData((prevData) => ({ ...prevData, active: e.target.checked }));
  };

  return (
    <div className="container mx-auto p-6">
      <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden bg-opacity-60 backdrop-blur-xl">
        <Table aria-label="editable table" className="bg-opacity-60 backdrop-blur-xl">
          <TableHead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <TableRow>
              <TableCell className="px-6 py-3">Name</TableCell>
              <TableCell className="px-6 py-3">Age</TableCell>
              <TableCell className="px-6 py-3">Active</TableCell>
              <TableCell className="px-6 py-3 text-right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {/* Name Field */}
                <TableCell className="px-6 py-3">
                  {editRowId === row.id ? (
                    <TextField
                      name="name"
                      value={editFormData.name}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  ) : (
                    row.name
                  )}
                </TableCell>

                {/* Age Field */}
                <TableCell className="px-6 py-3">
                  {editRowId === row.id ? (
                    <TextField
                      name="age"
                      type="number"
                      value={editFormData.age}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  ) : (
                    row.age
                  )}
                </TableCell>

                {/* Active Field */}
                <TableCell className="px-6 py-3">
                  {editRowId === row.id ? (
                    <Switch
                      checked={editFormData.active}
                      onChange={handleStatusChange}
                      color="primary"
                    />
                  ) : (
                    row.active ? 'Active' : 'Inactive'
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell className="px-6 py-3 text-right">
                  {editRowId === row.id ? (
                    <>
                      <IconButton
                        onClick={() => handleSaveClick(row.id)}
                        color="primary"
                        className="mr-3"
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton
                        onClick={handleCancelClick}
                        color="secondary"
                      >
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => handleEditClick(row)}
                        color="primary"
                        className="mr-3"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(row.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this row?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
