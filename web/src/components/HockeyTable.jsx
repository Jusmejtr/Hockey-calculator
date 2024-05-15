import React from 'react';
import { Table, TableContainer, Tbody, Th, Thead, Tr, Td } from '@chakra-ui/react';

function HockeyTable({ group, matches }) {

    console.log(matches);


    const teamPoints = Object.keys(group).map(team => {
        const points = group[team].points;
        return { team, points };
    });

    const pointsCount = teamPoints.reduce((acc, curr) => {
        acc[curr.points] = (acc[curr.points] || 0) + 1;
        return acc;
    }, {});



    var poradie = [];
    let pocitadlo = 8;

    function updateStats(miniTable, homeTeam, awayTeam, homeGoals, awayGoals, overtime) {
        if (overtime == null) {
            overtime = false;
        }
        miniTable[homeTeam]["goals-scored"] += homeGoals;
        miniTable[homeTeam]["goals-conceded"] += awayGoals;
        miniTable[awayTeam]["goals-scored"] += awayGoals;
        miniTable[awayTeam]["goals-conceded"] += homeGoals;

        if (overtime) {
            if (homeGoals > awayGoals) {
                miniTable[homeTeam]["winsOT"]++;
                miniTable[awayTeam]["losesOT"]++;

                miniTable[homeTeam]["points"] += 2;
                miniTable[awayTeam]["points"] += 1;
            } else {
                miniTable[homeTeam]["losesOT"]++;
                miniTable[awayTeam]["winsOT"]++;

                miniTable[homeTeam]["points"] += 1;
                miniTable[awayTeam]["points"] += 2;
            }
        } else {
            if (homeGoals > awayGoals) {
                miniTable[homeTeam]["wins"]++;
                miniTable[awayTeam]["loses"]++;

                miniTable[homeTeam]["points"] += 3;
            } else {
                miniTable[homeTeam]["loses"]++;
                miniTable[awayTeam]["wins"]++;

                miniTable[awayTeam]["points"] += 3;
            }
        }
    }

    // key - pocet bodov
    // pointsCount[key] - pocet krajin s tymto poctom bodov
    for (let key in pointsCount) {
        let teamNames = getTeamsWithPoints(group, parseInt(key));
        if (pointsCount[key] === 1) {
            poradie.push({ pozicia: pocitadlo, data: getTeamData(group, teamNames) });
            pocitadlo--;
        } else if (pointsCount[key] === 2) {
            if (group[teamNames[0]][teamNames[1]] === "W") {
                poradie.push({ pozicia: pocitadlo, data: getTeamData(group, teamNames[1]) });
                pocitadlo--;

                poradie.push({ pozicia: pocitadlo, data: getTeamData(group, teamNames[0]) });
                pocitadlo--;
            } else {
                poradie.push({ pozicia: pocitadlo, data: getTeamData(group, teamNames[0]) });
                pocitadlo--;

                poradie.push({ pozicia: pocitadlo, data: getTeamData(group, teamNames[1]) });
                pocitadlo--;
            }
        } else {
            var miniTable = {};
            teamNames.forEach(team => {
                miniTable[team] = {
                    "wins": 0,
                    "winsOT": 0,
                    "loses": 0,
                    "losesOT": 0,
                    "goals-scored": 0,
                    "goals-conceded": 0,
                    "points": 0
                };
            });
            matches.forEach(match => {
                if (match.home_goal != null && match.away_goal != null) {
                    if (teamNames.includes(match["home_team"]) && teamNames.includes(match["away_team"])) {
                        updateStats(miniTable, match["home_team"], match["away_team"], match["home_goal"], match["away_goal"], match["overtime"]);
                    }
                }
            });

            const pointsArray = Object.values(miniTable).map(team => team.points);
            const allEqual = pointsArray.every((val, i, arr) => val === arr[0]);
            
            if (allEqual) {
                console.log("Týmy mají rovnaký počet bodů.");
            } else {                
                const sortedTeams = Object.entries(miniTable).sort((a, b) => a[1].points - b[1].points);
                sortedTeams.forEach(team => {
                    poradie.push({ pozicia: pocitadlo, data: getTeamData(group, team[0]) });
                    pocitadlo--;
                });
            }
        }
    }

    function getTeamsWithPoints(group, targetPoints) {
        const teams = Object.keys(group).filter(team => group[team].points === targetPoints);
        return teams;
    }

    function getTeamData(group, teamName) {
        return [teamName, group[teamName]];
    }

    // const teamsByPoints = {};
    // for (const team in group) {
    //     const points = group[team].points;
    //     if (!teamsByPoints[points]) {
    //         teamsByPoints[points] = [];
    //     }
    //     teamsByPoints[points].push(team);
    // }


    // Object.keys(teamsByPoints).forEach(points => {
    //     //console.log(`Teams with ${points} points:`, teamsByPoints[points])
    //     //console.log(teamsByPoints[points]);
    //     if(points != 0){
    //         if(teamsByPoints[points].length == 2){
    //             console.log("tu");
    //         }else if(teamsByPoints[points].length > 2){
    //             console.log("tca");
    //         }
    //     }
    // });





    const sortedGroup = Object.entries(group).sort(([countryA, dataA], [countryB, dataB]) => {
        // Porovnanie počtu bodov
        if (dataA.points !== dataB.points) {
            return dataB.points - dataA.points; // Zoradiť od najväčšieho počtu bodov
        } else {
            // Ak majú tímy rovnaký počet bodov, overiť ich vzájomné zápasy
            if (dataA[countryB] === 'W') {
                return -1; // Krajina A vyhrala vzájomný zápas, takže je vyššie v tabuľke
            } else if (dataB[countryA] === 'W') {
                return 1; // Krajina B vyhrala vzájomný zápas, takže je vyššie v tabuľke
            } else {
                // Ak neexistuje výsledok vzájomného zápasu alebo je to remíza, ponecháme pôvodné poradie
                return 0;
            }
        }
    });

    //console.log(sortedGroup)

    return (
        <TableContainer>
            <Table size={{ base: 'sm', md: 'md' }} width={{ base: '90%' }}>
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th>Krajina</Th>
                        <Th isNumeric>Z</Th>
                        <Th isNumeric>V</Th>
                        <Th isNumeric>Vp</Th>
                        <Th isNumeric>P</Th>
                        <Th isNumeric>Pp</Th>
                        <Th isNumeric>Skóre</Th>
                        <Th isNumeric>Body</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {sortedGroup.map(([country, data], index) => (
                        <Tr key={index} backgroundColor={index < 4 ? 'green.300' : index === sortedGroup.length - 1 ? 'red.300' : ''}>
                            <Td>{index + 1}</Td>
                            <Td>{country === 'Slovensko' ? <strong>{country}</strong> : country}</Td>
                            <Td isNumeric>{data.matches}</Td>
                            <Td isNumeric>{data.wins}</Td>
                            <Td isNumeric>{data.winsOT}</Td>
                            <Td isNumeric>{data.loses}</Td>
                            <Td isNumeric>{data.losesOT}</Td>
                            <Td isNumeric>{data["goals-scored"]} : {data["goals-conceded"]}</Td>
                            <Td isNumeric>{data.points}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default HockeyTable;
