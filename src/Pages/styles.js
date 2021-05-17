import {createUseStyles} from 'react-jss'

export const HeaderStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        maxWidth: '1440px',
        justifyContent: 'flex-start',
        margin: '0 auto',
        width: '100%',
    },
    Logo: {
        maxWidth: '9rem',
        width: '100%',
        marginRight: '2rem',
        cursor: 'pointer',
        '& img': {
            width: '100%',
        }
    },
    MenuList: {
        display: 'flex',
        textAlign: 'center',
        alignItems: 'flex-end',
    },
    MenuLi: props => {
        return {
            fontSize: '1.2rem',
            marginRight: '1rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: props.iconText || '#000',
            '&:hover': {
                borderBottom: '3px solid #81bed2',
            },
            '& svg': {
                color: props.iconColor || '#000',
            }
        }
    },
});

export const FooterStyle = createUseStyles({
    Footer: { width: "100%" },
    "Footer-Inner-Wrap": {
        padding: "0 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 0px 4px 0px #818181",
        fontSize: "1rem"
    },
    "Footer-Social-Block": {
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        flexBasis: "16rem"
    }      
})

export const homeStyles = createUseStyles({
    HomeOrderOnline: {
        position: 'fixed',
        right: '0px',
        top: '26px',
        zIndex: '99',
        fontWeight: '600',
        fontSize: '1.5rem',
        border: '1px dotted black',
        backgroundColor: '#fff',
        textDecoration: 'none',
        borderRadius: '6px',
        padding: '8px',
    },
    HomeOrderOnlineCartIcon: props => {
        return {
            position: 'fixed',
            right: '16px',
            top: '50px',
            zIndex: '99',
            fontWeight: '600',
            fontSize: '1.5rem',
            border: '1px dotted black',
            backgroundColor: '#ffffff33',
            textDecoration: 'none',
            borderRadius: '6px',
            padding: '8px',
            cursor: 'pointer',
            '& p': {
                position: 'absolute',
                top: '0',
                right: '0',
                margin: '0',
            },
            '& svg': {
                color: props.iconColor || '#000',
            }
        }
    },
    wrapper: {
        display: 'flex',
        flexBasis: '1440px',
        flexDirection: 'column',
    },
    CategoryWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '26px 0',
    },
    CategoryList: {
        maxWidth: '1280px',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        margin: 'auto',
        gap: '.5rem',
        width: '100%',
    },
    MenuOutterWrap: {
        padding: '8px',
        margin: 'auto',
        border: '1px dotted',
        maxWidth: '1240px',
    },
    '@media only screen and (max-width: 599px)': {
        CategoryList: {
            maxWidth: '1280px',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            margin: 'auto',
            gap: '0',
        },
    },
});