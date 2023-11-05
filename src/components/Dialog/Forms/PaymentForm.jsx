import React, { useState } from 'react';
import {
  DialogContent,
  TextField,
  FormControl,
} from '@mui/material';

function PaymentForm({ formData, formErrors, handleChange }) {
  return (
    <DialogContent>
      <FormControl component="fieldset">
        <TextField
          fullWidth
          label="Payment type"
          className="AddDatatext-field"
          value={formData.paymentType || ''}
          onChange={(e) => handleChange('paymentType', e.target.value, 'paymentType')}
          error={Boolean(formErrors.paymentType)}
          helperText={formErrors.paymentType}
        />
      </FormControl>
    </DialogContent>
  );
}

export default PaymentForm;
