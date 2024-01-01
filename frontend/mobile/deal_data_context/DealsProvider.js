import React, { useState, useEffect } from 'react';
import DealsContext from './DealsContext';
import useFetch from '../hook/useFetch';

const DealsProvider = ({ children }) => {
    const {data, isLoading, error } = useFetch();

    return (
        <DealsContext.Provider value={{ data, isLoading, error }}>
            {children}
        </DealsContext.Provider>
    );
}

export default DealsProvider;