import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import AlbumCard from './atoms/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Section({ title = "Top Albums" }) {
  const [albums, setAlbums] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed (slider view)
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        // Use different API endpoints based on section title
        const endpoint = title === "Top Albums" 
          ? 'https://qtify-backend-labs.crio.do/albums/top'
          : 'https://qtify-backend-labs.crio.do/albums/new';
        
        const response = await axios.get(endpoint);
        setAlbums(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [title]);

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      const currentIndex = swiper.activeIndex;
      // Move exactly 3/4 of a card width (120px out of 160px)
      const targetIndex = currentIndex + 0.75;
      swiper.slideTo(targetIndex, 300);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      const currentIndex = swiper.activeIndex;
      // Move exactly 3/4 of a card width backwards
      const targetIndex = currentIndex - 0.75;
      swiper.slideTo(targetIndex, 300);
    }
  };

  if (loading) {
    return (
      <Box sx={{ padding: '24px 0' }}>
        <Typography variant="h6" sx={{ color: '#fff' }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '24px 0' }}>
      {/* Header with title and Show All/Collapse button */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontSize: '24px', 
            fontWeight: '600',
            color: '#fff'
          }}
        >
          {title}
        </Typography>
        
        <Button 
          variant="text" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{ 
            color: '#34C94B',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '500',
            '&:hover': {
              backgroundColor: 'rgba(52, 201, 75, 0.1)'
            }
          }}
        >
          {isCollapsed ? 'Show All' : 'Collapse'}
        </Button>
      </Box>

      {/* Content based on collapsed/expanded state */}
      {isCollapsed ? (
        // Collapsed state: Swiper slider showing limited cards with visible navigation
        <Box sx={{ position: 'relative' }}>
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination]}
            spaceBetween={40}
            slidesPerView="auto"
            slidesPerGroup={1}
            navigation={false}
            pagination={{ clickable: true }}
            style={{ 
              padding: '0 50px',
              '--swiper-navigation-size': '40px'
            }}
            className="album-swiper"
            sx={{
              '& .swiper-slide': {
                transition: 'transform 0.3s ease',
                '&.swiper-slide-active': {
                  transform: 'scale(1.02)'
                }
              }
            }}
          >
            {albums.map((album) => (
              <SwiperSlide key={album.id} style={{ 
                width: '159px',
                marginRight: '40px'
              }}>
                <AlbumCard 
                  data={{
                    image: album.image,
                    follows: album.follows,
                    title: album.title
                  }} 
                />
              </SwiperSlide>
            ))}
            
            {/* Custom Navigation Buttons with precise control */}
            <Box
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  transform: 'translateY(-50%) scale(1.1)'
                }
              }}
            >
              ←
            </Box>
            
            <Box
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  transform: 'translateY(-50%) scale(1.1)'
                }
              }}
            >
              →
            </Box>
          </Swiper>
        </Box>
      ) : (
        // Expanded state: Grid layout showing all cards with flex wrap
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          justifyContent: 'flex-start'
        }}>
          {albums.map((album) => (
            <AlbumCard 
              key={album.id} 
              data={{
                image: album.image,
                follows: album.follows,
                title: album.title
              }} 
            />
          ))}
        </Box>
      )}
    </Box>
  );
} 