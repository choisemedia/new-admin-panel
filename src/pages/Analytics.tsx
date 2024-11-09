import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics = () => {
  const orders = useSelector((state: RootState) => state.orders.items);
  const products = useSelector((state: RootState) => state.products.items);
  const customers = useSelector((state: RootState) => state.customers.items);

  // Calculate sales by status
  const salesByStatus = [
    { name: 'Pending', value: orders.filter(o => o.status === 'pending').length },
    { name: 'Completed', value: orders.filter(o => o.status === 'completed').length },
    { name: 'Cancelled', value: orders.filter(o => o.status === 'cancelled').length }
  ];

  // Calculate top selling products
  const productSales = products.map(product => {
    const sales = orders.reduce((total, order) => {
      const orderItem = order.products.find(item => item.productId === product.id);
      return total + (orderItem?.quantity || 0);
    }, 0);
    return { name: product.name, sales };
  }).sort((a, b) => b.sales - a.sales).slice(0, 5);

  // Calculate revenue over time
  const revenueData = orders.reduce((acc: any[], order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    const existingDate = acc.find(item => item.date === date);
    if (existingDate) {
      existingDate.revenue += order.totalAmount;
    } else {
      acc.push({ date, revenue: order.totalAmount });
    }
    return acc;
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Analytics</Typography>

      <Grid container spacing={3}>
        {/* Order Status Distribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Order Status Distribution</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesByStatus}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {salesByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Selling Products */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Top Selling Products</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productSales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Over Time */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Revenue Over Time</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Statistics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Customer Statistics</Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Total Customers"
                    secondary={customers.length}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Average Order Value"
                    secondary={`${orders.reduce((acc, order) => acc + order.totalAmount, 0) / orders.length || 0}⭐`}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Total Revenue"
                    secondary={`${orders.reduce((acc, order) => acc + order.totalAmount, 0)}⭐`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Activity</Typography>
              <List>
                {orders.slice(0, 5).map((order) => (
                  <ListItem key={order.id}>
                    <ListItemText 
                      primary={`Order #${order.id}`}
                      secondary={`Amount: ${order.totalAmount}⭐ - Status: ${order.status}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;