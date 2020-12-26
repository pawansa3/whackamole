import React from 'react'
import Button from '../components/Button'
import { firebaseDB } from '../firebase'

function Home(props) {
    const handleStart = (e) => {
        // e.preventDefault();
        const playerName = prompt("Please enter your name")
        if (playerName) {
            firebaseDB.ref(`players/${playerName}`).set({ score: 0 }).then((res) => {
                localStorage.setItem("playerName", playerName)
                props.history.push("/play")
            }).catch(err => {
                console.log("error", err)
            })
        }
        else {
            return;
        }
    }
    const handleScore = (e) => {
        e.preventDefault()
        props.history.push("/score")
    }

    return (
        <div className="App">
            <h1>Whack-a-mole!</h1>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 mbDiv">
                        <Button onClick={(e) => handleStart(e)}>Start</Button>
                    </div>
                    <div className="col-xs-12 mbDiv">
                        <Button onClick={(e) => handleScore(e)}>Score</Button>
                    </div>
                </div>
                <h4 className="text-center">
                    <i>
                        Game Rules:<br />
                        1. Click the mole to score!<br />
                        2. Game over after  5 miss!
                    </i>
                </h4>
            </div>
        </div>
    )
}

export default Home
