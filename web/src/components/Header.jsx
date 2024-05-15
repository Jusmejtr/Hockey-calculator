import React from 'react'
import ToggleColorMode from './ToggleColorMode';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleButton = () => {
        if (location.pathname === '/') {
            navigate("/play-off");
        } else {
            navigate("/");
        }
    }
    const handleLogo = () => {
        navigate("/");
    }
    const handleFeedback = () => {
        window.open("https://forms.gle/wTf5hgG6nnvBkPhG6", "_blank");
    }
    return (
        <Stack justify={'space-around'} bgColor={'#2254dd'} padding={3} direction={{ base: 'column', md: 'row' }} textAlign={{ base: 'center' }}>
            <Text as={'h1'} fontSize={'xx-large'} onClick={handleLogo} cursor={'pointer'} color={'white'} fontFamily={'sans-serif'}>Hokejová kalkulačka</Text>
            <Box>
                <Button colorScheme='orange' size={{base: 'sm', md: 'md'}} mr={5} onClick={handleButton}>
                    {location.pathname === '/' ? 'Play-off pavúk' : 'Základná časť'}
                </Button>                <ToggleColorMode />
                <Button colorScheme='green' size={{base: 'sm', md: 'md'}} ml={5} onClick={handleFeedback}>Spätná väzba</Button>
            </Box>
        </Stack>
    )
}

export default Header;