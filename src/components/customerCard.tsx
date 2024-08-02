import React from "react";

import { Customer } from "../pages/customers/customerTypes";

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
  isSelected: boolean;
}

const CustomerCard = (props: CustomerCardProps) => {
  const { customer, onClick, isSelected } = props;
  return (
    <div
      className={`customer-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <h3>{customer.name}</h3>
      <p>{customer.title}</p>
    </div>
  );
};

export default CustomerCard;
