import React from 'react';
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import {Card, IconButton, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import JumboBookmark from "@jumbo/components/JumboBookmark";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import {Link} from "react-router-dom";



const Item = styled(Span)(({theme}) => ({
    padding: theme.spacing(0, 1),
}));

const ListData = ({Data, DeleteFun}) => {


    return (
        <Card sx={{mb: 1}}>
            {(Data) && (
            <Stack direction={"row"} alignItems={"center"} sx={{p: theme => theme.spacing(2, 1)}}>
                {/* <Link  style={{color: "#fff"}} to={`/dashboards/accountType/edit/${Data.id}`}> */}
                <Item
                    sx={{
                        flex: {xs: 1, md: '0 1 45%', lg: '0 1 35%'}
                    }}
                >
                    <Stack direction={'row'} alignItems={'center'}>
                        <Item sx={{ml: -1}}>
                            <JumboBookmark  sx={{verticalAlign: 'middle'}}/>
                            {/* <JumboBookmark value={user.isFavorite} sx={{verticalAlign: 'middle'}}/> */}
                        </Item>
                        <Item>
                            <Badge overlap="circular" variant="dot"
                                   anchorOrigin={{
                                       vertical: 'bottom',
                                       horizontal: 'right',
                                   }}
                                   sx={{
                                       '.MuiBadge-badge': {
                                           border: '2px solid #FFF',
                                           height: '14px',
                                           width: '14px',
                                           borderRadius: '50%',
                                        //    bgcolor: user.isOnline ? "success.main" : "#757575"
                                       }
                                   }}
                            >
                                {/* <Avatar
                                    sx={{
                                        width: 56,
                                        height: 56
                                    }}
                                    alt={`${user.firstName} 
                                    ${user.lastName}`}
                                    src={user.profilePic}
                                /> */}
                            </Badge>
                        </Item>
                            <Item>
                                <Typography variant={"h6"} mb={.5}>{Data.name ? Data.name : Data.full_name ? Data.full_name : null}</Typography>
                                {Data.email ? (
                                    <Typography variant={"body1"} color="text.secondary">{Data.email}</Typography>
                                ) : null}
                            </Item>
                    </Stack>
                </Item>
                {/* </Link> */}

                {Object.keys(Data).map((itemData, index)=>(
                   
                    itemData !== "name" 
                    && itemData !== "full_name" 
                    && itemData !== "id" 
                    && itemData !== "email" 
                    && itemData !== "user" 
                    && Data[itemData] !== null ? 
                        <Item
                        key={index}
                        sx={{
                            alignSelf: 'flex-start',
                            flexBasis: {md: '28%', lg: '18%'},
                            display: {xs: 'none', md: 'block'}
                        }}
                        >
                            <Typography variant={"h6"} mt={1} lineHeight={1.25}>{Data[itemData].toString()}</Typography>
                        </Item>
                  :null
                   
                ))}
                
              

                {/* <Item
                    sx={{
                        ml: 'auto',
                        display: {xs: 'none', sm: 'block'}
                    }}
                >
                     <Link  style={{color: "#fff"}} to={`/list-views/users/edit/${Data.id}`}>
                        <Button sx={{minWidth: 92}} disableElevation variant={"contained"} size={"small"}
                                color={"primary"}
                                >
                            {"Edit"}
                        </Button>
                    </Link>
                </Item> */}

                <Item
                    sx={{
                        ml: 'auto',
                        display: {xs: 'none', sm: 'block'}
                    }}
                >
                        <Button 
                        sx={{minWidth: 92}} 
                        disableElevation 
                        variant={"contained"} 
                        size={"small"} 
                        style={{backgroundColor: '#f00'}}
                        onClick={(e)=>{
                            
                            e.preventDefault()
                            DeleteFun(Data.id)
                        }}
                        >
                            {"Delete"}
                        </Button>
                </Item>
                <Item sx={{ml: {xs: 'auto', sm: 0}}}>
                    <IconButton aria-label="settings">
                        <MoreHorizIcon/>
                    </IconButton>
                </Item>
            </Stack>
        )}
        </Card>
    );
};

export default ListData;
