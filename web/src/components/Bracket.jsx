import React, { useEffect, useState } from 'react'
import Header from './Header'
import { SingleEliminationBracket, Match, createTheme } from '@g-loot/react-tournament-brackets';
import { Box, Center, HStack, Spinner, Text, useColorMode } from '@chakra-ui/react';
import Footer from './Footer';
import axios from 'axios';


function Bracket() {

    document.title = "Hokejová kalkulačka - Play off"

    const whiteTheme = createTheme({
        textColor: { main: '#0000', highlighted: '#07090D', dark: '#3E414D' },
        matchBackground: { wonColor: '#79f779', lostColor: '#fa9393' },
        score: {
            background: { wonColor: '#69d869', lostColor: '#f16a6a' },
            text: { highlightedWonColor: '#ffffff', highlightedLostColor: '#ffffff' },
        },
        border: {
            color: '#d3d5ee',
            highlightedColor: '#4a3adb',
        },
        roundHeader: { backgroundColor: '#da96c6', fontColor: '#000' },
        connectorColor: '#CED1F2',
        connectorColorHighlight: '#da96c6',
        svgBackground: '#FAFAFA',
    });

    const darkTheme = createTheme({
        textColor: { main: '#000000', highlighted: '#0f54df', dark: '#83732a' },
        matchBackground: { wonColor: '#daebf9', lostColor: '#96c6da' },
        score: {
            background: { wonColor: '#87b2c4', lostColor: '#87b2c4' },
            text: { highlightedWonColor: '#7BF59D', highlightedLostColor: '#FB7E94' },
        },
        border: {
            color: '#CED1F2',
            highlightedColor: '#da96c6',
        },
        roundHeader: { backgroundColor: '#da96c6', fontColor: '#000' },
        connectorColor: '#cff2ce',
        connectorColorHighlight: '#da96c6',
        svgBackground: '#FAFAFA',
    });

    const { colorMode } = useColorMode();

    const [playOffData, setPlayOffData] = useState([]);
    const [thirdPlaceData, setThirdPlaceData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        message: '',
        isError: false
    });

    useEffect(() => {
        const fetchMatches = () => {
            axios.get('/play-off')
                .then((res) => {
                    if (res.status === 200) {
                        setPlayOffData(res.data.playOffBracket);
                        setThirdPlaceData(res.data.thirdPlaceBracket);
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
        <Box minHeight="100vh" overflow="hidden">
            <Header />
            <Box style={{ overflowX: 'auto' }}>
                {loading ? (
                    <Center>
                        <Spinner size={'lg'} />
                    </Center>
                ) : error.isError ? (
                    <Center>
                        <Text>{error.message}</Text>
                    </Center>
                ) : (
                    <HStack>
                        <SingleEliminationBracket
                            matches={playOffData}
                            matchComponent={Match}
                            theme={colorMode === "dark" ? darkTheme : whiteTheme}
                        />
                        <SingleEliminationBracket
                            matches={thirdPlaceData}
                            matchComponent={Match}
                            theme={colorMode === "dark" ? darkTheme : whiteTheme}
                        />
                    </HStack>
                )}
            </Box>
            <Footer />
        </Box>
    )
}

export default Bracket
