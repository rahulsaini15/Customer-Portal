import React, { useState, useEffect } from 'react';

import '../../assets/css/customerDetails.css'
import CustomerDetails from './views/customerDetails';
import CustomerList from './views/customerList';
import { Customer } from './customerTypes';

const Home = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // Mock customer data
    const mockCustomers: Customer[] = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `Customer ${i + 1}`,
      title: `Title ${i + 1}`,
      address: `Address ${i + 1}`
    }));
    setCustomers(mockCustomers);
    setSelectedCustomer(mockCustomers[0]); // Select the first customer by default
  }, []);

  return (
    <div className="app-container">
      <CustomerList customers={customers} onSelectCustomer={setSelectedCustomer} selectedCustomer={selectedCustomer} />
      {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
    </div>
  );
};

export default Home;
