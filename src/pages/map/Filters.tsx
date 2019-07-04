import {observer} from "mobx-react";
import * as React from "react";
import {FC} from "react";
import {Checkbox, Collapse, List, ListItem, ListItemIcon, ListItemText, Paper} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {InfoContext} from "../../connector/AppContext";
import {IType} from "../../entities/type";
import {ISpecialization} from "../../entities/specialization";
import {get} from "lodash";
import {MapStore} from "./MapStore";

interface IFiltersProps {
    store: MapStore;
}

export const Filters: FC<IFiltersProps> = observer(({store}) => {
    const [open, setOpen] = React.useState({
        type: true,
        specialization: true,
    });

    function handleTypeClick() {
        setOpen({type: !open.type, specialization: open.specialization});
    }

    function handleSpecializationClick() {
        setOpen({type: open.type, specialization: !open.specialization});
    }

    const changeTypesFilter = (value: number) => {
        const values = handleToggle(value, store.filterTypes);
        store.setTypes(values)
    };

    const changeSpecializationsFilter = (value: number) => {
        const values = handleToggle(value, store.filterSpecializations);
        store.setSpecializations(values)
    };

    const handleToggle = (value: number, values: number[]) => {
        const currentIndex = values.indexOf(value);
        const newChecked = [...values];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        return newChecked;
    };

    return (
        <div className="filters-container">
            <Paper elevation={2} className="filters">
                <ListItem button onClick={handleTypeClick}>
                    <ListItemText primary="Типы точек"/>
                    {open.type ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={open.type} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            InfoContext().types.map((type: IType, index) => (
                                <ListItem key={index} role={undefined} button dense
                                          onClick={() => changeTypesFilter(type.id)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            color={"primary"}
                                            edge="start"
                                            checked={!!~store.filterTypes!.indexOf(type.id)}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={type.title}/>
                                </ListItem>

                            ))
                        }
                    </List>
                </Collapse>

                <ListItem button onClick={handleSpecializationClick}>
                    <ListItemText primary="Виды специализаций"/>
                    {open.specialization ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={open.specialization} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            InfoContext().specializations.map((value: ISpecialization, index) => (
                                <ListItem key={index} role={undefined} button dense
                                          onClick={() => changeSpecializationsFilter(value.id)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            color={"primary"}
                                            edge="start"
                                            checked={!!~store.filterSpecializations!.indexOf(value.id)}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={value.title}/>
                                </ListItem>
                            ))
                        }
                    </List>
                </Collapse>
            </Paper>
        </div>
    )
});
