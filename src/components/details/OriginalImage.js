import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {CircularProgress} from "@material-ui/core";
import {styles} from "../../styles/styles";
import {connect} from "react-redux";

export function OriginalImage(props) {
    const classes = styles();
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        if (props.src!=='') setVisible(true);
        else setVisible(false);
    }, [props.src]);

    return (
        <Card id='originalImageCard' className={visible ? classes.imageWrapperCard : classes.hidden}>
            <CardActionArea>
                {(props.src==='') ? <CircularProgress /> : <CardMedia className={classes.imageCard}
                    image={props.src} title={`${props.title}-img`} />}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button id='originalImageCloseBtn' variant='outlined' size='small' onClick={() => {
                    setVisible(false);
                    props.notifyParent();
                }}>
                    Zamknij
                </Button>
            </CardActions>
        </Card>
    );
};

const mapStateToProps = (state) => {
    return {
        src: state.setOriginalImageReducer.src,
        title: state.setOriginalImageReducer.title
    };
};

export default connect(mapStateToProps, null)(OriginalImage);