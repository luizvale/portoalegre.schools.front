import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { FieldSchool, School } from '../../types';
import { AddressFields } from '../../utils'
import { getSchoolsListOrderedByDistance } from '../../apicall'

export default function Forms(props: any) {
    const [state, setState] = useState<FieldSchool>({} as FieldSchool)
    const { schools, setSchools, setSchoolSearched } = props

    const HandleChange = (e: any) => {
        const { name, value } = e.target;
        const newVal = value;
        setState({
            ...state,
            [name]: newVal
        });
    };

    const ReorderListBySearchAddress = () => {
        const { Nome, Bairro, Numero, Cep } = state
        let schoolSearched: Array<School> = schools.filter((s: School) => (
            s.nome == Nome &&
            s.bairro == Bairro &&
            s.cep == Cep &&
            s.numero == Numero
        ))
        let schoolFormatted: FieldSchool = schoolSearched.map((s: School) => {
            return {
                Nome: s.nome,
                Bairro: s.bairro,
                Numero: s.numero,
                Cep: s.cep
            }
        })[0]
        setSchoolSearched(schoolSearched[0])
        getSchoolsListOrderedByDistance(schoolFormatted)
            .then((response: any) => response.json())
            .then((data: any) => setSchools(data));
    }

    return (
        <Box
            component="form"
            style={wrapperStyles.box}
            sx={wrapperStyles.size}
            noValidate
            autoComplete="off"
        >
            {AddressFields.map((field, index) => (
                <TextField
                    name={field}
                    key={index}
                    label={field}
                    variant="outlined"
                    onChange={HandleChange}
                />
            ))}
            <Button onClick={ReorderListBySearchAddress} variant="text">Buscar</Button>
        </Box>
    );
}

export const wrapperStyles = {
    box: { display: "inline-flex" },
    size: {
        '& > :not(style)': { m: 1, width: '25ch' }
    }
};
