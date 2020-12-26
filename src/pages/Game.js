import React, { useState, useEffect, useRef } from 'react'
import { firebaseDB } from '../firebase'
import Button from '../components/Button';

const Game = (props) => {
    let timeout;
    let totalHoles = [1, 2, 3, 4, 5, 6]
    const [score, setScore] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [moleHolePosition, setMoleHolePosition] = useState(0)
    const [lastHole, setLastHole] = useState(0)
    const timeUp = useRef(false);
    // const totalmiss = useRef(0);
    const randomTime = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    }

    const randomHole = () => {
        let newHole = Math.floor(Math.random() * totalHoles.length);
        if (lastHole === newHole) {
            console.log('Ah nah thats the same hole');
            return randomHole();
        }
        setLastHole(newHole)
        return newHole
    }

    const startGame = () => {
        timeUp.current = false;
        peep();
    }

    const peep = async () => {
        const time = randomTime(800, 1500);
        const hole = randomHole()
        setMoleHolePosition(hole)
        timeout = setTimeout(() => {
            if (!timeUp.current) peep();
        }, time)
    }

    const bonk = (e) => {
        if (!e.isTrusted) return;
        e.target.parentNode.classList.remove('up');
        setScore(prevScore => prevScore + 1);
    }

    useEffect(() => {
        if (!localStorage.getItem("playerName")) {
            props.history.push("/")
            return;
        }
        else {
            const moles = document.querySelectorAll('.mole');
            moles.forEach(mole => mole.addEventListener('click', bonk))
            startGame()

        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem("playerName")) {
            // if (totalCount - score > 5) {
            //     timeUp.current = true
            //     setMoleHolePosition(null)
            //     firebaseDB.ref(`players/${localStorage.getItem("playerName")}`).set({ score }).then(res => {
            //         console.log("playerName", localStorage.getItem("playerName"))
            //         localStorage.removeItem("playerName")
            //     }).catch(err => console.log("error", err))
            //     return () => {
            //         clearTimeout(timeout)
            //     }
            // }
            setTotalCount(prevCount => prevCount + 1)
        }
    }, [moleHolePosition])

    if (!localStorage.getItem("playerName")) {
        return <h1>Loading!!!</h1>
    }

    return !timeUp.current ? (
        <div>
            <h1>Whack-a-mole! <span className="score">{score}</span></h1>
            <div className="game">

                {totalHoles.map((item, i) => {
                    return (
                        <div className={`hole ${moleHolePosition === item ? 'up' : ''}`} key={i}>
                            <div className="mole"></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
        : (
            <div className="container">
                <h1>Game Over!!! <br /> <span className="score"> Total Score: {score}</span>
                    <div>
                        <Button onClick={() => props.history.push('/')} className="btn-default">Go back</Button>
                    </div>
                </h1>
            </div>
        )

}

export default Game
