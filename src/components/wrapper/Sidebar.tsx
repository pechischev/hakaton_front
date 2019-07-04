import * as React from "react";
import {FC, useState} from "react";
import {Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MenuIcon from "@material-ui/icons/Menu";
import {UserContext} from "../../connector/AppContext";
import {observer} from "mobx-react";

const drawerWidth = 240;

export const Sidebar: FC = observer(() => {
    const [open, setOpen] = useState(false);

    if (!open) {
        return (
            <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={() => setOpen(true)}
                style={{
                    marginLeft: 12,
                    marginRight: 20,
                }}
            >
                <MenuIcon/>
            </IconButton>
        )
    }

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            style={{
                width: drawerWidth,
            }}
        >
            <div style={{
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                width: drawerWidth,
                flexShrink: 0,
                justifyContent: "flex-end",
            }}>
                <IconButton onClick={() => setOpen(false)}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <List>
                {["Контакты"].map((text, index) => (
                    <ListItem button={true} key={index}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            {UserContext().isLoggedIn() && (
                <ListItem button={true} onClick={() => {
                    UserContext().logout();
                    setOpen(false);
                }}>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Выйти"} />
                </ListItem>
            )}
        </Drawer>
    );
});
