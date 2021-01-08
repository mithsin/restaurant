import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, NotExist, PhotoGallery } from 'Pages';
import { Admin, AdminLogin } from 'AdminPages';
import { Cart, Payment, OrderReceipt } from 'Components/OrderProcess';
import PrivateRoute from './PrivateRoute';


const PageRouter = () => {
  return (
    <Switch>
        <Route exact path="/" component = { Home } />
        <Route exact path="/photo-gallery" component = { PhotoGallery } />
        <Route exact path="/cart" component = { Cart } />
        <Route exact path="/payment" component = { Payment } />
        <Route exact path="/order-receipt" component = { OrderReceipt } />
        <Route exact path="/ichot/admin-login" component = { AdminLogin } />
        {/* <Route exact path="/admin" component = { Admin } /> */}
        <PrivateRoute exact path="/admin" component = { Admin } />
        <Route path='*' component={NotExist} />
    </Switch>
  );
}

export default PageRouter;
