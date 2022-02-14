import React, { useState } from 'react';
import Table from '../../components/table'
import Map from '../../components/map'
import TextFields from '../../components/textField'
import { School } from '../../types';

const Index: React.FC = () => {
  const [schools, setSchools] = useState<Array<School>>()
  const [schoolSearched, setSchoolSearched] = useState<School>()
  const [itinerary, setItinerary] = useState<any>()

  return (
    <div >
      <TextFields
        setSchools={setSchools}
        schools={schools}
        setSchoolSearched={setSchoolSearched}
      />
      <div style={wrapperStyles.container}>
        <Map 
          itinerary={itinerary}
        />
        <Table 
          setSchools={setSchools}
          schools={schools}
          schoolSearched={schoolSearched}
          setItinerary={setItinerary}
        />
      </div>
    </div>
  );
};

export const wrapperStyles = {
  container: {
    display: 'flex',
    margin: '20px'
  }
};

export default Index;