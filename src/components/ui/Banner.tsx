import styled from 'styled-components';

export const Banner = () => {
   return (
      <BannerContainer>
         <BannerImage src='banner.jpg' alt='Banner' />
      </BannerContainer>
   );
};

// Styles
const BannerContainer = styled.div`
   width: 100%;
   overflow: hidden;
   position: relative;
`;

const BannerImage = styled.img`
   width: 100%;
   /* max-height: 600px; */
   object-fit: cover;
`;
