export const playOffBracket = [
    {
        "id": 0,
        "nextMatchId": 4, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        "tournamentRoundText": "1", // Text for Round Header
        "startTime": "23.5.2024 16:20",
        "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        "participants": [
            {
                "id": "1A", // Unique identifier of any kind
                "resultText": "-", // Any string works
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                "name": "1A"
            },
            {
                "id": "4B",
                "resultText": "-",
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                "name": "4B"
            }
        ]
    },
    {
        "id": 1,
        "nextMatchId": 4, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        "tournamentRoundText": "1", // Text for Round Header
        "startTime": "23.5.2024 20:20",
        "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        "participants": [
            {
                "id": "2A", // Unique identifier of any kind
                "resultText": "-", // Any string works
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                "name": "2A"
            },
            {
                "id": "3B",
                "resultText": "-",
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                "name": "3B"
            }
        ]
    },
    {
        "id": 2,
        "nextMatchId": 5, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        "tournamentRoundText": "1", // Text for Round Header
        "startTime": "23.5.2024 16:20",
        "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        "participants": [
            {
                "id": "3A", // Unique identifier of any kind
                "resultText": "-", // Any string works
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                "name": "3A"
            },
            {
                "id": "2B",
                "resultText": "-",
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                "name": "2B"
            }
        ]
    },
    {
        "id": 3,
        "nextMatchId": 5, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        "tournamentRoundText": "1", // Text for Round Header
        "startTime": "23.5.2024 20:20",
        "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        "participants": [
            {
                "id": "4A", // Unique identifier of any kind
                "resultText": "-", // Any string works
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                "name": "4A"
            },
            {
                "id": "1B",
                "resultText": "-",
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                "name": "1B"
            }
        ]
    },
    {
        "id": 4,
        "nextMatchId": 6, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        "tournamentRoundText": "1", // Text for Round Header
        "startTime": "25.5.2024 14:20",
        "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        "participants": [
            {
                "id": "semi1", // Unique identifier of any kind
                "resultText": "-", // Any string works
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                "name": "TBA"
            },
            {
                "id": "semi2",
                "resultText": "-",
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                "name": "TBA"
            }
        ]
    },
    {
        "id": 5,
        "nextMatchId": 6, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        "tournamentRoundText": "1", // Text for Round Header
        "startTime": "25.5.2024 18:20",
        "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        "participants": [
            {
                "id": "semi3", // Unique identifier of any kind
                "resultText": "-", // Any string works
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                "name": "TBA"
            },
            {
                "id": "semi4",
                "resultText": "-",
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                "name": "TBA"
            }
        ]
    },
    {
        "id": 6,
        "nextMatchId": null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        "tournamentRoundText": "Finále", // Text for Round Header
        "startTime": "26.5.2024 20:20",
        "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        "participants": [
            {
                "id": "final1", // Unique identifier of any kind
                "resultText": "-", // Any string works
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                "name": "TBA"
            },
            {
                "id": "final2",
                "resultText": "-",
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                "name": "TBA"
            }
        ]
    }
]

export const thirdPlaceBracket = [
    {
        "id": 0,
        "name": "Boj o tretie miesto",
        "nextMatchId": null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        "tournamentRoundText": "Boj o tretie miesto", // Text for Round Header
        "startTime": "26.5.2024 15:20",
        "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        "participants": [
            {
                "id": "final3", // Unique identifier of any kind
                "resultText": "-", // Any string works
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                "name": "TBA"
            },
            {
                "id": "final4",
                "resultText": "-",
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                "name": "TBA"
            }
        ]
    }
]