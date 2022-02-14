export const getSchoolsList = () => fetch(`${process.env.REACT_APP_API_URL}/list`)

export const getSchoolsListOrderedByDistance = (Addres: any) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Addres)
    };
    return fetch(`${process.env.REACT_APP_API_URL}/ordered`, requestOptions)
}

export const getRouteBetweenTwoSchools = (Intineraty: any) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Intineraty)
    };
    return fetch(`${process.env.REACT_APP_API_URL}/route`, requestOptions)
}