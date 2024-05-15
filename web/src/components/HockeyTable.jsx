import React from 'react';
import { Table, TableContainer, Tbody, Th, Thead, Tr, Td } from '@chakra-ui/react';

function HockeyTable({ group, matches }) {

    const teamPoints = Object.keys(group).map(team => {
        const points = group[team].points;
        return { team, points };
    });

    const pointsCount = teamPoints.reduce((acc, curr) => {
        acc[curr.points] = (acc[curr.points] || 0) + 1;
        return acc;
    }, {});

    var table = [];

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

    function goalDifference(table, team) {
        return table[team]["goals-scored"] - table[team]["goals-conceded"];
    }


    // key - pocet bodov
    // pointsCount[key] - pocet krajin s tymto poctom bodov 
    for (let key in pointsCount) {
        let teamNames = getTeamsWithPoints(group, parseInt(key));
        if (pointsCount[key] === 1) {
            table.push({ data: getTeamData(group, teamNames[0]) });
        } else if (pointsCount[key] === 2) {
            if (group[teamNames[0]][teamNames[1]] === "W") {
                table.push({ data: getTeamData(group, teamNames[1]) });

                table.push({ data: getTeamData(group, teamNames[0]) });
            } else {
                table.push({ data: getTeamData(group, teamNames[0]) });

                table.push({ data: getTeamData(group, teamNames[1]) });
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
                let sortedTeams = Object.keys(miniTable).sort((a, b) => goalDifference(miniTable, a) - goalDifference(miniTable, b));
                sortedTeams.forEach(team => {
                    table.push({ data: getTeamData(group, team) });
                });
            } else {
                let sortedTeams = Object.entries(miniTable).sort((a, b) => a[1].points - b[1].points);
                sortedTeams.forEach(team => {
                    table.push({ data: getTeamData(group, team[0]) });
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



    return (
        <TableContainer width={"100%"}>
            <Table size={{ base: 'sm', md: 'md' }}>
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


                    {table.reverse().map(({ data }, index) => (
                        <Tr key={index} backgroundColor={index < 4 ? 'green.300' : index === table.length - 1 ? 'red.300' : ''}>
                            <Td>{index + 1}</Td>
                            <Td>{data[0] === 'Slovensko' ? <strong>{data[0]}</strong> : data[0]}</Td>
                            <Td isNumeric>{data[1]["matches"]}</Td>
                            <Td isNumeric>{data[1]["wins"]}</Td>
                            <Td isNumeric>{data[1]["winsOT"]}</Td>
                            <Td isNumeric>{data[1]["loses"]}</Td>
                            <Td isNumeric>{data[1]["losesOT"]}</Td>
                            <Td isNumeric>{data[1]["goals-scored"]} : {data[1]["goals-conceded"]}</Td>
                            <Td isNumeric>{data[1]["points"]}</Td>
                        </Tr>
                    ))}

                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default HockeyTable;
