import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './client.css';
import { ProductProvider } from '../../components/context/ProductContext';

function ClientLayout({ children }) {
    return (
        <div id="client">
            <ProductProvider>
                <Header />
                {/* do not need container here, will be set manual */}
                <main className="">
                    {children}
                </main>
                <Footer />
            </ProductProvider>
        </div>
    );
}

export default ClientLayout;