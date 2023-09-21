import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from './context/ProductContext';
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Rating } from '@mui/material';

function ProductListClient(props) {
    const itemsPerPage = 8;
    const navigate = useNavigate()
    const handleGetPageDetail = (item) => {
        navigate(`/products/detail/${item.id}`, { state: { product: item } })
    };

    const [proState, proDispatch] = useContext(ProductContext); //Get all states, eg(proState.filteredProducts, proState.products,...)
    const handleCurrentPage = (page) => {
        proDispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    };
    // offset là item dc chia trong 1 page
    const [itemOffset, setItemOffset] = useState(0);
    useEffect(() => {
        setItemOffset(0);
    }, [proState.filteredProducts]);
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = proState.filteredProducts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(proState.filteredProducts.length / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % proState.filteredProducts.length;
        setItemOffset(newOffset);
        handleCurrentPage(event.selected);
    };

    return (
        <>
            {proState.isLoading ? (
                <>
                    <Spinner animation="border" variant="primary" /> <span>Loading...</span>
                </>
            ) : (
                <>
                    <ReactPaginate
                        previousLabel="<"
                        nextLabel=">"
                        breakLabel="..."
                        onPageChange={handlePageClick}
                        pageCount={pageCount}
                        renderOnZeroPageCount={null}
                        forcePage={proState.currentPage}

                        containerClassName="pagination justify-content-center"
                        activeClassName="active"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                    />
                    <Row>
                        {currentItems.length === 0 ? (
                            <div className="text-center">No data to show</div>
                        ) : (
                            currentItems.map((product) => (
                                <Col key={product.id} xs={12} sm={6} md={4} lg={3} className='mb-3'>
                                    <Card className="mb-3" style={{ height: '400px' }}>
                                        <div style={{ height: '200px', overflow: 'hidden' }}>
                                            <Card.Img
                                                src={product.image}
                                                alt={product.title}
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <Card.Body className="d-flex flex-column justify-content-between">
                                            <Card.Title className="text-truncate">{product.title}</Card.Title>
                                            <Card.Subtitle>Price: {product.price}</Card.Subtitle>
                                            <Card.Subtitle>
                                                <Rating name="half-rating-read" defaultValue={product.rating.rate} precision={0.1} readOnly />
                                            </Card.Subtitle>
                                            <Card.Text className="text-truncate">
                                                {product.description}
                                            </Card.Text>
                                            <Button onClick={() => handleGetPageDetail(product)}>View Details</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>
                </>
            )}
        </>
    );
}

export default ProductListClient;