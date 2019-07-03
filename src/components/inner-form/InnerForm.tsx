import { Typography, Paper, IconButton } from "@material-ui/core";
import * as React from "react";
import CloseIcon from "@material-ui/icons/Close";

export interface IInnerForm extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    show: boolean;

    onClose(): void;
}

export const InnerForm = (props: IInnerForm) => {
    const {show = false, title, children, onClose, ...rest} = props;
    return (
        <Paper elevation={2} {...rest} style={ {display: show ? "" : "none", padding: 20} } >
            <div>
                <IconButton onClick={onClose} style={{float: "left", marginLeft: -7}}>
                    <CloseIcon/>
                </IconButton>
                <Typography variant={ "h5" } style={{padding: 8, paddingLeft: 55}}>{ title }</Typography>
            </div>
            {children}
        </Paper>
    );
};