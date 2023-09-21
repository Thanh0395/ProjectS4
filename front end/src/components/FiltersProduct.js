import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from './context/ProductContext';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { Box, Slider } from '@mui/material';

function FiltersProduct(props) {
    const [proState, proDispatch] = useContext(ProductContext);
    // Category
    const handleCategoryChange = (category) => {
        proDispatch({ type: 'SET_CATEGORY', payload: category });
    };
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    // Price
    // const handlePriceChange = (min, max) => {
    //     proDispatch({ type: 'SET_PRICE', payload: { min, max } });
    // };
    // const [priceRange, setPriceRange] = useState([0, 1000]);

    const handlePriceChange = (event, newValue) => {
        proDispatch({ type: 'SET_PRICE', payload: newValue });
    };

    return (
        <>
            <Nav className='mb-2' >
                <Nav.Link
                    onClick={() => handleCategoryChange("")}
                    className={`cate-filter ${proState.filterBy.category === "" ? "active" : ""}`}
                >All
                </Nav.Link>
                {categories.map((item, index) => (
                    <Nav.Link as={Link} key={index}
                        onClick={() => handleCategoryChange(item)}
                        className={`cate-filter ${proState.filterBy.category === item ? "active" : ""}`}
                    >{item}
                    </Nav.Link>
                )
                )}
            </Nav>

            <label>
                <span>Price:</span>
                <Box sx={{ width: 300 }}>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        size="small"
                        max={1000}
                        defaultValue={[0, 1000]}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                    />
                </Box>
                {/* <input
                    type="number"
                    placeholder="Min"
                    value={proState.filterBy.price.min}
                    onChange={(e) =>
                        handlePriceChange(e.target.value, proState.filterBy.price.max)
                    }
                />
                <input
                    type="number"
                    placeholder="Max"
                    value={proState.filterBy.price.max}
                    onChange={(e) =>
                        handlePriceChange(proState.filterBy.price.min, e.target.value)
                    }
                /> */}
            </label>
        </>
    );
}

export default FiltersProduct;