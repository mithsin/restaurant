import { createUseStyles } from 'react-jss'

export const CardItemStyle = createUseStyles({
    CardItem: {
        display: 'flex',
        flexDirection: 'column',
        listStyle: 'none',
        margin: '0px',
        padding: '.5rem',
        flex: '1',
        '& :hover': {
            '& img': {
                boxShadow: '0px 0px 7px 2px #69c8e6',
            },
        },
    },
    CardImgWrapper: {
        height: '70%',
        cursor: 'pointer',
        overflow: 'hidden',
        // '& :hover': {
        //     boxShadow: '0px 0px 7px 2px #69c8e6',
        // },
    },
    img: {
        width: '100%',
        borderRadius: '25%',
    },
    CardLocationLi: {
        display: 'flex',
        justifyContent: 'space-between',
        '& span:first-child': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '.75rem',
        },
        '& span:last-child': {
            fontSize: '.75rem',
        },
    },
    CardTitleLi: {
        textAlign: 'center',
        fontSize: '1.63rem',
        fontWeight: '600',
        margin: ' 0',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '& span': {
            textAlign: 'center',
            fontSize: '1rem',
            fontFamily: 'Caveat, cursive',
        },
    },
    CardBtnWrapper: {
        margin: '8px 0',
    },
    CardByLi: {
        fontSize: '.75rem',
        fontWeight: '600',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    CardTitleShowMenu: {
        fontSize: '.75rem',
    },
    '@media only screen and (max-width: 960px) and (min-width: 600px)': {
        CardTitleLi: {
            fontSize: '1.1rem',
        },
    },
    '@media only screen and (max-width: 599px)': {
        CardItem: {
            padding: '.2rem',
        },
        CardTitleLi: {
            fontSize: '.75rem',
        },
    },
});

        