import React from "react";
import {CircularProgress} from "@material-ui/core";
import {styles} from "../../../styles/styles";

export default function CircularProgressWrapper() {
    const classes = styles();

    return (
        <div className={classes.progress}>
            <CircularProgress />
        </div>
    )
}