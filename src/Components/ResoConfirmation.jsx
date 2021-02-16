import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import 'moment-timezone';

export default function ResoConfirmation({ reso }) {

    function time(restime){
        if(restime !== null){
            const first = restime.split('T')
            const second = first[1].split(':')
            if(second[0] > 12){
            const hour = +second[0] - 12
            return `${hour}:${second[1]}pm`

            } else {
            return `${second[0]}:${second[1]}am`
            }
        }
    }

    return(
        <div className='confirm'>
            <Card className='conf acards' key={reso.id}>
                <Card.Body>
                    <Card.Title>Your MesaAwaits...</Card.Title>
                    <Card.Text>
                        at {reso.restaurant.name}<br/>
                        on {moment(reso.date).format('dddd[,] ll ')} 
                        at {time(reso.time)}<br/>
                        for {reso.party_size} {reso.party_size === 1 ? 'person' : 'people'} <br/>
                        we look forward to seeing you{reso.occasion === 'false' ? '!' : ` and celebrating your ${reso.occasion}!`} 
                    </Card.Text>
                </Card.Body>
            </Card>
            <div>
            <Link to='/search' className='prl'>Find More Restaurants</Link>
            <Link to='/profile' className='prl'>View Profile</Link>
            </div>
        </div>
    )
}