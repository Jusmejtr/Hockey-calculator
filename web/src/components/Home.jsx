import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './Header';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import MatchSchedule from './MatchSchedule';
import Footer from './Footer';

function App() {

    document.title= "Hokejová kalkulačka"

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        message: '',
        isError: false
    });


    useEffect(() => {
        const fetchMatches = () => {
            axios.get('/all-matches')
                .then((res) => {
                    if (res.status === 200) {
                        setMatches(res.data);
                        setLoading(false);
                    } else {
                        setError(prevState => ({
                            ...prevState,
                            isError: true,
                            message: `Failed to fetch matches: ${res.statusText}`
                        }))
                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                    setError(prevState => ({
                        ...prevState,
                        isError: true,
                        message: 'An error occurred while fetching data.'
                    }));
                });
        };

        fetchMatches();
    }, []);

    return (
        <Box minHeight={"100vh"} position={'relative'}>
            <Header />
            {loading ? (
                <Center>
                    <Spinner size={'lg'} />
                </Center>
            ) : error.isError ? (
                <Center>
                    <Text>{error.message}</Text>
                </Center>
            ) : (
                <MatchSchedule data={matches} />
            )}
            <Footer/>
        </Box>
    );
}

export default App;
