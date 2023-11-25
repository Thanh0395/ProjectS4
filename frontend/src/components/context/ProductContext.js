import React, { createContext, useEffect, useReducer } from 'react';
import { productReducer } from '../Reducer';
import axios from 'axios';
const ProductContext = createContext();
const API = "http://localhost:8080/api/project4/thanh/lesson/list";
const initProductState = {
    isLoading: false,
    isError: false,
    // object array
    products: [],
    filteredProducts: [],
    filterBy: {
        category: "",
        // number array
        price: [],
        rate: 0,
    },
    currentPage: 0,
};

const ProductProvider = ({ children }) => {
    const [proState, proDispatch] = useReducer(productReducer, initProductState);
    // Setup products lay tu API
    const getProducts = async (url) => {
        proDispatch({ type: "SET_LOADING" });
        try {
            const res = await axios.get(url);
            const products = await res.data;
            proDispatch({ type: "SET_SUCCESS", payload: products });
        } catch (error) {
            proDispatch({ type: "SET_ERROR" });
        }
    };
    useEffect(() => {
        getProducts(API);
    }, []);
    // End Setup products lay tu API
    return (
        <ProductContext.Provider value={[proState, proDispatch]}>
            {children}
        </ProductContext.Provider>
    );
}


export { ProductContext, ProductProvider };