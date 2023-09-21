// productReducer.js
const filtered = (products, filterBy) => {
    let filtered = [...products];
    if (filterBy.category !== "") {
        filtered = filtered.filter((pro) => pro.category === filterBy.category);
    }
    if (filterBy.price && filterBy.price.length === 2) {
        filtered = filtered.filter(product => {
            const productPrice = product.price;
            return productPrice >= filterBy.price[0] && productPrice <= filterBy.price[1];
        });
    }
    return filtered;
}
export const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            const filteredCategory = filtered(state.products, {
                category: action.payload,
                price: state.filterBy.price,
                rate: state.filterBy.rate
            });
            return {
                ...state,
                filterBy: { ...state.filterBy, category: action.payload },
                currentPage: 0,
                filteredProducts: filteredCategory,
            };
        case 'SET_PRICE':
            const filteredPrice = filtered(state.products, {
                category: state.filterBy.category,
                price: action.payload,
                rate: state.filterBy.rate
            });
            return {
                ...state,
                filterBy: { ...state.filterBy, price: action.payload },
                currentPage: 0,
                filteredProducts: filteredPrice,
            };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'SET_RATE':
            return { ...state, filterBy: { ...state.filterBy, rate: action.payload } };
        case 'SET_LOADING':
            return { ...state, isLoading: true, };
        case 'SET_SUCCESS':
            return { ...state, isLoading: false, products: action.payload, filteredProducts: action.payload };
        case 'SET_ERROR':
            return { ...state, isLoading: false, isError: true };
        // case 'CLEAR_FILTERS':
        //     // Filter the products based on filter criteria (example assumes filtering by category)
        //     const filteredProducts = state.products.filter(product =>
        //         product.category === state.filterBy.category
        //     );
        //     return { ...state, filteredProducts };
        default:
            return state;
    }
};