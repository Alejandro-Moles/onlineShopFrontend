import React, { useState } from 'react';
import { DialogContent, TextField, FormControl } from '@mui/material';

function PaymentForm({ formData, formErrors, handleChange, updateData }) {
  const [paymentTypeValue, setPaymentTypeValue] = useState(updateData ? updateData[0].paymentType : formData.paymentType || '');

  const handlePaymentTypeChange = (e) => {
    const newValue = e.target.value;
    setPaymentTypeValue(newValue);
    handleChange('paymentType', newValue, 'paymentType');
  };

  return (
    <DialogContent>
      <FormControl component="fieldset">
        <TextField
          fullWidth
          label="Payment type"
          className="AddDatatext-field"
          value={paymentTypeValue}
          onChange={handlePaymentTypeChange}
          error={Boolean(formErrors.paymentType)}
          helperText={formErrors.paymentType}
        />
      </FormControl>
    </DialogContent>
  );
}

export default PaymentForm;
