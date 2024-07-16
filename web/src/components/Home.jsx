import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './Header';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import MatchSchedule from './MatchSchedule';
import Footer from './Footer';

function App() {

    document.title = "Hokejová kalkulačka"

    return (
        <Box minHeight={"100vh"} position={'relative'}>
            <Header />
            <MatchSchedule />
            <Footer />
        </Box>
    );
}

export default App;
