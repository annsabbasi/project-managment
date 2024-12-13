import { Grid, CardMedia } from '@mui/material';
import Image1 from '../../../assets/demoImage/1.jpg';
import Image2 from '../../../assets/demoImage/2.jpg';
import Image3 from '../../../assets/demoImage/3.jpg';
import Image4 from '../../../assets/demoImage/4.jpg';
import Image5 from '../../../assets/demoImage/5.jpg';

const images = [
    {
        id: 1,
        src: Image1,
        aspect: 'square',
    },
    {
        id: 2,
        src: Image2,
        aspect: 'rectangle',
    },
    {
        id: 3,
        src: Image3,
        aspect: 'square',
    },
    {
        id: 4,
        src: Image4,
        aspect: 'rectangle',
    },
    {
        id: 5,
        src: Image5,
        aspect: 'square',
    },
    {
        id: 1,
        src: Image1,
        aspect: 'square',
    },
    {
        id: 2,
        src: Image2,
        aspect: 'rectangle',
    },
    {
        id: 3,
        src: Image3,
        aspect: 'square',
    },
    {
        id: 4,
        src: Image4,
        aspect: 'rectangle',
    },
    {
        id: 5,
        src: Image5,
        aspect: 'square',
    },
];

const TaskImages = () => {
    return (
        <Grid container spacing={2}>
            
            {images.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                    <CardMedia
                        component="img"
                        image={image.src}
                        alt={`Gallery image ${image.id}`}
                        sx={{
                            height: image.aspect === 'square' ? '250px' : '300px',
                            objectFit: 'cover',
                            margin: 0,
                            width: '100%',
                        }} />
                </Grid>
            ))}

        </Grid>
    );
};

export default TaskImages;
