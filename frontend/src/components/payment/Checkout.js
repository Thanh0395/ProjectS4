import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import PaypalCheckoutButton from './PaypalCheckoutButton';
import bundle1 from './gem-bundle-1.png';
import bundle2 from './gem-bundle-2.png';
import bundle3 from './gem-bundle-3.png';

function Checkout(props) {
    const bundles = [
        {
            id: 0,
            price: 1,
            gem: 50,
            description: 'Description of Starter bundle.',
        },
        {
            id: 1,
            price: 4.12,
            gem: 400,
            description: 'Description of Middle bundle.',
        },
        {
            id: 2,
            price: 15.33,
            gem: 2000,
            description: 'Description of Senior bundle.',
        },
    ];
    const [selectedBundle, setSelectedBundle] = useState(bundles[1]);

    const handleBundleClick = (id) => {
        const selected = bundles.find(bundle => bundle.id === id);
        setSelectedBundle(selected);
    };

    return (
        <>
            <Row>
                {/* Card 1 */}
                <Col xs={12} md={4}>
                    <Card
                        className={`gembundle-card ${selectedBundle.id === 0 ? 'active' : ''}`}
                        onClick={() => handleBundleClick(0)}
                    >
                        <Card.Img
                            className="gembundle-card-img"
                            variant="top"
                            src={bundle1}
                            alt="Starter Bundle"
                        />
                        <Card.Body>
                            <Card.Title className='gembundle-title'>Starter <i className="bi bi-gem px-2 text-primary"></i>{bundles[0].gem}</Card.Title>
                            <Card.Text>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Card 2 */}
                <Col xs={12} md={4}>
                    <Card
                        className={`gembundle-card ${selectedBundle.id === 1 ? 'active' : ''}`}
                        onClick={() => handleBundleClick(1)}
                    >
                        <Card.Img
                            className="gembundle-card-img"
                            variant="top"
                            src={bundle2}
                            alt="Middle Bundle"
                        />
                        <Card.Body>
                            <Card.Title className='gembundle-title'>Middle <i className="bi bi-gem px-2 text-primary"></i>{bundles[1].gem}</Card.Title>
                            <Card.Text>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Card 3 */}
                <Col xs={12} md={4}>
                    <Card
                        className={`gembundle-card ${selectedBundle.id === 2 ? 'active' : ''}`}
                        onClick={() => handleBundleClick(2)}
                    >
                        <Card.Img
                            className="gembundle-card-img"
                            variant="top"
                            src={bundle3}
                            alt="Senior Bundle"
                        />
                        <Card.Body>
                            <Card.Title className='gembundle-title'>Senior  <i className="bi bi-gem px-2 text-primary"></i>{bundles[2].gem}</Card.Title>
                            <Card.Text>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <center>
                    <PaypalCheckoutButton bundle = {selectedBundle} />
                </center>
            </Row>
        </>
    );
}

export default Checkout;
