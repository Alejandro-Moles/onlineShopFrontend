import React, { useState } from 'react';
import { DialogContent, TextField, FormControl } from '@mui/material';

function CategoryForm({ formData, formErrors, handleChange, updateData }) {
  const [categoryTypeValue, setCategoryTypeValue] = useState(updateData ? updateData[0].categoryType : formData.categoryType || '');

  const handleCategoryTypeChange = (e) => {
    const newValue = e.target.value;
    setCategoryTypeValue(newValue);
    handleChange('categoryType', newValue, 'categoryType');
  };

  return (
    <DialogContent>
      <FormControl component="fieldset">
        <TextField
          fullWidth
          label="Category type"
          className="AddDatatext-field"
          value={categoryTypeValue}
          onChange={handleCategoryTypeChange}
          error={Boolean(formErrors.categoryType)}
          helperText={formErrors.categoryType}
        />
      </FormControl>
    </DialogContent>
  );
}

export default CategoryForm;
