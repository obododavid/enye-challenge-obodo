import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 200,
            marginBottom: 50,
            '& .MuiNativeSelect-select:not([multiple]) option, .MuiNativeSelect-select:not([multiple]) optgroup': {
                backgroundColor: '#000'
            }
        },
    }),
);

type Props = {
    onSetRadius: (number) => void,
    error: boolean
}

const NativeSelects: React.FC<Props> = (props) => {
    const { error } = props
    const classes = useStyles();
    const [state, setState] = React.useState<{ age: string | number; name: string }>({
        age: '',
        name: 'hai',
    });

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target
        setState({
            ...state,
            [name]: value
        });
        props.onSetRadius(value)
    };

    return (
        <div>
            <FormControl className={classes.formControl} error={error}>
                <InputLabel shrink htmlFor="age-native-label-placeholder">
                    Geo-fencing radius
                </InputLabel>
                <NativeSelect
                    value={state.age}
                    onChange={handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'age-native-label-placeholder',
                    }}
                >
                    <option value="">Choose radius</option>
                    <option value={5000}>5km</option>
                    <option value={10000}>10km</option>
                    <option value={20000}>20km</option>
                    <option value={30000}>30km</option>
                    <option value={40000}>40km</option>
                    <option value={50000}>50km</option>
                    <option value={60000}>60km</option>
                    <option value={70000}>70km</option>
                    <option value={80000}>80km</option>
                    <option value={90000}>90km</option>
                    <option value={100000}>100km</option>
                </NativeSelect>
                {error && <FormHelperText>How far should your search span?</FormHelperText>}
            </FormControl>
        </div>
    );
}

export default NativeSelects
