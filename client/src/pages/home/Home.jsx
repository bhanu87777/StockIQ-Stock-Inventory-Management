import { Col, Empty, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import LayoutApp from "../../components/Layout";
import Product from "../../components/Product";

import allCategories from "../../asset/images/all-cat.png";

const Home = () => {
  const [userId, setUserId] = useState(() => {
    const auth = localStorage.getItem("auth");
    return auth ? JSON.parse(auth)._id : null;
  });

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      setUserId(JSON.parse(auth)._id);
    }
  }, []);

  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    {
      name: "all",
      imageUrl: allCategories,
    },
    {
      name: "pizzas",
      imageUrl:
        "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/27954/pizza-pepperoni-clipart-xl.png",
    },
    {
      name: "burgers",
      imageUrl:
        "https://cdn.pixabay.com/photo/2022/01/04/23/00/fast-food-6916101_960_720.png",
    },
    {
      name: "drinks",
      imageUrl:
        "https://images.vexels.com/media/users/3/246333/isolated/preview/9626dce3278f72220ea2736de64e6233-pink-cocktail-color-stroke.png",
    },
  ];

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch({ type: "SHOW_LOADING" });
        const { data } = await axios.get(
          `/api/products/getproducts?createdBy=${userId}`
        );
        setProductData(data);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) getAllProducts();
  }, [dispatch, userId]);

  return (
    <LayoutApp>
      <HomeContainer>
        <Header>
          <h2>🍴 Smart Inventory POS</h2>
          <p>Manage products, categories & sales with ease</p>
        </Header>

        {productData.length === 0 ? (
          <EmptyContainer>
            <h3>No Product Found</h3>
            <Empty />
          </EmptyContainer>
        ) : (
          <>
            <CategoryContainer>
              {categories.map((category) => (
                <CategoryCard
                  key={category.name}
                  active={selectedCategory === category.name}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    height={50}
                    width={50}
                  />
                  <span>{category.name}</span>
                </CategoryCard>
              ))}
            </CategoryContainer>

            <Row gutter={[16, 16]}>
              {selectedCategory === "all" ? (
                productData.map((product) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                    <Product product={product} />
                  </Col>
                ))
              ) : productData.filter((i) => i.category === selectedCategory)
                  .length > 0 ? (
                productData
                  .filter((i) => i.category === selectedCategory)
                  .map((product) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                      <Product product={product} />
                    </Col>
                  ))
              ) : (
                <Col span={24}>
                  <Empty description={<span>No Product Found</span>} />
                </Col>
              )}
            </Row>
          </>
        )}
      </HomeContainer>
    </LayoutApp>
  );
};

export default Home;

// ---------------- Styled Components ---------------- //

const HomeContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f3f4f6, #e0f2fe);
  border-radius: 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
  }

  p {
    color: #6b7280;
    margin-top: 0.3rem;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const CategoryCard = styled.div`
  background: ${(props) => (props.active ? "#3b82f6" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#1f2937")};
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  box-shadow: ${(props) =>
    props.active
      ? "0 6px 15px rgba(59, 130, 246, 0.4)"
      : "0 4px 10px rgba(0, 0, 0, 0.1)"};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  display: flex;
  align-items: center;
  gap: 0.6rem;

  span {
    font-weight: 600;
    font-size: 1rem;
    text-transform: capitalize;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const EmptyContainer = styled.div`
  text-align: center;
  margin-top: 4rem;

  h3 {
    margin-bottom: 1rem;
    color: #374151;
  }
`;
