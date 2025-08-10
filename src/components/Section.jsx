import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import AlbumCard from './atoms/Card';

export default function Section({ title = "Top Albums" }) {
  const [albums, setAlbums] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('https://qtify-backend-labs.crio.do/albums/top');
        setAlbums(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) {
    return (
      <Box sx={{ padding: '24px 0' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '24px 24px' }}>
      {/* Header with title and collapse button */}
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

      {/* Grid of Album Cards */}
      {!isCollapsed && (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '24px',
          justifyContent: 'center'
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