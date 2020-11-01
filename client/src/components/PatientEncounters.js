import React, {useState, useEffect} from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import EventIcon from '@material-ui/icons/Event';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Slide } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {createOrder} from '../store/orders'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { set } from 'js-cookie';

const useStylesLoginTextField = makeStyles((theme) => ({
    root: {
      border: '2px solid #e2e2e1',
      overflow: 'hidden',
      paddingLeft: "10px",
      paddingTop: "4px",
      paddingBottom: "4px",
      marginTop: "14px",
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&$focused': {
        border: '2px solid rgb(94, 158, 214)',
        backgroundColor: '#fff',
        // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 1px`,
      },
    },
    focused: {},
  }));

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function createRows(encounter) {
    const start = encounter.start.split(" ")
    const startTime = start[4]
    const end = encounter.end.split(" ")
    const endTime = end[4]
    const date = start.slice(0,4).join(" ")
    return { id: encounter.id, type: encounter.type.name ,date, start: startTime, end: endTime, provider: encounter.provider.full_name, resource: encounter.resource.name, department:encounter.department.name };
  }

  const headCells = [
  { id: 'id', numeric: true, disablePadding: false, label: 'id' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date'},
  { id: 'start', numeric: false, disablePadding: false, label: 'Start' },
  { id: 'end', numeric: false, disablePadding: false, label: 'End' },
  { id: 'department', numeric: false, disablePadding: false, label: 'Department' },
  { id: 'provider', numeric: false, disablePadding: false, label: 'Provider' },
  { id: 'resource', numeric: false, disablePadding: false, label: 'Resource'}
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    return (
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
    }

    EnhancedTableHead.propTypes = {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
      };

    const useToolbarStyles = makeStyles((theme) => ({
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
        },
        highlight:
          theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
              },
        title: {
          flex: '1 1 100%',
        },
      }));

      const EnhancedTableToolbar = (props) => {
        const classes = useToolbarStyles();
        const { numSelected } = props;
      
        return (
          <Toolbar
            className={clsx(classes.root, {
              [classes.highlight]: numSelected > 0,
            })}
          >
            {numSelected > 0 ? (
              <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                {numSelected} selected
              </Typography>
            ) : (
              <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Encounters
              </Typography>
            )}
      
            {numSelected > 0 ? (
              <Tooltip title="Delete">
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Filter list">
                <IconButton aria-label="filter list">
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        );
      };

      EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
      };

  const ColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        paddingRight: "10px",
        paddingLeft: "10px",
        margin: "4px",
        backgroundColor:"grey",
        '&:hover': {
            backgroundColor: "#b1f3b1 !important",
        },
    },
    }))(Button);

  function LoginTextField(props) {
    const classes = useStylesLoginTextField();
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  }

const useStyles = makeStyles((theme) => ({
      paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
      },
      table: {
        minWidth: 750,
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    //   display:"flex",
    //   flexDirection:"row"
    },  modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display:"flex",
        flexDirection:"column"
      },
  }));

function PatientEncounters(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const current_user = useSelector(state=>state.auth.user)
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [displayOrderForm,setDisplayOrderForm] = useState(false)
    const [newOrderType,setNewOrderType] =useState(1)
    const [newOrderPatientName,setNewOrderPatientName]=useState(props.patient.fullName)
    const [newOrderStatus,setNewOrderStatus]=useState("unscheduled")
    const [newOrderSignature,setNewOrderSignature]=useState("")
    const [createNewOrder,setCreateNewOrder]=useState(true)
    
    const [encounters,setEncounters] = useState(props.patient.encounters)
    const [rows,setRows] = useState([])

    useEffect(()=>{
        if (encounters.length) {
            const tableRows = encounters.map(encounter => {
                    return (
                        createRows(encounter)
                    )
                })
            console.log("table ROWS: ",tableRows)
            setRows(tableRows)
        }
    },[encounters])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
    
      const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = rows.map((n) => n.name);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
      };
    
      const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
      };
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
      const handleChangeDense = (event) => {
        setDense(event.target.checked);
      };
    
      const isSelected = (name) => selected.indexOf(name) !== -1;
    
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const dispatch = useDispatch()


    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        if (newOrderSignature) {
            setNewOrderSignature("")
            dispatch(createOrder({order_type:newOrderType,patient_id:props.patient.id,status:newOrderStatus,provider_id:current_user.id}))
        }
    },[createNewOrder])

    return (
        <>
            <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">{row.start}</TableCell>
                      <TableCell align="right">{row.end}</TableCell>
                      <TableCell align="right">{row.department}</TableCell>
                      <TableCell align="right">{row.provider}</TableCell>
                      <TableCell align="right">{row.resource}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
                    <ListItem
                    button
                    onClick={(event) => {
                        handleOpen()
                    }}
                    style={{border:"lightgreen"}}
                    >
                        <ListItemIcon>
                            <AddBoxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`New Encounter Order`} />
                    </ListItem>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                          <div className={classes.paper}>
                            <form>
                                <div>Type: <LoginTextField disabled value={newOrderType}/></div>
                                <div>Patient: <LoginTextField disabled value={newOrderPatientName}/></div>
                                <div>Status: <LoginTextField disabled value={newOrderStatus}/></div>
                                <ColorButton onClick={()=>{
                                    setNewOrderSignature(true)
                                    setCreateNewOrder(!createNewOrder)
                                    handleClose()
                                }}>Request Encounter</ColorButton>
                            </form>
                          </div>
                        </Fade>
                    </Modal>
        </>
    );
}
export default PatientEncounters;