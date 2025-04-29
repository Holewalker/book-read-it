import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const FollowedTabs = ({ activeTab, setActiveTab }) => {
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab label="Temas seguidos" value="followed" />
        <Tab label="Explorar" value="public" />
      </Tabs>
    </Box>
  );
};

export default FollowedTabs;
