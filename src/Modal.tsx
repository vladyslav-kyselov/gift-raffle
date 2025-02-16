import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { TransitionProps } from '@mui/material/transitions';
import {Slide} from "@mui/material";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props}/>;
});


const TICKET = {
    LOSE: {
        title: 'На жаль, ваш квиток не є виграшним, спробуйте інший і вдача буде на вашій стороні!',
    },
    WIN: {
        title: 'Вітаємо, ваш квиток є виграшним! Скоріш покажіть це адміністратору! '
    }
}


const prizes = [
    './nutella.jpg', // 0
    './nussbeisser.png', // 1

    './pepsi.jpg', // 2
    './pepsi.jpg', // 3
    './pepsi.jpg', // 4
    './pepsi.jpg', // 5

    './migdały-prażone.jpg', // 6
    './migdały-prażone.jpg', // 7
    './migdały-prażone.jpg', // 8
    './migdały-prażone.jpg', // 9
    './migdały-prażone.jpg', // 10
    './migdały-prażone.jpg', // 11

    './hearts.jpg', // 12

    './2snikers.jpg', // 13
    './2snikers.jpg', // 14

    './Meltie.jpeg', // 15
    './Meltie.jpeg', // 16

    './coca-cola.jpg', // 17

    './alpine-milk.jpeg', // 18

    './2snikers.jpg', // 19
    './2snikers.jpg' // 20
]

const getImagePath = (winTickets: number) => {
    return prizes[winTickets]
}

type Props = {
    showModal: string | null;
    handleClose: () => void;
    winTickets: number;
}

export default function CustomModal({showModal, handleClose, winTickets}: Props) {
    return (
        <React.Fragment>
            <Dialog
                open={!!showModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    Перевірка білетика
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {
                            showModal === 'LOSE' && TICKET.LOSE.title
                        }
                        {
                            showModal === 'WIN' && TICKET.WIN.title
                        }

                        {
                            showModal === 'LOSE' &&
                            <img
                                src="./lose.jpg" alt="lose icon"
                                style={{
                                    marginTop: '15px',
                                    width: '100%',
                                }}
                            />
                        }
                        {

                        showModal === 'WIN' &&
                            <img
                                src={getImagePath(winTickets)} alt={`win icon ${getImagePath(winTickets)}`}
                                style={{
                                    marginTop: '15px',
                                    width: '100%'
                                }}
                            />
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Повернутись назад
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
