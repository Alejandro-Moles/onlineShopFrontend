import React, { useState, useEffect } from 'react';
import ProductService from '../../services/productService';
import Bars from '../Charts/Bar'
import { Typography, Container, Paper, Box, Grid, Tabs, Tab, TextField, Button, MenuItem  } from '@mui/material';
import ShopUserService from '../../services/shopUserService';
import OrderService from '../../services/orderService';
import Pies from '../Charts/PiesChart'
import LinesChart from '../Charts/LinesChart';
import CustomAlert from '../AlertsMessage/CustomAlert';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../scripts/Theme'; 
import ForbiddenPage from '../ErrorPages/ForbiddenPage';

const StatisticsComponent = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [userStatistic, setuserStatistic] = useState([]);
  const [saleStatistic, setSaleStatistic] = useState([]);
  const [value, setValue] = useState(0);
  const [emailInput, setEmailInput] = useState('');
  const [showDataList, setShowDataList] = useState(false);
  const [showLinesChart, setShowLinesChart] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const formatProductFormat = (isDigital) => {
    return isDigital ? "Digital" : "Physical";
  };

  const labels = topProducts.map(product => "Title: "+product.title + "\n" + "Categoty: " +product.category + "\n" + "Platform: "+product.platform + "\n" + "Format: "+formatProductFormat(product.isDigital));
  const title = topProducts.map(product => product.title);

  const data = topProducts.map(product => product.totalSold);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const [isAdmin, setIsAdmin] = useState(false);

  const options = {
      responsive: true,
      animation: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          min: 0,
          max: Math.max(...data),
          grid: {
            color: 'rgb(255, 255, 255,0.4)',
            borderColor: 'rgb(255, 255, 255)',
          },
          ticks: {
            color: 'rgb(255, 255, 255, 0.4)',
          },
          title: {
            color: 'rgb(255, 255, 255)',
          },
        },
        x: {
          ticks: { color: 'rgb(255, 255, 255)' },
        },
      },
  };

  useEffect(() => {
    ProductService.getTopProducts()
      .then(response => {
        setTopProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
    
      const token = localStorage.getItem('token');
      if (token) {
          ShopUserService.getActualShopUser(token)
              .then(response => {
                  setIsAdmin(response.data.roles.includes('ADMIN'));
              })
              .catch(error => {
                  console.error('Error al cargar al usuario');
              })
      }
  }, []);

  const fetchUserStatistic = async (uuid) => {
    try {
      const response = await ShopUserService.getShopUserStatistic(uuid);
      setuserStatistic(response.data);
      setShowDataList(true);
    } catch (error) {
      showAlert("Error fetching user statistic", "error");
    }
  };

  const handleFetchUserStatistic = () => {
    if (emailInput) {
      fetchUserStatistic(emailInput);
    } else {
      showAlert("Enter a valid email address", "error");
    }
  };

  const fetchSalesStatistic = async (startDate, endDate) => {
    try {
        const response = await OrderService.getRevenueStatistic({ startDate: startDate, endDate: endDate });
        const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setSaleStatistic(sortedData);
        setShowLinesChart(true);
    } catch (error) {
        showAlert("Error fetching user statistic", "error");
    }
};

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
      setEndDate(date);
  };

  const handlePrintDates = () => {
    if(!startDate || !endDate){
      showAlert("Insert start date and end date", "error")
      return;
    }

    if (startDate && endDate && endDate.isBefore(startDate)) {
      showAlert("The end date cannot be less than the start date", "error")
    } else {
      const formattedStartDate = startDate ? dayjs(startDate).format('DD/MM/YYYY') : '';
      const formattedEndDate = endDate ? dayjs(endDate).format('DD/MM/YYYY') : '';

      fetchSalesStatistic(formattedStartDate, formattedEndDate);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setIsAlertOpen(true);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" style={{ marginTop: '50px', }}>
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <Typography variant="h3" component="div" style={{ color: '#fff', paddingBottom: '20px' }}>
            STATISTICS
          </Typography>
        </Box>
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#1E1E1E' }}>
          <Tabs value={value} onChange={handleChange} centered sx={{ color: '#fff' }}>
            <Tab label="Top Sales" style={{ color: '#fff' }} />
            <Tab label="Clients" style={{ color: '#fff' }} />
            <Tab label="Sales" style={{ color: '#fff' }} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', color:"white" }}>
              Top Sale Products
            </Typography>
            <Bars title={title} labels={labels} data={data} options={options} />
          </TabPanel>
          
          <TabPanel value={value} index={1}>
            <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', color:"white" }}>
              Clients Statistics
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <TextField
                label="Email"
                variant="outlined"
                value={emailInput}
                onChange={handleEmailChange}
                sx={{
                  marginBottom: '10px',
                  width: '70%',
                  '& input': {
                    backgroundColor: 'white',
                    borderRadius: '4px',
                  },
                }}
              />
              <Button variant="contained" color="primary" onClick={handleFetchUserStatistic} style={{ padding: '15px', width: '70%' }}>
                Fetch Statistics
              </Button>
            </Box>
            <Box style={{
              width: '100%',
              height: '400px',
              margin: '0 auto',
              padding: '10px',
            }}>
              {showDataList && userStatistic && Object.keys(userStatistic).length > 0 && (
                <Pies labels={['Orders Placed', 'Total spent', 'Total Games Purchased']}  data={Object.values(userStatistic)} />
              )}
            </Box>
          </TabPanel>

          
          <TabPanel value={value} index={2}>
            <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', color:"white"}}>
              Sales Statistics
            </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                margin: '10px',
              }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Start Date" value={startDate} onChange={handleStartDateChange}/>
                  <DatePicker label="End Date" value={endDate} onChange={handleEndDateChange} minDate={startDate}/>
                  <Button variant="contained" color="primary" onClick={handlePrintDates} style={{ padding: '15px', width: '70%' }}>
                    Print Dates
                  </Button>
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            {showLinesChart && saleStatistic && saleStatistic.length > 0 && (
                <Box>
                    <LinesChart labels={saleStatistic.map(item => item.date)} data={saleStatistic.map(item => item.totalRevenue)} />
                </Box>
            )}
          </TabPanel>
        </Paper>
        <CustomAlert
          message={alertMessage}
          severity={alertSeverity}
          open={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          autoHideDuration={2000}
        />
      </Container>
    </ThemeProvider>
  );
};

export default StatisticsComponent;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

