import React, { useState } from 'react';
import { DialogContent, TextField, FormControl } from '@mui/material';

function GenreForm({ formData, formErrors, handleChange, updateData }) {
  const [genreTypeValue, setGenreTypeValue] = useState(updateData ? updateData[0].genreType : formData.genreType || '');

  const handleGenreTypeChange = (e) => {
    const newValue = e.target.value;
    setGenreTypeValue(newValue);
    handleChange('genreType', newValue, 'genreType');
  };

  return (
    <DialogContent>
      <FormControl component="fieldset">
        <TextField
          fullWidth
          label="Genre type"
          className="AddDatatext-field"
          value={genreTypeValue}
          onChange={handleGenreTypeChange}
          error={Boolean(formErrors.genreType)}
          helperText={formErrors.genreType}
        />
      </FormControl>
    </DialogContent>
  );
}

export default GenreForm;
