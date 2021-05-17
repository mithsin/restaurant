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
            fontSize: ({ theme }) => theme.textSize.small,
        },
        '& span:last-child': {
            fontSize: ({ theme }) => theme.textSize.small,
        },
    },
    CardTitleLi: {
        textAlign: 'center',
        fontSize: ({ theme }) => theme.textSize.default,
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
        fontSize: ({ theme }) => theme.textSize.small,
        fontWeight: '600',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    CardTitleShowMenu: {
        fontSize: ({ theme }) => theme.textSize.small,
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
            fontSize: ({ theme }) => theme.textSize.small,
        },
    },
});

export const ItemCardStyle = createUseStyles({
    ItemCardWrapper: { display: "flex", flexDirection: "column" },
    ItemCardImgblock: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        '& span': {
            position: "absolute",
            top: "5px",
            right: "5px",
            textShadow: "0px 0px 2px #fff",
            fontSize: "1.5rem"
        },
        '& img': { 
            width: "100%" 
        }
    },
    ItemCardText: {
        display: "flex",
        flexDirection: "column",
        "& h2": { fontSize: "1.5rem", fontWeight: 600, margin: "0", padding: "0" },
        "& p": { fontSize: ".9rem", margin: "0", padding: "0" },
        "& span": { fontSize: "1.5rem", fontWeight: 600 },
        "& button": {
            border: "2px solid #414141",
            color: "#414141",
            backgroundColor: "#fff",
            textAlign: "center",
            padding: ".5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer"
        },
        "& button:hover": {
            backgroundColor: "#7ad5f3",
            border: "2px solid #818181",
            color: "#818181"
        }
    },
    "@media only screen and (max-width: 599px)": {
        ItemCardText: { 
            "& h2": { fontSize: "1rem" } 
        }
    }  
});

export const ItemCardListStyle = createUseStyles({
    "Item-Card-List-Wrapper": { display: "flex", width: "calc(100% - 32px)" },
    "Item-Card-List-Wrapper-disable": {
        display: "flex",
        backgroundColor: "rgba(0,0,0,.1)"
    },
    "Item-Card-List-Img-block": {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexBasis: "30%",
        "& span": {
            position: "absolute",
            top: "5px",
            right: "5px",
            textShadow: "0px 0px 2px #fff",
            fontSize: "1.5rem"
            },
        "& img": { width: "100%" }
    },
    "Item-Card-List-Text": {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingLeft: "8px",
        "& h2": { 
            fontSize: "1.5rem", fontWeight: 600, margin: "0", padding: "0" 
        },
        "Item-Card-List-span": {
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center"
        },
        "& button": {
            border: "2px solid #414141",
            color: "#414141",
            backgroundColor: "#fff",
            textAlign: "center",
            padding: ".5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer"
        },
        "& button:hover": {
            backgroundColor: "#7ad5f3",
            border: "2px solid #818181",
            color: "#818181"
        }
    },
    "@media only screen and (max-width: 599px)": {
        "Item-Card-List-Wrapper": { width: "calc(100% - 8px)" }
      }
});

export const ItemDetailsStyle = createUseStyles({
    "Item-Details-Wrapper": {
        width: "400px",
        backgroundColor: "white",
        margin: "2rem auto",
    },
    "Item-Details-Close": { 
        display: "flex", 
        justifyContent: "flex-end"
    },
    "Item-Card-Img-block": {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& span": {
            position: "absolute",
            top: "5px",
            right: "5px",
            textShadow: "0px 0px 2px #fff",
            fontSize: "1.5rem"
        },
        "& img": { width: "100%" }
    },
    "Item-Details-Text": {
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        "& h2": {
            fontSize: "1.5rem",
            fontWeight: 600,
            margin: "0",
            padding: "0",
            textAlign: "center"
        },
        "& p": { 
            fontSize: ".9rem", 
            margin: "0", 
            padding: "0" 
        },
        "& span": {
            fontSize: "1.5rem",
            fontWeight: 600,
            margin: "'auto'",
            textAlign: "right"
        },
        "& button": { 
            marginTop: "16px", 
            padding: "8px" 
        }
    }
      
});

// @media only screen and (max-width: 599px) {
//     .Menu-Box-Item-Wrapper {
//         grid-template-columns: repeat(3, 1fr);
//     }
//     .Item-Card-Text {
//         h2 {
//             font-size: 1rem;
//         };
//     }
//     .Item-Details-Wrapper {
//         width: 100%;
//     }
//     .ItemEdit-Wrapper {
//         display: flex;
//         flex-direction: column-reverse;
//     }
//     .Item-Details-Edit-Wrapper {
//         width: calc(100% - 16px);
//     }
//     .Item-Card-List-Wrapper {
//         width: calc(100% - 8px);
//     };
// };