import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import SongCard from './atoms/SongCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Songs() {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch songs and genres in parallel
        const [songsResponse, genresResponse] = await Promise.all([
          axios.get('https://qtify-backend-labs.crio.do/songs'),
          axios.get('https://qtify-backend-labs.crio.do/genres')
        ]);
        
        setSongs(songsResponse.data);
        setGenres(genresResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenreChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  const filteredSongs = selectedGenre === 'All' 
    ? songs 
    : songs.filter(song => song.genre?.label === selectedGenre);

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.slidePrev();
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
      {/* Header with title */}
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
          Songs
        </Typography>
      </Box>

      {/* Genre Tabs */}
      <Box sx={{ marginBottom: '24px' }}>
        <Tabs 
          value={selectedGenre} 
          onChange={handleGenreChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              color: '#fff',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: '500',
              minWidth: 'auto',
              padding: '12px 24px',
              marginRight: '8px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&.Mui-selected': {
                backgroundColor: '#34C94B',
                color: '#fff'
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }
            },
            '& .MuiTabs-indicator': {
              display: 'none'
            }
          }}
        >
          <Tab label="All" value="All" />
          {genres.map((genre) => (
            <Tab key={genre.key} label={genre.label} value={genre.label} />
          ))}
        </Tabs>
      </Box>

      {/* Songs Carousel */}
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
          className="songs-swiper"
          sx={{
            '& .swiper-slide': {
              transition: 'transform 0.3s ease',
              '&.swiper-slide-active': {
                transform: 'scale(1.02)'
              }
            }
          }}
        >
          {filteredSongs.map((song) => (
            <SwiperSlide key={song.id} style={{ 
              width: '159px',
              marginRight: '40px'
            }}>
              <SongCard 
                data={{
                  image: song.image,
                  likes: song.likes,
                  title: song.title
                }} 
              />
            </SwiperSlide>
          ))}
          
          {/* Custom Navigation Buttons */}
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
    </Box>
  );
} 