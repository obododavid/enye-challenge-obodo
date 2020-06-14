import { makeStyles } from '@material-ui/core/styles';

export const useAuthPageStyles = makeStyles((theme) => ({
	'@keyframes slideIn': {
		'0%': {
			opacity: 0,
			transform: 'translateX(50px)'
		},
		'100%': {
			opacity: 1,
			transform: 'translateX(0px)'
		}
	},
	authPageContainer: {
		display: 'flex',
		height: '100vh',
		minHeight: '900px'
	},
	leftColumn: {
		backgroundColor: '#012B69',
		flex: 1,
		flexBasis: '60%',
		[theme.breakpoints.down('md')]: {
			flexBasis: '40%'
		},
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	rightColumn: {
		flex: 1,
		padding: '80px',
		flexBasis: '40%',
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			flexBasis: '60%'
		},
		[theme.breakpoints.down('sm')]: {
			flexBasis: '100%'
		}
	},
	formContainer: {
		width: '100%',
		animationName: `$slideIn`,
		animationDuration: '0.25s',
		animationDirection: 'normal',
		animationTimingFunction: 'ease-in-out',
		animationFillMode: 'forwards',
		'& .MuiButton-contained': {
			boxShadow: 'none',
			backgroundColor: '#012B69',
			color: '#fff',
			padding: '10px 40px',
			width: '100%',
			marginBottom: '20px',

			'&:enabled': {
				opacity: 1
			},

			'&:disabled': {
				opacity: 0.5,
				cursor: 'not-allowed !important'
			}
		}
	},
	header: {
		marginBottom: '20px',
		fontWeight: 600
	},
	formDescription: {
		marginBottom: '30px',
		fontWeight: 600
	},
	inputContainer: {
		marginBottom: '30px',

		'&:last-of-type': {
			marginBottom: '50px'
		},
		'& input': {
			'&::placeholder': {
				opacity: 0.1
			}
		}
	},
	enquiry: {
		textAlign: 'center',

		'& button': {
			backgroundColor: 'transparent',
			border: 'none',
			textDecoration: 'underline',
			cursor: 'pointer',
			fontStyle: 'italic',

			'&:hover': {
				color: '#012B69'
			}
		}
	}
}));
