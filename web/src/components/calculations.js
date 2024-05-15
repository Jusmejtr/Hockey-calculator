export function calculateGroup(table, setTable, matches) {
    const updatedTable = { ...table };

    matches.forEach(match => {
        const homeTeam = match.home_team;
        const awayTeam = match.away_team;
        const homeGoals = match.home_goal;
        const awayGoals = match.away_goal;
        const overtime = match.overtime;

        if (homeGoals !== null && awayGoals !== null) {
            updatedTable[homeTeam].matches++;
            updatedTable[awayTeam].matches++;

            updatedTable[homeTeam]['goals-scored'] += homeGoals;
            updatedTable[homeTeam]['goals-conceded'] += awayGoals;
            updatedTable[awayTeam]['goals-scored'] += awayGoals;
            updatedTable[awayTeam]['goals-conceded'] += homeGoals;

            if (overtime) {
                if (homeGoals > awayGoals) {
                    updatedTable[homeTeam].winsOT++;
                    updatedTable[awayTeam].losesOT++;
                    updatedTable[homeTeam].points += 2;
                    updatedTable[awayTeam].points += 1;
                    updatedTable[homeTeam][awayTeam] = 'W';
                    updatedTable[awayTeam][homeTeam] = 'L';
                } else {
                    updatedTable[awayTeam].winsOT++;
                    updatedTable[homeTeam].losesOT++;
                    updatedTable[awayTeam].points += 2;
                    updatedTable[homeTeam].points += 1;
                    updatedTable[awayTeam][homeTeam] = 'W';
                    updatedTable[homeTeam][awayTeam] = 'L';
                }
            } else {
                if (homeGoals > awayGoals) {
                    updatedTable[homeTeam].wins++;
                    updatedTable[awayTeam].loses++;
                    updatedTable[homeTeam].points += 3;
                    updatedTable[homeTeam][awayTeam] = 'W';
                    updatedTable[awayTeam][homeTeam] = 'L';
                } else {
                    updatedTable[awayTeam].wins++;
                    updatedTable[homeTeam].loses++;
                    updatedTable[awayTeam].points += 3;
                    updatedTable[awayTeam][homeTeam] = 'W';
                    updatedTable[homeTeam][awayTeam] = 'L';
                }
            }
        }
    });

    console.log(updatedTable);

    // Nová časť na zoradenie tímov s rovnakým počtom bodov
    // Object.keys(updatedTable).forEach(team => {
    //     const samePointsTeams = Object.entries(updatedTable).filter(([otherTeam, data]) => otherTeam !== team && data.points === updatedTable[team].points);

    //     if (samePointsTeams.length >= 2) {
    //         const miniTable = samePointsTeams.map(([otherTeam, data]) => ({
    //             team: otherTeam,
    //             goalDifference: data['goals-scored'] - data['goals-conceded'],
    //             goalsScored: data['goals-scored']
    //         }));

    //         miniTable.sort((a, b) => {
    //             if (a.goalDifference !== b.goalDifference) {
    //                 return b.goalDifference - a.goalDifference;
    //             } else if (updatedTable[team][a.team] === 'W') {
    //                 return -1;
    //             } else if (updatedTable[team][b.team] === 'W') {
    //                 return 1;
    //             } else {
    //                 return b.goalsScored - a.goalsScored;
    //             }
    //         });

    //         miniTable.forEach((miniTableRow, index) => {
    //             const rank = updatedTable[miniTableRow.team].matches === 0 ? '-' : index + 1;
    //             updatedTable[miniTableRow.team].rank = rank;
    //         });
    //     }
    // });

    setTable(updatedTable);
}