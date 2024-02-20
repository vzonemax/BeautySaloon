import { useEffect, useState, useMemo } from 'react';
import { useFetching } from '../hooks/useFetching';
import axios from 'axios'
import '../styles/styles.css'
import Card from '../components/Card';
import SaloonFinder from '../components/SaloonFinder';

const SaloonsPage = () => {
  const [saloons, setSaloons] = useState([])
  const [saloonFilter, setSaloonFilter] = useState("")
  const [searchedSaloons, setSearchedSaloons] = useState([])
  const [fetchSaloons, isLoading, error] = useFetching(async () => {
    const response = await axios("http://localhost:5000/api/saloons/get")
    setSaloons(response.data)
    setSearchedSaloons(response.data)
  })

  const filterSaloon = () => {
    setSearchedSaloons(saloons.filter(val => {
      return val.SaloonName.toLowerCase().includes(saloonFilter.toLowerCase()) || val.SaloonDescription.toLowerCase().includes(saloonFilter.toLowerCase())
    }))
  }

  useEffect(() => {
    fetchSaloons()
  }, [])

  useMemo(() => {
    filterSaloon()
  }, [saloonFilter])

  return (
    <div className='App'>
      <h2>Выберите салон для записи на услугу:</h2>
      <SaloonFinder saloonFilter={saloonFilter} setSaloonFilter={setSaloonFilter} />
      {searchedSaloons.map(val =>
        <Card key={val.idSaloon} val={val} />
      )}
    </div>
  );
}

export default SaloonsPage;
