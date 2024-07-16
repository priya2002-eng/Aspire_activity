// src/SimpleForm.js
import React, { useState } from 'react';

const SimpleForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
        // Reset form fields
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.header}>Contact Us</h2>
            <label style={styles.label}>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
            </label>
            <label style={styles.label}>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
            </label>
            <label style={styles.label}>
                Message:
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={styles.textarea}
                />
            </label>
            <button type="submit" style={styles.button}>Submit</button>
        </form>
    );
};

const styles = {
    form: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9'
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        marginBottom: '10px'
    },
    input: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        height: '100px'
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    }
};

export default SimpleForm;
