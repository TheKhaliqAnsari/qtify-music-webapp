import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';

export default function AlbumCard({ data }) {
  const { image, follows, title } = data;

  return (
    <Card 
      sx={{
        width: '159px',
        height: '205px',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        position: 'relative'
      }}
    >
      {/* Image container with exact dimensions */}
      <div style={{
        position: 'relative',
        width: '159px',
        height: '163px', // 205px - 42px for banner
        overflow: 'hidden'
      }}>
        <img 
          src={image} 
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Follows chip positioned at bottom-left of image */}
        <Chip 
          label={`${follows} Follows`}
          size="small"
          sx={{
            position: 'absolute',
            bottom: '6px',
            left: '6px',
            backgroundColor: '#000',
            color: '#fff',
            fontSize: '12px',
            height: '24px',
            '& .MuiChip-label': {
              padding: '0 8px'
            }
          }}
        />
      </div>

      {/* Album title */}
      <CardContent sx={{
        padding: '6px',
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}>
        <Typography 
          variant="body2" 
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#000',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%'
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
