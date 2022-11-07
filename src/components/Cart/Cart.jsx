import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import CardItem from "./CartItem/CartItem";

const Cart = ({ cart, handleEmptyCart, handleUpdateCartQty,  handleRemoveFromCart }) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            Your shopping cart is empty,
            <Link to='/' className={classes.link}>Start adding some items!</Link>
        </Typography>
    );

    if(!cart.line_items) return "Loading";

    const FilledCart = () => (
        <div>
            <Grid container spacing={3}>
                {cart.line_items.map((item) =>(
                    <Grid item xs={12} sm={6} m={4} lg={3} key={item.id}>
                        <CardItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))};
            </Grid>
            <div className={classes.cardDetails}>
                 <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                 </Typography>
                 <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>
                        Empty Cart
                    </Button>
                    <Button component={Link} to="/checkout" className={classes.checoutButton} size="large" type="button" variant="contained" color="primary">
                        Checkout
                    </Button>
                 </div>
            </div>
        </div>
    );

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart