import React, { useState } from 'react';
import {
  DialogContent,
  TextField,
  FormControl,
} from '@mui/material';

function DeliveryForm({ formData, formErrors, handleChange }) {
  return (
    <DialogContent>
      <FormControl component="fieldset">
        <TextField
          fullWidth
          label="Delivery type"
          className="AddDatatext-field"
          value={formData.deliveryType || ''}
          onChange={(e) => handleChange('deliveryType', e.target.value, 'deliveryType')}
          error={Boolean(formErrors.deliveryType)}
          helperText={formErrors.deliveryType}
        />
      </FormControl>
    </DialogContent>
  );
}

export default DeliveryForm;
