
import React from 'react';
import './sidebar.css';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { NavLink } from 'react-router-dom';
import { CallToAction, Language, Article, People, Class, LocalOffer, EmojiEvents, MilitaryTech } from '@mui/icons-material';
import { Divider } from '@mui/material';



function Sidebar(props) {

    return (
        <>
            <div className="sidebar">
                <Divider className="sidebar-divider" textAlign="left">Common</Divider>
                <ListItemButton component={NavLink} to="/">
                    <ListItemIcon>
                        <Language />
                    </ListItemIcon>
                    <ListItemText primary="Website" />
                </ListItemButton>

                <ListItemButton component={NavLink} to="">
                    <ListItemIcon>
                        <CallToAction />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <Divider className="sidebar-divider" textAlign="left">Main Items</Divider>
                <ListItemButton component={NavLink} to="lessons">
                    <ListItemIcon>
                        <Article />
                    </ListItemIcon>
                    <ListItemText primary="Lesson" />
                </ListItemButton>

                {/* <ListItemButton component={NavLink} to="exams">
                    <ListItemIcon>
                        <Draw />
                    </ListItemIcon>
                    <ListItemText primary="Exam" />
                </ListItemButton> */}

                <ListItemButton component={NavLink} to="users">
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    <ListItemText primary="User" />
                </ListItemButton>

                <ListItemButton component={NavLink} to="categories">
                    <ListItemIcon>
                        <Class />
                    </ListItemIcon>
                    <ListItemText primary="Category" />
                </ListItemButton>

                <ListItemButton component={NavLink} to="tags">
                    <ListItemIcon>
                        <LocalOffer />
                    </ListItemIcon>
                    <ListItemText primary="Tag" />
                </ListItemButton>

                {/* <ListItemButton onClick={handleClick} >
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lesson" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <ul>
                        <li>
                            <NavLink to="">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="products">Foo</NavLink>
                        </li>
                        <li>
                            <NavLink to="profile">Bar</NavLink>
                        </li>
                    </ul>
                </Collapse> */}

                <Divider className="sidebar-divider" textAlign="left">Game Items</Divider>
                <ListItemButton component={NavLink} to="rewards">
                    <ListItemIcon>
                        <MilitaryTech />
                    </ListItemIcon>
                    <ListItemText primary="Reward" />
                </ListItemButton>

                <ListItemButton component={NavLink} to="achievements">
                    <ListItemIcon>
                        <EmojiEvents />
                    </ListItemIcon>
                    <ListItemText primary="Achievement" />
                </ListItemButton>


            </div>
        </>
    );
}

export default Sidebar;