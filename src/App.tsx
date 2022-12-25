import * as React from 'react';
import { useState } from "react";
import { useQuery } from "react-query";
// components
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import Drawer from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from "@mui/material/Badge";
// for navbar
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
// styles
import './styles.css';
import { Wrapper, StyledButton } from "./App.styles";

// types
export type CartItemType = {    // data returned from API
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
}


// Function to Fetch data from API, in json format
const getProducts = async (): Promise<CartItemType[]> => {
    return await (await fetch('http://fakestoreapi.com/products')).json();
}

// Dark Mode 
let isDarkMode: boolean = true;

// Main App Function 
const App = () => {

    // Dark-Light Mode State
    const [lightDarkMode, setLightDarkMode] = useState({
        color: '#ffffff',
        backgroundColor: '#181818'
    });
    const toggleMode = () => {
        if (lightDarkMode.color === '#181818') {
            setLightDarkMode({
                color: '#ffffff',
                backgroundColor: '#181818'
            })
            isDarkMode = true;
            document.body.classList.add('darkModeBody');
            document.body.classList.remove('lightModeBody');
        }
        else {
            setLightDarkMode({
                color: '#181818',
                backgroundColor: '#ffffff'
            })
            isDarkMode = false;
            document.body.classList.add('lightModeBody');
            document.body.classList.remove('darkModeBody');
        }
    }

    // states
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);

    // destructuring values provided by useQuery Hook, giving it a type, takes 2 parameters: ('query key', function to fetch data)
    const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);

    // iterate through items in cart, use item amount property & add in the total amount
    const getTotalItems = (items: CartItemType[]) => {
        return items.reduce((total: number, item) => total + item.amount, 0);       // initial total value = 0 
    };

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {                  // using setter = gives access to previous state
            const isItemInCart = prev.find(item => item.id === clickedItem.id);     // if item is already in cart
            if (isItemInCart) {                 // update amount is already exists
                return prev.map(item => (       // loop through items, find clickedItem and increment amount by 1
                    item.id === clickedItem.id
                        ? { ...item, amount: item.amount + 1 }
                        : item
                ))
            }
            // if an item is not already in cart, return array with all previous stuff in cart, then add new item in array, & set its amount to 1
            return [...prev, { ...clickedItem, amount: 1 }];
        })
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev => (
            prev.reduce((total, item) => {          // reduce function on previous state
                if (item.id === id) {
                    if (item.amount === 1) {        // if clickedItem amount is 1, we remove it from array 
                        return total;
                    }
                    return [...total, { ...item, amount: item.amount - 1 }];    // else we remove 1 from amount
                }
                else {                               // if not on clickedItem, we return item simply
                    return [...total, item];
                }
            }, [] as CartItemType[])                // total starts with empty array          
        ))
    };

    if (isLoading) return <LinearProgress />;

    if (error) return <div>Something went wrong</div>;

    return (
        <>
            {/* Navbar */}
            <AppBar position="sticky" sx={lightDarkMode} className='navbar' >
                <Container maxWidth="xl">
                    <Toolbar>
                        {/* Title */}
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{ mr: 2, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}
                        >
                            ShopItAll
                        </Typography>
                        {/* Dark-Light Mode Icon */}
                        <Box sx={{ flexGrow: 0.05 }}>
                            <IconButton onClick={() => toggleMode()}>
                                {isDarkMode
                                    ? <LightModeIcon sx={{ color: '#ffffff' }} />
                                    : <DarkModeIcon sx={{ color: '#181818' }} />
                                }
                            </IconButton>
                        </Box>

                        <Box sx={{ flexGrow: 0.05 }}>
                            {/* Bottom Drawer */}
                            <Drawer anchor="bottom" open={cartOpen} onClose={() => setCartOpen(false)}>
                                <Cart className={isDarkMode ? 'darkDrawer' : 'lightDrawer'}
                                    cartItems={cartItems}
                                    addToCart={handleAddToCart}
                                    removeFromCart={handleRemoveFromCart}
                                />
                            </Drawer>
                            {/* Cart Icon */}
                            <StyledButton onClick={() => setCartOpen(true)}>
                                <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                                    {isDarkMode
                                        ? <AddShoppingCartIcon sx={{ color: '#ffffff' }} />
                                        : <AddShoppingCartIcon sx={{ color: '#181818', position: 'sticky' }} />
                                    }
                                </Badge>
                            </StyledButton>

                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>

            {/* Main Grid */}
            <Wrapper className={isDarkMode ? 'darkModeGrid' : 'lightModeGrid'} >

                <Grid sx={{ display: 'flex', justifyContent: 'center' }} container spacing={4}>
                    {data?.map(item => (
                        <Grid item key={item.id} xs={12} sm={4} md={3} >
                            <Item className={isDarkMode ? 'darkGridItem' : 'lightGridItem'} item={item} handleAddToCart={handleAddToCart} />
                        </Grid>
                    ))}
                </Grid>

            </Wrapper>
            {/* Footer */}
            <div className={isDarkMode ? 'darkFooter' : 'lightFooter'}>
                <Typography variant='subtitle1' align='center'>
                    ©shopitall
                </Typography>
            </div>

        </>
    );
}

export default App;