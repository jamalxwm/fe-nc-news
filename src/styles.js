import { makeStyles } from '@material-ui/core/styles';
import { CardContent, cardMediaClasses } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'

  },
  cardGrid: {
    padding: '20px 0',
  },
  cardMedia: {
    paddingTop: '56.25%',
    flexGrow: 1
  },
  cardContent: {
    flexGrow: 1
  },
}));

export default useStyles;
