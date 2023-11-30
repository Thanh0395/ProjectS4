import React, { useState } from 'react';
import { Alert, Badge } from 'react-bootstrap';
import { PayPalButtons } from "@paypal/react-paypal-js";

function PaypalCheckoutButton(props) {
    const bundle = props.bundle;
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState();
    const [alertMsg, setAlertMsg] = useState();
    const handleApprove = (orderId) => {
        //You can call to backend to receive order, but my project no need order

        //response success
        setShowAlert(true);
        setVariant('success');
        setAlertMsg('Payment has been Successful');
        //refresh user

        //Response error
    }

    return (
        <div>
            <p className='popup-price' >
                <Badge bg='warning' text='light' >
                    $ {bundle.price}
                </Badge>
            </p>
            {showAlert ?
                <Alert variant={variant} dismissible>{alertMsg}</Alert>
                : <></>
            }
            <p>
                {/* <button className='payment-method'>Paypal Payment</button> */}
                <PayPalButtons
                    style={{
                        layout: 'vertical',
                        color: 'blue',
                        shape: 'pill',
                        label: 'paypal'
                    }}
                    onClick={(data, actions) => {
                        const HasAlreadyBoughtCourse = false;
                        if (HasAlreadyBoughtCourse) {
                            setShowAlert(true);
                            setVariant('danger');
                            setAlertMsg('Has Already Bought Course');
                            return actions.reject();
                        } else {
                            return actions.resolve();
                        }
                    }}
                    createOrder={(data, action) => {
                        return action.order.create({
                            purchase_units: [
                                {
                                    description: bundle.description,
                                    amount: {
                                        value: bundle.price
                                    }
                                }
                            ]
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const order = await actions.order.capture();
                        console.log("order", order);
                        handleApprove(data.orderID);
                    }}
                    onCancel={() => {
                        setShowAlert(true);
                        setVariant('warning');
                        setAlertMsg('Paypal checkout CANCEL');
                    }}
                    onError={(err) => {
                        console.error("Paypal checkout ERROR", err);
                        setShowAlert(true);
                        setVariant('danger');
                        setAlertMsg('Paypal checkout ERROR: ', err);
                    }}
                >
                </PayPalButtons>
            </p>
        </div>
    );
}

export default PaypalCheckoutButton;