import React, { useState } from 'react';
import {
  DialogContent,
  TextField,
  FormControl,
} from '@mui/material';

function PlatformForm({ formData, formErrors, handleChange }) {
  return (
    <DialogContent>
      <FormControl component="fieldset">
        <TextField
          fullWidth
          label="Platform type"
          className="AddDatatext-field"
          value={formData.platformType || ''}
          onChange={(e) => handleChange('platformType', e.target.value, 'platformType')}
          error={Boolean(formErrors.platformType)}
          helperText={formErrors.platformType}
        />
      </FormControl>
    </DialogContent>
  );
}

export default PlatformForm;
