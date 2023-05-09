import React from 'react';
import Scrollbars from "react-custom-scrollbars-2";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from 'react-redux';

//todo - need to see how to define prop-types for this.

const JumboScrollbar = React.forwardRef((props, ref) => {

    const chateRooms = useSelector(state => state.Chat.rooms)

    const {theme} = useJumboTheme();
    const {direction, renderTrackVertical, renderTrackHorizontal, disable, ...restProps} = props;

    if (disable) {
        return restProps.children ?? null;
    }

    const renderTrackProp = (direction === 'vertical') ? ({
        renderTrackVertical: ({style, ...props}) => (<div
                style={{
                    ...style,
                    top: '2px',
                    bottom: '2px',
                    right: '2px',
                    borderRadius: '3px',
                    ...(theme.direction === "rtl" ? {right: 'auto', left: '2px'} : {})
                }}
                {...props}
            />
        )
    }) : ({
        renderTrackHorizontal: ({style, ...props}) =>
            <div {...props} style={{
                ...style,
                left: '50%',
                width: '100px',
                top: 0,
                transform: 'translateX(-50%)',
            }}/>
    });

    const handleScroll = (e) => {

        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
        
        if(bottom && (props.rommsCount !== chateRooms.length) && (props.showAndHideChatLoader === false || props.showAndHideContactLoader === false))
        {
            if(props.tapName === "chat")
            {
                props.callinfinitescrollchatfun()
                // console.log("bottom =", bottom);
            }

            if(props.tapName === "contact")
            {
                props.callinfinitescrollcontactsfun()
                // console.log("bottom =", bottom);
            }
            
        }

        
    }

    const handleScrollStop = () => {
        
    }

    console.log("props =", props);

    return (
        <Scrollbars
        onScroll={handleScroll}
        onScrollStop={handleScrollStop}
            renderView={
                props => (<div {...props} style={
                    (theme.direction === "rtl" ? {
                        ...props?.style,
                        marginLeft: "-17px",
                        marginRight: 0
                    } : {...props?.style})
                }/>)
            }

            ref={ref}
            {...renderTrackProp}
            {...props}

        />
    );
});

JumboScrollbar.defaultProps = {
    direction: "vertical",
};

JumboScrollbar.propTypes = {
    direction: PropTypes.string,
    disable: PropTypes.bool,
};

export default JumboScrollbar;
