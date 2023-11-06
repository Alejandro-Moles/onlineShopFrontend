import React, { useState } from 'react';
import { DialogContent, TextField, FormControl } from '@mui/material';

function PlatformForm({ formData, formErrors, handleChange, updateData }) {
  const [platformTypeValue, setPlatformTypeValue] = useState(updateData ? updateData[0].platformsType : formData.platformType || '');

  const handlePlatformTypeChange = (e) => {
    const newValue = e.target.value;
    setPlatformTypeValue(newValue);
    handleChange('platformType', newValue, 'platformType');
  };

  return (
    <DialogContent>
      <FormControl component="fieldset">
        <TextField
          fullWidth
          label="Platform type"
          className="AddDatatext-field"
          value={platformTypeValue}
          onChange={handlePlatformTypeChange}
          error={Boolean(formErrors.platformType)}
          helperText={formErrors.platformType}
        />
      </FormControl>
    </DialogContent>
  );
}

export default PlatformForm;
