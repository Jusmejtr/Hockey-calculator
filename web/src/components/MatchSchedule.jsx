import React, { useEffect, useState } from 'react';
import { Box, Center, Checkbox, FormControl, FormLabel, HStack, Input, Spinner, Stack, Switch, Text, Tooltip, VStack, useColorModeValue } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import useSWR from 'swr'

import HockeyTable from './HockeyTable'
import { calculateGroup } from './calculations'
import { initTeamData, groupACountries, groupBCountries } from './group-data'
import { fetcher } from '../utils/fetcher'
import countryFlags from '../utils/flags'

const MatchSchedule = () => {
    const { colorMode } = useColorMode();

    const { data, error } = useSWR('/all-matches', fetcher);

    const [locked, setLocked] = useState(true);
    const [showFlgs, setShowFlags] = useState(true);

    const generateInitialScores = (teams) => {
        const initialScores = {};
        teams.forEach(team => {
            initialScores[team] = { ...initTeamData };
        });
        return initialScores;
    };

    const initialTableAScore = generateInitialScores(groupACountries);
    const initialTableBScore = generateInitialScores(groupBCountries);

    const [tableAScore, setTableAScore] = useState(initialTableAScore);
    const [tableBScore, setTableBScore] = useState(initialTableBScore);


    const borderColor = useColorModeValue("rgba(0,0,0,0.3)", "rgba(255,255,255,0.3)");

    const handleInputChange = (event, matchIndex, team, group) => {
        var { value } = event.target;

        if (value === '') {
            data.matches[group][matchIndex][`${team}_goal`] = null;
        } else {
            data.matches[group][matchIndex][`${team}_goal`] = parseInt(value);
        }

        data.matches[group][matchIndex].edited = true;

        calculateGroup(
            group === 'group-A' ? initialTableAScore : initialTableBScore,
            group === 'group-A' ? setTableAScore : setTableBScore,
            data.matches[group]
        );
    };

    const handleCheckboxChange = (event, matchIndex, group) => {
        var { checked } = event.target;

        if (checked) {
            data.matches[group][matchIndex].overtime = true;
        } else {
            data.matches[group][matchIndex].overtime = false;
        }

        calculateGroup(
            group === 'group-A' ? initialTableAScore : initialTableBScore,
            group === 'group-A' ? setTableAScore : setTableBScore,
            data.matches[group]
        );
    };


    useEffect(() => {
        if (data) {
            calculateGroup(initialTableAScore, setTableAScore, data.matches['group-A']);
            calculateGroup(initialTableBScore, setTableBScore, data.matches['group-B']);
        }
    }, [data]);

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

                        {showFlgs ? countryFlags(match.home_team) : null}

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

                        {showFlgs ? countryFlags(match.away_team) : null}

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

    if (error) {
        return (
            <Center>
                <Text>An error occurred while fetching data: {error.message}</Text>
            </Center>
        );
    }

    if (!data) {
        return (
            <Center>
                <Spinner size="lg" />
            </Center>
        );
    }

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
                    {renderMatchesWithDate(data.matches['group-A'], 'group-A')}
                    <HockeyTable group={tableAScore} matches={data.matches["group-A"]} />
                </VStack>

                <VStack alignItems={{ base: 'center', md: 'flex-start' }}>
                    <Box fontWeight="bold" fontSize="xl" mb="4">
                        <Text as={'h2'}>Skupina B</Text>
                    </Box>
                    {renderMatchesWithDate(data.matches['group-B'], 'group-B')}
                    <HockeyTable group={tableBScore} matches={data.matches["group-B"]} />

                </VStack>
            </Stack>
        </div>
    );
};

export default MatchSchedule;
