import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import headphone from '../../assets/headphones.png';

export default function AlbumCard({ data }) {
  // Use dummy data if no data is passed
  const albumData = data || {
    image: headphone,
    follows: 100,
    title: "Sample Album"
  };

  return (
    <Card sx={{ 
      width: 160, 
      height: 232, 
      position: 'relative', 
      borderRadius: '10px', 
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      {/* Album Image - Takes up most of the card */}
      <div style={{ height: '205px', width: '100%', position: 'relative' }}>
        <img 
          src={albumData.image} 
          alt={albumData.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Follows Chip positioned at bottom of image */}
        <Chip
          label={`${albumData.follows} Follows`}
          size="small"
          sx={{
            position: 'absolute',
            bottom: '6px',
            left: '6px',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '12px',
            height: '24px',
            '& .MuiChip-label': {
              padding: '0 8px'
            }
          }}
        />
      </div>
      
      {/* Album Name - Bottom section */}
      <CardContent sx={{ 
        padding: '6px', 
        height: '27px', 
        display: 'flex', 
        alignItems: 'center',
        '&:last-child': { paddingBottom: '6px' }
      }}>
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: '14px',
            fontWeight: '500',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%'
          }}
        >
          {albumData.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
