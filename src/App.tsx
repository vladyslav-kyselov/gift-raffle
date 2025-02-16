import {useEffect, useState} from 'react';
import {onValue, ref, set} from "firebase/database";
import TextField from '@mui/material/TextField';


import './App.css';

import {db} from './firebase';
import CustomModal from "./Modal.tsx";
import Button from "@mui/material/Button";
import {Alert, Fade} from "@mui/material";

type Ticket = {
    id: string;
    used: boolean;
};

const winningStartArray = [
    'K5RSC', // +
    'KVMBY', // +
    '815Y5', // +
    'IAIFI', // +
    '8T004', // +
    'OFNFC', // +
    'X1YGN', // +
    '6K78E', // +
    'GA4YA', // +
    'SZSOH', // +
    'R28P6', // +
    'PX6KO', // +
    'VV3YS', // +
    'J0BWV', // +
    'H1GQ0', // +
    'FICG1', // +
    'HEFFR', // +
    'QLZB8', // +
    'MSBGE', // +
    'S3Z1N', // +
    'ZEH8Z' // +
];

const losingStartArray = [
    'QP7MI', // +
    '2VLH3', // +
    'J4SGC', // +
    'F3XHT', // +
    'J2LA0', // +
    'VZPH2', // +
    '4WY4M', // +
    '95JKB', // +
    'QNKU0' // +
];

function App() {
    const [losing, setLosing] = useState<null | Ticket[]>(null);
    const [winning, setWinning] = useState<null | Ticket[]>(null);
    const [tickets, setTickets] = useState<number | null>(null);

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const [showModal, setShowModal] = useState<string | null>(null);


    const onStartGame = () => {
        const losingRef = ref(db, '/losing');

        set(losingRef, losingStartArray.map((item) => ({id: item, used: false})));

        const winningRef = ref(db, '/winning');
        set(winningRef, winningStartArray.map((item) => ({id: item, used: false})));

        const ticketsRef = ref(db, '/tickets');
        set(ticketsRef, 30);
    };

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
        const isLose = (losing || []).find((item: Ticket) => item.id.toLowerCase() === code.toLowerCase());
        const isWin = (winning || []).find((item: Ticket) => item.id.toLowerCase() === code.toLowerCase());

        if (isLose && isLose?.used || isWin && isWin?.used) {
            setErrorMessage('Цей код вже використано!');
        } else if (isLose || isWin) {

            if (isLose) {
                setShowModal('LOSE');
                const refStartGame = ref(db, '/losing');

                const newLosingArray = (losing || []).map((item: Ticket) =>
                    item.id.toLowerCase() === code.toLowerCase() ? {...item, used: true} : item
                );
                setLosing(newLosingArray);
                set(refStartGame, newLosingArray);
            }

            if (isWin) {
                setShowModal('WIN');
                const refStartGame = ref(db, '/winning');

                const newWinningArray = (winning || []).map((item: Ticket) =>
                    item.id.toLowerCase() === code.toLowerCase() ? {...item, used: true} : item
                );
                setWinning(newWinningArray);
                set(refStartGame, newWinningArray);
            }

            const refStartGame = ref(db, '/tickets');
            set(refStartGame, (tickets || 1) - 1);


            setCode('');
        } else {
            setErrorMessage('Такого коду не існує!');
        }
    };

    return (
        <div className="wrapper">
            <div className="img">
                <img src="./1.avif" alt="background"/>
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
                                 return prev + (curr?.used ? 0 : 1);
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
