import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import './PrintScreen.css';

function PrintScreen({ setOpen, results }) {

    /* Functions */
    const now = new Date().toISOString();

    useEffect(() => {
        window.print();
    });

    return (
        <div className='print__screen'>
            <Helmet><title>Print Screen</title></Helmet>
            <button onClick={() => setOpen(false)}>Return Back</button>
            <h2>Estimated Cost</h2>
            <p>{`${now.substring(0,10)} ${now.substring(11,19)}`}</p>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        {
                            Object.keys(results[0]).map((header, index) => (
                                <th key={index}>{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        results.map((result, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                {
                                    Object.values(result).map((value) => (
                                        <td>{value}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default PrintScreen;