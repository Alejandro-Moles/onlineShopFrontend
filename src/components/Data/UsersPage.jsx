import React, { useState, useEffect } from 'react';
import { fetchShopUsers, fetchRoles } from '../../scripts/loadData';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../scripts/Theme';
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ShopUserService from '../../services/shopUserService';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);

  const handleOpen = () => {
    const selectedUser = users.find((user) => user.uuid === selectionModel[0]);
    const selectedUserRoles = selectedUser ? selectedUser.roles : [];
    setSelectedRoles(selectedUserRoles);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleRoleToggle = (role) => {
    const currentIndex = selectedRoles.indexOf(role);
    const newSelectedRoles = [...selectedRoles];

    if (currentIndex === -1) {
      newSelectedRoles.push(role);
    } else {
      newSelectedRoles.splice(currentIndex, 1);
    }

    setSelectedRoles(newSelectedRoles);
  };

  const handleAssignRoles = async () => {
    const selectedUser = users.find((user) => user.uuid === selectionModel[0]);

    try {
      await ShopUserService.updateShopUserRoles(selectedUser.uuid, selectedRoles);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error al asignar roles:", error);
    }
    handleClose();
  };

  const columns = [
    { field: 'uuid', headerName: 'UUID', flex: 1 },
    { field: 'mail', headerName: 'Mail', flex: 1 },
    { field: 'name', headerName: 'User Name', flex: 1 },
    { field: 'surname', headerName: 'User Surname', flex: 1 },
    { field: 'roles', headerName: 'User Roles', flex: 1 },
  ];

  useEffect(() => {
    const fetchInitialData = async () => {
      const fetchedUsers = await fetchShopUsers();
      const fetchedRoles = await fetchRoles();
      setUsers(fetchedUsers);
      setRoles(fetchedRoles);

      const token = localStorage.getItem('token');
      if (token) {
          ShopUserService.getActualShopUser(token)
              .then(response => {
                  setIsAdmin(response.data.roles.includes('EMPLOYEE'));
              })
              .catch(error => {
                  console.error('Error al cargar al usuario');
              })
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const selectedUser = users.find((user) => user.uuid === selectionModel[0]);
    const selectedUserRoles = selectedUser ? selectedUser.roles : [];
    console.log(selectedUserRoles)
    setSelectedRoles(selectedUserRoles);
  }, [selectionModel, users]);


  if (!isAdmin) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          checkboxSelection
          getRowId={(row) => row.uuid}
          onRowSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection);
          }}
          className='tableContainer'
        />
      </div>

      <div className="floating-buttons">
        <Fab
          className='floatButton'
          color="primary"
          aria-label="Edit"
          disabled={selectionModel.length !== 1}
          onClick={handleOpen}
        >
          <EditIcon />
        </Fab>
      </div>

    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle>Lista de Roles</DialogTitle>
      <DialogContent>
        <List>
          {roles.map((role) => (
            <ListItem key={role.uuid}>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                color="primary"
                checked={selectedRoles.includes(role.type)}
                onChange={() => handleRoleToggle(role.type)}
                key={role.uuid}
              />
              <ListItemText primary={role.type} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAssignRoles} color="primary">
          Assign
        </Button>
      </DialogActions>
    </Dialog>
    </ThemeProvider>
  );
};

export default UserPage;
