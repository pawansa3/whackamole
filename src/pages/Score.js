import React, { useState, useEffect } from 'react'
import { firebaseDB } from '../firebase'
import Button from '../components/Button'

const Score = (props) => {
    const [isLoading, setLoading] = useState(true)
    const [players, setPlayers] = useState(null)

    useEffect(() => {
        try {
            firebaseDB.ref("players").orderByChild("score").limitToLast(5).on("value", (snapshot) => {
                const players = []
                snapshot.forEach(childSnapShot => {
                    players.push({
                        playerName: childSnapShot.key,
                        ...childSnapShot.val()
                    })
                })
                setLoading(false)
                setPlayers(players.sort((a, b) => b.score - a.score))
            })
        }
        catch (err) {
            console.log('error', err)
            setLoading(false);
        }
    }, [])

    if (isLoading) {
        return <h1>Loading!!!</h1>
    }

    return (
        <div className="container">
            <h1>High Scoreboard</h1>
            <table className="table table-hover table-bordered tableFont">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Player Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        players && players.map((player, i) => {
                            return (
                                <tr key={i + 1}>
                                    <th>{i + 1}</th>
                                    <td>{player.playerName}</td>
                                    <td>{player.score}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <h1>
                <Button onClick={() => props.history.push("/")} className="btn-default">Go back</Button>
            </h1>
        </div>
    )
}

export default Score
