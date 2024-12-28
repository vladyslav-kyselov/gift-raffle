import {useEffect, useState} from 'react';
import {onValue, ref, set} from "firebase/database";
import TextField from '@mui/material/TextField';


import './App.css';

import {db} from './firebase';
import CustomModal from "./Modal.tsx";
import Button from "@mui/material/Button";
import {Alert, Fade} from "@mui/material";

function App() {
    const [losing, setLosing] = useState(null);
    const [winning, setWinning] = useState(null);
    const [tickets, setTickets] = useState(null);

    const [errorMessage, setErrorMessage] = useState('');
    const [code, setCode] = useState('');

    const [showModal, setShowModal] = useState<string | null>(null);



    useEffect(() => {
        const losingRef = ref(db, '/losing');
        onValue(losingRef, (snapshot) => {
            const losing = snapshot.val();

            if (losing) {
                setLosing(losing);
            }
        });

        const winingRef = ref(db, '/winning');
        onValue(winingRef, (snapshot) => {
            const winning = snapshot.val();

            if (winning) {
                setWinning(winning);
            }
        });

        const ticketsRef = ref(db, '/tickets');
        onValue(ticketsRef, (snapshot) => {
            const tickets = snapshot.val();

            if (tickets === 0 || tickets) {
                setTickets(tickets);
            }
        });

        // onStartGame();
    }, []);

    const onClick = () => {
        const isLose = losing.find((item) => item.id.toLowerCase() === code.toLowerCase());
        const isWin = winning.find((item) => item.id.toLowerCase() === code.toLowerCase());

        if (isLose && isLose.used || isWin && isWin.used) {
            setErrorMessage('Цей код вже використано!');
        } else if (isLose || isWin) {

            if (isLose) {
                setShowModal('LOSE');
                const refStartGame = ref(db, '/losing');

                const newLosingArray = losing.map((item) => item.id === code ? {...item, used: true} : item);
                setLosing(newLosingArray);
                set(refStartGame, newLosingArray);
            }

            if (isWin) {
                setShowModal('WIN');
                const refStartGame = ref(db, '/winning');

                const newWinningArray = winning.map((item) => item.id === code ? {...item, used: true} : item);
                setWinning(newWinningArray);
                set(refStartGame, newWinningArray);
            }

            const refStartGame = ref(db, '/tickets');
            set(refStartGame, tickets - 1);


            setCode('');
        } else {
            setErrorMessage('Такого коду не існує!');
        }
    };

    return (
        <div className="wrapper">
            <div className="img">
                <img src="../public/1.avif" alt="background"/>
            </div>
            <div className="input">
                <TextField
                    disabled={tickets === 0}
                    id="outlined-basic"
                    label={tickets === 0 ? 'Ви використали всі квитки' : "Введи код, та випробуй вдачу!"}
                    variant="outlined"
                    fullWidth={true}
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);

                        if (errorMessage) {
                            setErrorMessage('');
                        }
                    }}
                />
                <CustomModal showModal={showModal} handleClose={() => setShowModal(null)}
                             winTickets={(winning || []).reduce((prev, curr) => {
                                 return prev + (curr.used ? 0 : 1);
                             }, 0)}/>
                <Button
                    className="button"
                    variant="contained"
                    onClick={onClick}
                    disabled={tickets === 0}
                >
                    {tickets === 0 ? 'Лотарея закінчилась' : 'Перевірити'}
                </Button>

                {
                    errorMessage &&

                    <Fade in={!!errorMessage}>
                        <Alert severity="error">
                            {errorMessage}
                        </Alert>
                    </Fade>
                }
            </div>
            <div style={{color: 'grey', marginTop: 10}}>
                {tickets !== null && `Залишилось квитків: ${tickets}`}
            </div>
        </div>
    )
}

export default App
