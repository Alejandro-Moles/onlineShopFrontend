import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, Collapse } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const CollapsibleTableRow = ({ order }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRow>
        <TableCell>{order.uuid}</TableCell>
        <TableCell>{order.mail}</TableCell>
        <TableCell>
          <IconButton onClick={handleToggle} aria-expanded={open} aria-label="Show more">
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div>
              {/* Add additional details here */}
              <p>Additional details: {order.additionalDetails}</p>
              {/* Add more details as needed */}
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CollapsibleTableRow;
