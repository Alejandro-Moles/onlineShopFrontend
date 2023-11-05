import React, { useState } from 'react';
import {
  DialogContent,
  TextField,
  FormControl,
} from '@mui/material';

function CategoryForm({ formData, formErrors, handleChange }) {
  return (
    <DialogContent>
      <FormControl component="fieldset">
        <TextField
          fullWidth
          label="Category type"
          className="AddDatatext-field"
          value={formData.categoryType || ''}
          onChange={(e) => handleChange('categoryType', e.target.value, 'categoryType')}
          error={Boolean(formErrors.categoryType)}
          helperText={formErrors.categoryType}
        />
      </FormControl>
    </DialogContent>
  );
}

export default CategoryForm;
