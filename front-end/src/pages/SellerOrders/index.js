import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { DivCard, OrderCard } from '../../styled-components/SellerOrders';
import { showProduct } from '../../redux/slices/client';

function SellerOrders() {
  // const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkZ1bGFuYSBQZXJlaXJhIiwiZW1haWwiOiJmdWxhbmFAZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6InNlbGxlciIsImlhdCI6MTY2MjQwMzQ2NH0.WttPMgbR98G5LfsEpnAkUvaI_sQQB5Pw8Nbd9J95lhI';

  const NUMBER_8 = 8;
  const NUMBER_4 = 4;
  const NUMBER_2 = 2;
  const NUMBER_0 = 0;
  const NUMBER_5 = 5;

  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      const arrOrders = await axios.get('http://localhost:3001/seller/orders', {
        headers: {
          Authorization: token,
        },
      });

      setOrders(arrOrders.data);
    };

    getOrders();
  }, [token]);

  function formatDate(date) {
    const strData = `
    ${date.substr(NUMBER_8, NUMBER_2)}/
    ${date.substr(NUMBER_5, NUMBER_2)}/
    ${date.substr(NUMBER_0, NUMBER_4)}`;
    return strData;
  }

  const goToDetails = (id) => {
    const getProduct = orders.find((element) => element.id === id);

    setProduct(getProduct);

    dispatch(showProduct(product));

    navigate('/products-details');
  };

  return (
    <>
      {/* <Header /> */}
      <div>
        {
          orders.length > 0 && orders.map((element) => (
            <OrderCard
              key={ element.id }
              onClick={ () => goToDetails(element.id) }
            >
              <p datatestid={ `seller_orders__element-order-id-${element.id}` }>
                { `Pedido: ${element.sellerId}` }
              </p>

              <DivCard>
                <h3 datatestid={ `seller_orders__element-order-id-${element.id}` }>
                  {element.status}
                </h3>

                <h3 datatestid={ `seller_orders__element-order-date-${element.id}` }>
                  { formatDate(element.saleDate) }
                </h3>

                <h3 datatestid={ `seller_orders__element-card-price-${element.id}` }>
                  { `R$: ${element.totalPrice}` }
                </h3>
              </DivCard>

              <p datatestid={ `seller_orders__element-card-address-${element.id}` }>
                { `${element.deliveryAddress}, ${element.deliverynNumber}` }
              </p>
            </OrderCard>
          ))
        }
      </div>
    </>
  );
}

export default SellerOrders;
