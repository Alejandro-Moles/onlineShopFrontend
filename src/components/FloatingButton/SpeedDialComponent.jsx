import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SpeedDial,
  SpeedDialAction,
} from '@mui/material';

import {
  Inventory2 as InventoryIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Folder as FolderIcon,
  HistoryEdu as HistoryEduIcon,

} from '@mui/icons-material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const SpeedDialComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const navigate = useNavigate();

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
  };

  const actions = [
    { icon: <InventoryIcon  />, name: 'Products', action: 'products' },
    { icon: <HistoryEduIcon />, name: 'Orders', action: 'orders' },
    { icon: <TrendingUpIcon/>, name: 'Stadistic', action: 'stadistic'}
  ];

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
          onClick={() => handleAction(action.action)}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialComponent;
