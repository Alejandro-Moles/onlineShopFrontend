import React, { useState } from 'react';
import {
  DialogContent,
  TextField,
  FormControl,
} from '@mui/material';

function GenreForm({ formData, formErrors, handleChange }) {
  return (
    <DialogContent>
      <FormControl component="fieldset">
        <TextField
          fullWidth
          label="Genre type"
          className="AddDatatext-field"
          value={formData.genreType || ''}
          onChange={(e) => handleChange('genreType', e.target.value, 'genreType')}
          error={Boolean(formErrors.genreType)}
          helperText={formErrors.genreType}
        />
      </FormControl>
    </DialogContent>
  );
}

export default GenreForm;
