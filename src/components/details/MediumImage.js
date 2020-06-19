import React from 'react';
import {styles} from '../../styles/styles';
import {setOriginalImage} from "../../redux/actions";
import {connect} from "react-redux";

export function MediumImage(props) {
    const classes = styles();

    const result = props.result;
    const showName = result.show.name;
    const mediumImgSrc = result.show.image.medium;
    const originalImgSrc = result.show.image.original;

    return (
        <img id='mediumImage' alt={`img-${showName}`} src={mediumImgSrc}
             className={classes.mediumImage} onClick={() => {
            if (result.length!==0)
                props.setOriginalImage(originalImgSrc, showName);
        }}/>
    );
};

const mapDispatchToProps = {
    setOriginalImage
};

export default connect(null, mapDispatchToProps)(MediumImage);