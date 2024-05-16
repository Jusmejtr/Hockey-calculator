import React from 'react'
import Header from './Header'
import { SingleEliminationBracket, Match, createTheme } from '@g-loot/react-tournament-brackets';
import { Box, HStack, useColorMode } from '@chakra-ui/react';
import Footer from './Footer';

import { playOffBracket, thirdPlaceBracket } from '../playoff'

function Bracket() {

    document.title = "Play off"

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

    return (
        <Box minHeight="100vh" overflow="hidden">
            <Header />
            <Box style={{ overflowX: 'auto' }}>
                <HStack>
                    <SingleEliminationBracket
                        matches={playOffBracket}
                        matchComponent={Match}
                        theme={colorMode === "dark" ? darkTheme : whiteTheme}
                    />
                    <SingleEliminationBracket
                        matches={thirdPlaceBracket}
                        matchComponent={Match}
                        theme={colorMode === "dark" ? darkTheme : whiteTheme}
                    />
                </HStack>
            </Box>
            <Footer />
        </Box>
    )
}

export default Bracket
