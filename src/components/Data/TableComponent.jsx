import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./TableComponent.css";
import ConfirmationDialog from '../Dialog/ConfirmationDialog';
import AddDataDialog from '../Dialog/AddDataDialog';

function TableComponent({ columns, data, deleteDataBaseHandler}) {
  const [selectionModel, setSelectionModel] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [tableType, setTableType] = useState([]);

  const filteredColumns = columns.filter((column) => {
    return !['uuid', 'id', 'deleted'].includes(column.field);
  });

  const handleButtonDelete = () => {
    const selectedData = selectionModel.map((id) => data.find((row) => row.id === id));
    selectedData.forEach((row) => {
      if (typeof deleteDataBaseHandler === 'function') {
        if (row.categoryType) {
          deleteDataBaseHandler(row.uuid, row.categoryType);
        } else if (row.platformsType) {
          deleteDataBaseHandler(row.uuid, row.platformsType);
        } else if(row.productTitle) {
          const isDigital = row.digital === "Yes";
          deleteDataBaseHandler(row.uuid, row.category, row.platform, row.pegi, row.productTitle, row.price, row.weight, row.stock, row.description, isDigital, row.image);
        } else if(row.countryName){
          deleteDataBaseHandler(row.uuid, row.countryName);
        } else if(row.cityName){
          deleteDataBaseHandler(row.uuid, row.cityName, row.countryCity);
        } else if(row.postalCodeContent){
          deleteDataBaseHandler(row.uuid, row.postalCodeContent, row.cityPostalCode, row.countryPostalCode);
        } else if(row.paymentType){
          deleteDataBaseHandler(row.uuid, row.paymentType);
        } else if (row.deliveryType){
          deleteDataBaseHandler(row.uuid, row.deliveryType);
        } else if(row.genreType){
          deleteDataBaseHandler(row.uuid, row.genreType);
        } else if(row.userMail){
          deleteDataBaseHandler(row.uuid, row.userRol, row.name, row.surname, row.userMail, row.birth);
        }
      }
    });
    //window.location.reload();
  }

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  }

  const handleOpenAddDataDialog = () => {
    setIsAdding(true);
    for (const item of data) {
      if(item.categoryType){
        setTableType("category");
        return;
      } else if(item.platformsType){
        setTableType("platforms");
        return;
      } else if(item.productTitle){
        setTableType("products");
        return;
      } else if(item.paymentType){
        setTableType("payment");
        return;
      } else if(item.deliveryType){
        setTableType("delivery");
        return;
      } else if(item.genreType){
        setTableType("genre");
        return;
      } 
    }
  }

  const handleCloseAddDataDialog = () => {
    setIsAdding(false);
  }

  return (
    <div>
      <div className="custom-table">
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                uuid: false,
                image: false,
                password: false
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
            onClick={handleOpenDialog}
            disabled={selectionModel.length === 0}
          >
            <DeleteIcon />
          </Fab>

          <Fab
            className='floatButton'
            color="primary"
            aria-label="Agregar"
            onClick={handleOpenAddDataDialog}
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
        <ConfirmationDialog
            open={isDialogOpen}
            onClose={handleCloseDialog}
            onConfirmAction={handleButtonDelete}
          />

        <AddDataDialog
          open={isAdding}
          onClose={handleCloseAddDataDialog}
          columns={filteredColumns}
          tableType={tableType}
        />
    </div>
    
  );
}

export default TableComponent;
