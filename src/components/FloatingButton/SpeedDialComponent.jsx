import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SpeedDial,
  SpeedDialAction,
} from '@mui/material';
import {
  Inventory2 as InventoryIcon,
  Folder as FolderIcon,
  HistoryEdu as HistoryEduIcon,
} from '@mui/icons-material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShopUserService from '../../services/shopUserService';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

const SpeedDialComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
        ShopUserService.getActualShopUser(token)
            .then(response => {
                setUser(response.data);
                setIsAdmin(response.data.roles.includes('ADMIN'));
                setIsEmployee(response.data.roles.includes('EMPLOYEE'));
            })
            .catch(error => {
                console.error('Error al cargar al usuario');
            })
    }
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleAction = (action) => {
    handleClose();
    if (action === 'products') {
      navigate('/dataPage');
    }

    if (action === 'orders') {
      navigate('/ordersPage');
    }

    if (action === 'stadistic') {
      navigate('/stadisticPage');
    }

    if (action === 'users') {
      navigate('/userTablePage');
    }
  };

  const actions = [
    { icon: <InventoryIcon  />, name: 'Products', action: 'products' },
    { icon: <HistoryEduIcon />, name: 'Orders', action: 'orders' },
  ];

  if (isAdmin) {
    actions.push({ icon: <FolderSharedIcon />, name: 'Users', action: 'users' });
    actions.push({ icon: <TrendingUpIcon />, name: 'Stadistic', action: 'stadistic' });
  }

  if (!isEmployee) {
    return null;
  }

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      hidden={hidden}
      icon={
        <div
          style={{
            backgroundColor: '#EC6B22',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <FolderIcon sx={{ fontSize: 32, color: 'white' }} />
        </div>
      }
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="up"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => handleAction(action.action)}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialComponent;

