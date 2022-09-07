import React from 'react';
import DetailsOrder from '../../Components/DetailsOrder';

import Header from '../../Components/Header/Header';
import HeaderTable from '../../Components/HeaderTableCustomer';

function CustomerOrderDetails() {
  return (
    <section>
      <Header />
      <HeaderTable />
      <DetailsOrder />
    </section>

  );
}

export default CustomerOrderDetails;
