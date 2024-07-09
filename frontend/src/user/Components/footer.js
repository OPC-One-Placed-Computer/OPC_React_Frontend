import React from 'react';
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Paragraph>&copy; 2024 One Place Computer. All rights reserved.</Paragraph>
        <SocialIconsContainer>
          <SocialIcon><a href="https://facebook.com"><FaFacebook /></a></SocialIcon>
          <SocialIcon><a href="https://twitter.com"><FaTwitter /></a></SocialIcon>
          <SocialIcon><a href="https://instagram.com"><AiFillInstagram /></a></SocialIcon>
        </SocialIconsContainer>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #0a0820;
  color: white;
  width: 100%;
  padding: 20px;
  min-height: 200px;
`
const FooterContent = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  text-align: center;
`
const Paragraph = styled.p`
  margin: 0;
  margin-bottom: 20px; 
`
const SocialIconsContainer = styled.div`
  display: flex;
  justify-content: center; 
`
const SocialIcon = styled.div`
  font-size: 1.5em;
  margin: 0 10px;

  a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #ff6600;
    }
  }

  &:first-child {
    margin-left: 0; 
  }

  &:last-child {
    margin-right: 0; 
  }
`
