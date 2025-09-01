import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function SmartInventoryHome() {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <Title>StockIQ</Title>
          <Subtitle>Track, Manage, and Optimize your stock with ease.</Subtitle>
          <CTAButton onClick={() => navigate("/login")}>Get Started</CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureIcon>📦</FeatureIcon>
          <FeatureTitle>Real-Time Tracking</FeatureTitle>
          <FeatureDesc>
            Stay updated with live stock insights and reduce manual errors.
          </FeatureDesc>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>📊</FeatureIcon>
          <FeatureTitle>Analytics Dashboard</FeatureTitle>
          <FeatureDesc>
            Visualize sales, purchases, and trends with powerful analytics.
          </FeatureDesc>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>⚡</FeatureIcon>
          <FeatureTitle>Smart Alerts</FeatureTitle>
          <FeatureDesc>
            Get notified instantly when stock levels run low or hit demand
            peaks.
          </FeatureDesc>
        </FeatureCard>
      </FeaturesSection>
    </PageContainer>
  );
}

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

// Styled Components
const PageContainer = styled.div`
  font-family: "Poppins", sans-serif;
  color: #1f2937;
  height: 100vh; /* Full screen height */
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  color: #fff;
  padding: 2rem;
  text-align: center;
  flex: 1; /* Take available space */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroContent = styled.div`
  max-width: 700px;
  margin: auto;
  animation: ${fadeInUp} 0.8s ease;
`;

const Title = styled.h1`
  font-size: 2.2rem; /* Reduced */
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.4;
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  padding: 1rem;
  max-width: 900px;
  margin: auto;
  flex: 1; /* Shares space with Hero */
`;

const FeatureCard = styled.div`
  background: #fff;
  padding: 1.2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  animation: ${scaleIn} 0.6s ease;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
  border: none;
  color: white;
  padding: 0.9rem 2rem;
  border-radius: 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #fbbf24, #f59e0b);
    transform: translateY(-3px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const FeatureDesc = styled.p`
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.5;
`;
