import React, { ChangeEvent, useEffect, useState } from 'react';
import { ReactComponent as ClipboardIcon } from '../../assets/images/svg/clipboard.svg';
import { List, ListItemButton, ListItemText, ListItem, TextField, Tooltip } from '@mui/material';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

interface Props {
  [x: string]: any;
}

interface Game {
    session_id: string;
    game_type?: string;
    number_of_players?: number;
    max_number_of_players?: number;
}

export const OngoingGamesList = ({...inputProps }: Props) => {
    const [ongoingGames, setOngoingGames] = useState(Array<Game>());

    const mapResponseToGames = (data: any): Game[] => {
        var gamez :Game[] = [];
        data?.forEach((element: any) => {
            gamez.push(element);
        });
        return gamez;
    }

    const fetchOngoingGames = async () => {
        const fetchUrl = `${
            process.env.REACT_APP_API_SERVER_URL
        }/games/`;
        const response = await axios.get(fetchUrl)
        if(response.status == StatusCodes.OK) {
            const gamez :Game[] = mapResponseToGames(response.data);
            setOngoingGames(gamez);
        } else {
            toast.error('Error while fetching ongoing games data from the server. Cause: ' + response.statusText);
        }
    }

    const copyToClipboard = (session_id:string) => {
        navigator.clipboard.writeText(session_id);
    }

    useEffect(() =>{
        fetchOngoingGames();
    }, [])

    const listItemStyleText = {width: '48%', marginRight: '3%'};
    const listItemShorterStyle = {width: '10%', marginRight: '3%'};

    return (
        <div id="Games" style={{maxHeight: 200, overflow: 'auto'}}>
            <List>
                <ListItem>
                    <ListItemText primary='Key' style={{width: '60%', marginRight: '3%'}}/>
                    <ListItemText primary='Type' style={listItemShorterStyle}/>
                    <ListItemText primary='Players' style={listItemShorterStyle}/>
                </ListItem>
                {ongoingGames?.map((item, index) => {
                    return (
                        <ListItemButton key={index}>
                            <ListItemText primary={item.session_id} style={listItemStyleText}/>
                            <Tooltip title='Copy to clipboard' style={listItemShorterStyle}>
                                <ClipboardIcon
                                    width={24}
                                    height={24}
                                    onClick={() => {copyToClipboard(item.session_id)}}
                                    cursor="pointer"
                                />
                            </Tooltip>
                            <ListItemText primary={item?.game_type} style={listItemShorterStyle}/>
                            <ListItemText 
                                primary={item?.number_of_players + '/' + item?.max_number_of_players} 
                                style={listItemShorterStyle}/>
                        </ListItemButton>
                    );
                })}
            </List>
        </div>
    )
}