import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./TableComponent.css";

function TableComponent({ columns, data, deleteDataBaseHandler}) {
  const [selectionModel, setSelectionModel] = useState([]);

  const handleButtonDelete = () => {
    const selectedData = selectionModel.map((id) => data.find((row) => row.id === id));
    selectedData.forEach((row) => {
      deleteDataBaseHandler(row.uuid, row.category);
    });
    window.location.reload();
  }

  return (
    <div>
      <div className="custom-table">
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                uuid: false,
              },
            },
          }}
          rows={data}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection);
          }}
        />
      </div>
      <div className="floating-buttons">
          <Fab
            className='floatButton'
            color="error" 
            aria-label="Borrar"
            onClick={handleButtonDelete}
            disabled={selectionModel.length === 0}
          >
            <DeleteIcon />
          </Fab>

          <Fab
            className='floatButton'
            color="primary"
            aria-label="Agregar"
          >
            <AddIcon />
          </Fab>

          <Fab
            className='floatButton'
            color="primary"
            aria-label="Modificar"
            disabled={selectionModel.length !== 1}
          >
            <EditIcon />
          </Fab>
        </div>
    </div>
    
  );
}

export default TableComponent;
