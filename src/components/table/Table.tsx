import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { getRouteBetweenTwoSchools, getSchoolsList } from '../../apicall/ApiCall'
import { School } from '../../types/Types';

function renderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;
  const { schools, schoolSearched, setItinerary } = data

  const CreateItineraryPoints = (index: number) => {
    let school: School = schools.find((s: School, i: number) => index == i)
    let schoolDestiny: School = schoolSearched
    if(!schoolDestiny)
    {
      window.alert("Primeiro Digite um endereço !")
    }
    const originCoordinates: Array<number> = [school.latitude, school.longitude]
    const destinyCoordinates: Array<number> = [schoolDestiny.latitude, schoolDestiny.longitude]
    getRouteBetweenTwoSchools({Origin: originCoordinates, Destiny: destinyCoordinates })
    .then((response: any) => response.json())
    .then((data: any) => setItinerary(data));
  }

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={schools[index].nome} />
      </ListItemButton>
      <Button 
        onClick={() => CreateItineraryPoints(index)}
        variant="contained">
          Ver Rota
      </Button>
    </ListItem>
  );
}

export default function List(props: any) {
  const { setSchools, schools, schoolSearched, setItinerary } = props

  useEffect(() => {
    let isActive = true;
    getSchoolsList().then((response) => response.json()).then((data) => {
      if (isActive) {
        return setSchools(data);
      }
    }).catch((error) => console.log(error.message))
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <Box
      sx={wrapperStyles.box}
    >
      {schools && <FixedSizeList
        height={550}
        width={wrapperStyles.width}
        itemSize={50}
        itemCount={schools!.length}
        overscanCount={5}
        itemData={{ schools, schoolSearched, setItinerary }}
      >
        {renderRow}
      </FixedSizeList>}
    </Box>
  );
}

const wrapperStyles = {
  box: { width: '100%', height: '100%', bgcolor: 'background.paper' },
  width: '100%'
}
