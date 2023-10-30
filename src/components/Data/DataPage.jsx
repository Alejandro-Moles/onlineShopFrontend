import React from 'react';
import { Tabs, Tab, Paper } from '@mui/material';

const DataPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          centered
        >
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
        </Tabs>
      </Paper>
      
      {/* Content for each tab */}
      {value === 0 && <div>Content for Tab 1</div>}
      {value === 1 && <div>Content for Tab 2</div>}
      {value === 2 && <div>Content for Tab 3</div>}
    </div>
  );
};

export default DataPage;