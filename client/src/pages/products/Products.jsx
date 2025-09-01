import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LayoutApp from '../../components/Layout';

const Products = () => {
    const [userId, setUserId] = useState(() => {
        const auth = localStorage.getItem('auth');
        return auth ? JSON.parse(auth)._id : null;
    });
    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (auth) {
            setUserId(JSON.parse(auth)._id);
        }
    }, []);

    const dispatch = useDispatch();
    const [productData, setProductData] = useState([]);
    const [popModal, setPopModal] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const getAllProducts = async (search = '') => {
        try {
            dispatch({
                type: 'SHOW_LOADING',
            });
            const { data } = await axios.get('/api/products/getproducts', {
                params: {
                    createdBy: userId,
                    search,
                },
            });
            setProductData(data);
            dispatch({
                type: 'HIDE_LOADING',
            });
        } catch (error) {
            dispatch({
                type: 'HIDE_LOADING',
            });
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    // Handle search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            getAllProducts(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handlerDelete = async record => {
        try {
            dispatch({
                type: 'SHOW_LOADING',
            });
            await axios.post('/api/products/deleteproducts', { productId: record._id });
            message.success('Product Deleted Successfully!');
            getAllProducts();
            setPopModal(false);
            dispatch({
                type: 'HIDE_LOADING',
            });
        } catch (error) {
            dispatch({
                type: 'HIDE_LOADING',
            });
            message.error('Error!');
            console.log(error);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (image, record) => <img src={image} alt={record.name} height={60} width={60} />,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: price => <span>{price}৳</span>,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            render: stock => <div>{stock < 10 ? <span style={{ color: 'red' }}>{stock}</span> : <span style={{ color: 'green' }}>{stock}</span>}</div>,
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            render: (_, record) => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            dispatch({
                                type: 'ADD_TO_CART',
                                payload: { ...record, quantity: 1 },
                            });
                            message.success('Added to cart');
                        }}
                        style={{ marginRight: '10px' }}
                    >
                        Add to Cart
                    </Button>
                    <EditOutlined
                        className="cart-edit"
                        onClick={() => {
                            setEditProduct(record);
                            setPopModal(true);
                        }}
                    />
                    <DeleteOutlined className="cart-action" onClick={() => handlerDelete(record)} />
                </div>
            ),
        },
    ];

    const handlerSubmit = async value => {
        if (!editProduct) {
            try {
                dispatch({
                    type: 'SHOW_LOADING',
                });
                await axios.post('/api/products/addproducts', { ...value, createdBy: userId });
                message.success('Product Added Successfully!');
                getAllProducts();
                setPopModal(false);
                dispatch({
                    type: 'HIDE_LOADING',
                });
            } catch (error) {
                dispatch({
                    type: 'HIDE_LOADING',
                });
                message.error('Error!');
                console.log(error);
            }
        } else {
            try {
                dispatch({
                    type: 'SHOW_LOADING',
                });
                await axios.put('/api/products/updateproducts', { ...value, productId: editProduct._id });
                message.success('Product Updated Successfully!');
                getAllProducts();
                setPopModal(false);
                dispatch({
                    type: 'HIDE_LOADING',
                });
            } catch (error) {
                dispatch({
                    type: 'HIDE_LOADING',
                });
                message.error('Error!');
                console.log(error);
            }
        }
    };

    return (
        <LayoutApp>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>All Products</h2>
                <div className="d-flex gap-3">
                    <Input
                        placeholder="Search by product name"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={{ width: '200px' }}
                        suffix={<SearchOutlined />}
                    />
                    <Button
                        className="add-new"
                        onClick={() => {
                            setEditProduct(null);
                            setPopModal(true);
                        }}
                    >
                        Add Product
                    </Button>
                </div>
            </div>

            <Table
                dataSource={productData}
                columns={columns}
                bordered
                pagination={false}
                locale={{
                    emptyText: searchQuery ? 'No matching products found' : 'No products available',
                }}
            />

            {popModal && (
                <Modal
                    title={`${editProduct !== null ? 'Edit Product' : 'Add New Product'}`}
                    visible={popModal}
                    onCancel={() => {
                        setEditProduct(null);
                        setPopModal(false);
                    }}
                    footer={false}
                >
                    <Form layout="vertical" initialValues={editProduct} onFinish={handlerSubmit}>
                        <FormItem name="name" label="Name">
                            <Input />
                        </FormItem>
                        <Form.Item name="category" label="Category">
                            <Select>
                                <Select.Option value="pizzas">Pizzas</Select.Option>
                                <Select.Option value="burgers">Burgers</Select.Option>
                                <Select.Option value="drinks">Drinks</Select.Option>
                            </Select>
                        </Form.Item>
                        <FormItem name="price" label="Price">
                            <Input />
                        </FormItem>
                        <FormItem name="stock" label="Stock">
                            <Input />
                        </FormItem>
                        <FormItem name="image" label="Image URL">
                            <Input />
                        </FormItem>
                        <div className="form-btn-add">
                            <Button htmlType="submit" className="add-new">
                                {editProduct ? 'Save' : 'Add'}
                            </Button>
                        </div>
                    </Form>
                </Modal>
            )}
        </LayoutApp>
    );
};

export default Products;
