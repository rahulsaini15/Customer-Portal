import React from 'react';

import CustomerCard from '../../../components/customerCard';
import { Customer } from '../customerTypes';

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomer: Customer | null;
}

const CustomerList = (props: CustomerListProps) => {
    const { customers, onSelectCustomer, selectedCustomer } = props;
  return (
    <div className="customer-list">
      {customers.map(customer => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          onClick={() => onSelectCustomer(customer)}
          isSelected={selectedCustomer?.id === customer.id}
        />
      ))}
    </div>
  );
};

export default CustomerList;
