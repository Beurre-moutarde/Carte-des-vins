import React from 'react';
import { Typography, Button, Image } from 'antd';

const { Title, Paragraph } = Typography;

export default function Home() {
    return (
        <div style={{ textAlign: 'center' }}>
            <Title>Welcome WineFinder</Title>
            <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis,
                lectus vel blandit ultricies, augue magna fermentum arcu, eget tristique
                diam justo eu lectus.
            </Paragraph>
            <Button type="primary">Explore Wines</Button>
            <Image
                src="https://picsum.photos/800/400"
                alt="Wine bottles"
                style={{ marginTop: '2rem' }}
            />
        </div>
    );
}