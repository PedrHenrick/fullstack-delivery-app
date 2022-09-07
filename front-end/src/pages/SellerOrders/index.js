import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { DivCard, OrderCard } from '../../styled-components/SellerOrders';
import { showProduct } from '../../redux/slices/client';
import Header from '../../Components/Header/Header';
import { requestGetWithToken } from '../../utils/requests';

function SellerOrders() {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const NUMBER_8 = 8;
  const NUMBER_4 = 4;
  const NUMBER_2 = 2;
  const NUMBER_0 = 0;
  const NUMBER_5 = 5;

  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      const data = await requestGetWithToken('/seller/orders', token);
      setOrders(data);
    };

    getOrders();
  }, [token]);

  function formatDate(date) {
    const strData = `${date.substr(NUMBER_8, NUMBER_2)}/${
      date.substr(NUMBER_5, NUMBER_2)}/${
      date.substr(NUMBER_0, NUMBER_4)}`;
    return strData;
  }

  const goToDetails = (id) => {
    const getProduct = orders.find((element) => element.id === id);

    setProduct(getProduct);

    dispatch(showProduct(product));

    navigate(`/seller/orders/${id}`);
  };

  return (
    <>
      <Header />
      <div>
        {
          orders?.map((element) => (
            <OrderCard
              key={ element.id }
              onClick={ () => goToDetails(element.id) }
            >
              <span data-testid={ `seller_orders__element-order-id-${element.id}` }>
                <p>{ `Pedido: ${element.id}` }</p>
              </span>

              <DivCard>
                <h3 datatestid={ `seller_orders__element-delivery-status-${element.id}` }>
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
