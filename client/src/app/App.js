import axios from 'axios'
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { v3 as uuid } from 'uuid';
import './App.css';

function App() {

  const [ data, setData ] = useState('')
  const [ link, setLink ] = useState()
  const [ loading, setLoading ] = useState()
  const [ error, setError ] = useState()

  const fetchData = (e) => {
    e.preventDefault()
    setData('')
    setError(false)
    setLoading(true)

    axios.get("http://localhost:5000/download", {
      params: {
        link: link
      }
    })
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setError(true)
      })
  }

  useEffect(()=> {}, [data])

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column mt-3">
      <h1 className='header fs-1'>YOUTUBE DOWNLOADER</h1>
      <form className='w-100' onSubmit={fetchData}>
          <div className="form-group d-flex flex-column w-100 mt-3">
              <input type="text" name="link" onChange={(e) => setLink(e.target.value)} className="form-control" placeholder='Enter youtube link: https://www.youtube.com/watch?v=example'/>
              <button type="submit" className="btn btn-danger my-4">Download</button>
          </div>
      </form>
      <div className="container-fluid w-100 m-1 d-flex justify-content-center align-items-center flex-column">
        {error && <h3 className='text-danger'>Error Invalid link!</h3> }
        {loading && <ReactLoading type='bubbles' color="black" height={450} width={150}/>}
        <div className='d-flex flex-row w-100'>
          {data && 
            <div className='container d-flex flex-column'>
              <img src={data.info.player_response.videoDetails.thumbnail.thumbnails[4].url} style={{height: "450px", width: "550px"}} alt="thumbnail"/>
              <h3 className='text-center m-4'>{data.info.player_response.videoDetails.title}</h3>
            </div>
          }
          <div className='container d-flex justify-content-center flex-column'>
            {data && data.data.map((quality) => quality && <a href={quality.url} target="_blank"><button className='btn btn-primary m-4 w-100' key={uuid}>{quality.qualityLabel}</button></a>)}
          </div>
        </div>
      </div>
    </div>
    );
}

export default App;
