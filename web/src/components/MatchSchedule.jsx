import React, { useEffect, useState } from 'react';
import { Box, Checkbox, FormControl, FormLabel, HStack, Input, Stack, Switch, Text, Tooltip, VStack, useColorModeValue } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import ReactCountryFlag from "react-country-flag"

import countries from './countries'
import HockeyTable from './HockeyTable';
import { calculateGroup } from './calculations'

const MatchSchedule = ({ data }) => {
    const { colorMode } = useColorMode();

    const [locked, setLocked] = useState(true);
    const [showFlgs, setShowFlags] = useState(true);

    const initialTeamData = {
        "matches": 0,
        "wins": 0,
        "winsOT": 0,
        "loses": 0,
        "losesOT": 0,
        "goals-scored": 0,
        "goals-conceded": 0,
        "points": 0
    };

    const initialTableAScore = {
        "Švajčiarsko": { ...initialTeamData },
        "Nórsko": { ...initialTeamData },
        "Česko": { ...initialTeamData },
        "Fínsko": { ...initialTeamData },
        "Veľká Británia": { ...initialTeamData },
        "Kanada": { ...initialTeamData },
        "Rakúsko": { ...initialTeamData },
        "Dánsko": { ...initialTeamData }
    };

    const initialTableBScore = {
        "Slovensko": { ...initialTeamData },
        "Nemecko": { ...initialTeamData },
        "Švédsko": { ...initialTeamData },
        "USA": { ...initialTeamData },
        "Francúzsko": { ...initialTeamData },
        "Kazachstan": { ...initialTeamData },
        "Poľsko": { ...initialTeamData },
        "Lotyšsko": { ...initialTeamData }
    };

    const [tableAScore, setTableAScore] = useState(initialTableAScore);
    const [tableBScore, setTableBScore] = useState(initialTableBScore);


    const borderColor = useColorModeValue("rgba(0,0,0,0.3)", "rgba(255,255,255,0.3)");

    const groupA = data.matches['group-A'];
    const groupB = data.matches['group-B'];

    const handleInputChange = (event, matchIndex, team, group) => {
        var { value } = event.target;



        if (value === '') {
            if (team === 'home') {
                data.matches[group][matchIndex].home_goal = null;
            } else {
                data.matches[group][matchIndex].away_goal = null;
            }
        } else {
            if (team === 'home') {
                data.matches[group][matchIndex].home_goal = parseInt(value);
            } else {
                data.matches[group][matchIndex].away_goal = parseInt(value);
            }

        }
        data.matches[group][matchIndex].edited = true;
        calculateGroup(initialTableAScore, setTableAScore, data.matches['group-A']);
        calculateGroup(initialTableBScore, setTableBScore, data.matches['group-B']);

    };

    const handleCheckboxChange = (event, matchIndex, group) => {
        var { checked } = event.target;

        if (checked) {
            data.matches[group][matchIndex].overtime = true;
        } else {
            data.matches[group][matchIndex].overtime = false;
        }


        calculateGroup(initialTableAScore, setTableAScore, data.matches['group-A']);
        calculateGroup(initialTableBScore, setTableBScore, data.matches['group-B']);


    };


    useEffect(() => {
        calculateGroup(initialTableAScore, setTableAScore, data.matches['group-A']);
        calculateGroup(initialTableBScore, setTableBScore, data.matches['group-B']);

    }, []);

    const renderMatchesWithDate = (matches, group) => {
        let currentDate = null;
        return matches.map((match, index) => {
            const matchDate = match.date;
            const showDate = matchDate !== currentDate;
            currentDate = matchDate;
            const isHomeTeamSlovakia = match.home_team === 'Slovensko';
            const isAwayTeamSlovakia = match.away_team === 'Slovensko';
            return (
                <Box key={index} mb="2" width={"100%"}>
                    {showDate && <Box fontWeight="bold">{matchDate}</Box>}
                    <HStack
                        border="1px solid"
                        borderColor={borderColor}
                        borderRadius="md"
                        p="2"
                        justify={'center'}
                    >
                        <Text padding={1} pr={5} display={{ base: 'none', md: 'block' }}>{match.time}</Text>
                        {showFlgs ? (
                            (window.innerWidth < 768) ? (
                                <ReactCountryFlag
                                    countryCode={countries[match.home_team]}
                                    svg
                                    style={{ fontSize: '1.5rem' }}
                                    alt={match.home_team}
                                />
                            ) : (
                                <ReactCountryFlag
                                    countryCode={countries[match.home_team]}
                                    svg
                                    style={{ fontSize: '2rem' }}
                                    alt={match.home_team}
                                />
                            )
                        ) : null

                        }
                        <Text fontWeight={isHomeTeamSlovakia ? 'bold' : 'normal'} fontSize={{ base: '95%', sm: 'large' }} width={"25%"} textAlign={'right'}>{match.home_team}</Text>
                        <Input
                            width={'6%'}
                            height={'50%'}
                            type='number'
                            padding={0}
                            textAlign={'center'}
                            defaultValue={match.home_goal}
                            onChange={(e) => handleInputChange(e, index, 'home', group)}
                            readOnly={match.home_goal !== null && locked && match.edited == null}
                            cursor={match.home_goal !== null && locked && match.edited == null ? 'not-allowed' : 'text'}
                            bg={colorMode === "dark" ? "gray.700" : "white"}
                            min={0}
                        />
                        <Text>:</Text>
                        <Input
                            width={'6%'}
                            height={'50%'}
                            type='number'
                            padding={0}
                            textAlign={'center'}
                            defaultValue={match.away_goal}
                            onChange={(e) => handleInputChange(e, index, 'away', group)}
                            readOnly={match.away_goal !== null && locked && match.edited == null}
                            cursor={match.home_goal !== null && locked && match.edited == null ? 'not-allowed' : 'text'}
                            bg={colorMode === "dark" ? "gray.700" : "white"}
                            min={0}
                        />
                        <Text fontWeight={isAwayTeamSlovakia ? 'bold' : 'normal'} fontSize={{ base: '95%', sm: 'large' }} width={"25%"} textAlign={'left'}>{match.away_team}</Text>
                        {showFlgs ? (
                            (window.innerWidth < 768) ? (
                                <ReactCountryFlag
                                    countryCode={countries[match.away_team]}
                                    svg
                                    style={{ fontSize: '1.5rem' }}
                                    alt={match.away_team}
                                />
                            ) : (
                                <ReactCountryFlag
                                    countryCode={countries[match.away_team]}
                                    svg
                                    style={{ fontSize: '2rem' }}
                                    alt={match.away_team}
                                />
                            )
                        ) : null

                        }

                        <Checkbox
                            readOnly={locked && match.edited == null}
                            defaultChecked={match.overtime}
                            cursor={locked && match.edited == null ? 'not-allowed' : 'pointer'}
                            onChange={(e) => handleCheckboxChange(e, index, group)}
                        >
                            <Tooltip label='Výsledok po predĺžení/nájazdoch'><Box fontSize={{ base: '90%', md: '100%' }}>OT</Box></Tooltip>
                        </Checkbox>
                    </HStack>
                </Box>
            );
        });
    };

    return (
        <div>
            <Stack margin={'1% auto 1% auto'} width="100%" direction={{ base: 'column', md: 'row' }}>
                <FormControl display='flex' alignItems='center' maxWidth="310px" margin="auto">
                    <FormLabel htmlFor='option' mb='0'>
                        Povoliť úpravy odohratých zápasov
                    </FormLabel>
                    <Switch id='option' onChange={() => setLocked(!locked)} />
                </FormControl>
                <FormControl display='flex' alignItems='center' maxWidth="310px" margin="auto">
                    <FormLabel htmlFor='flags' mb='0'>
                        Zobraziť vlajky
                    </FormLabel>
                    <Switch id='flags' defaultChecked={'true'} onChange={() => setShowFlags(!showFlgs)} />
                </FormControl>
            </Stack>

            <Stack spacing={{ base: "20px", md: "40px" }} width={{ base: '95%', xs: '90%', sm: '80%' }} justify={'center'} margin={'auto'} direction={{ base: 'column', lg: 'row' }} pb={'5rem'}>

                <VStack alignItems={{ base: 'center', md: 'flex-start' }}>
                    <Box fontWeight="bold" fontSize="xl" mb="4" >
                        <Text as={'h2'}>Skupina A</Text>
                    </Box>
                    {renderMatchesWithDate(groupA, 'group-A')}
                    <HockeyTable group={tableAScore} matches={data.matches["group-A"]} />
                </VStack>

                <VStack alignItems={{ base: 'center', md: 'flex-start' }}>
                    <Box fontWeight="bold" fontSize="xl" mb="4">
                        <Text as={'h2'}>Skupina B</Text>
                    </Box>
                    {renderMatchesWithDate(groupB, 'group-B')}
                    <HockeyTable group={tableBScore} matches={data.matches["group-B"]} />

                </VStack>
            </Stack>
        </div>
    );
};

export default MatchSchedule;
