import React, { useState } from 'react';
import { DialogContent, TextField, FormControl } from '@mui/material';

function DeliveryForm({ formData, formErrors, handleChange, updateData }) {
  const [deliveryTypeValue, setDeliveryTypeValue] = useState(updateData ? updateData[0].deliveryType : formData.deliveryType || '');

  const handleDeliveryTypeChange = (e) => {
    const newValue = e.target.value;
    setDeliveryTypeValue(newValue);
    handleChange('deliveryType', newValue, 'deliveryType');
  };

  return (
    <DialogContent>
      <FormControl component="fieldset">
        <TextField
          fullWidth
          label="Delivery type"
          className="AddDatatext-field"
          value={deliveryTypeValue}
          onChange={handleDeliveryTypeChange}
          error={Boolean(formErrors.deliveryType)}
          helperText={formErrors.deliveryType}
        />
      </FormControl>
    </DialogContent>
  );
}

export default DeliveryForm;
