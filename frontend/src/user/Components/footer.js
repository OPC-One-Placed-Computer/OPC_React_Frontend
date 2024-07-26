import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Column>
          <Title>One Place Computer</Title>
          <Text>Your one-stop shop for computers and laptops. We provide the best technology solutions to meet your needs.</Text>
        </Column>
        <Column>
          <Title>Company</Title>
          <Link href="#">About Us</Link>
          <Link href="#">Services</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Contact Us</Link>
        </Column>
        <Column>
          <Title>Support</Title>
          <Link href="#">Support</Link>
          <Link href="#">Knowledge Base</Link>
          <Link href="#">Live Chat</Link>
        </Column>
        <Column>
          <Title>Careers</Title>
          <Link href="#">Jobs</Link>
          <Link href="#">Our Team</Link>
          <Link href="#">Leadership</Link>
          <Link href="#">Privacy Policy</Link>
        </Column>
        <Column>
          <Title>Products</Title>
          <Link href="#">Laptops</Link>
          <Link href="#">Desktops</Link>
          <Link href="#">Accessories</Link>
        </Column>
      </FooterContent>
      <SocialIconsContainer>
        <SocialIcon><a href="https://facebook.com"><FaFacebook /></a></SocialIcon>
        <SocialIcon><a href="https://twitter.com"><FaTwitter /></a></SocialIcon>
        <SocialIcon><a href="https://instagram.com"><FaInstagram /></a></SocialIcon>
        <SocialIcon><a href="https://linkedin.com"><FaLinkedin /></a></SocialIcon>
      </SocialIconsContainer>
      <FooterBottom>
        <BottomText>&copy; 2024 One Place Computer. All rights reserved.</BottomText>
        <BottomLinks>
          <Link href="#">Terms & Conditions</Link>
          <Link href="#">Privacy Policy</Link>
        </BottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  width: 100%;
  padding: 60px 20px;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1200px;
  text-align: left;
`;

const Column = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 20px 0;
`;

const Title = styled.h4`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 1.2em;
  color: #ff6600;
`;

const Text = styled.p`
  margin: 0;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const Link = styled.a`
  display: block;
  color: #fff;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6600;
  }
`;

const SocialIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

const SocialIcon = styled.div`
  font-size: 1.5em;
  margin: 0 15px;

  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #ff6600;
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  border-top: 1px solid #444;
  padding-top: 20px;
`;

const BottomText = styled.p`
  margin: 0;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;
