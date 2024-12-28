import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { TransitionProps } from '@mui/material/transitions';
import {Slide} from "@mui/material";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const TICKET = {
    LOSE: {
        title: 'На жаль, ваш квиток не є виграшним, спробуйте інший і вдача буде на вашій стороні!',
    },
    WIN: {
        title: 'Вітаємо, ваш квиток є виграшним! Скоріш покажіть це адміністратору! '
    }
}

const getImagePath = (tickets) => {
    console.log(tickets, 'TICKETS');
    if (tickets === 0) {
        return '../public/nutella.jpg';
    } else if (tickets === 1 || tickets === 2) {
        return '../public/tablerone.jpg';
    } else {
        return '../public/milkyway.jpeg';
    }
}

export default function CustomModal({showModal, handleClose, winTickets}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
                        {TICKET[showModal]?.title || ''}

                        {
                            showModal === 'LOSE' &&
                            <img
                                src="../public/lose.jpg" alt="lose icon"
                                style={{
                                    marginTop: '15px',
                                    width: '100%',
                                }}
                            />
                        }
                        {

                        showModal === 'WIN' &&
                            <img
                                src={getImagePath(winTickets)} alt="win icon"
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
