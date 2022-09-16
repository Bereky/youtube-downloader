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
        setError(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setError(true)
      })

     /* document.body.style.backgroundColor = "#fff" */
  }

  useEffect(()=> {}, [data])

  return (
    <div className="container-main d-flex justify-content-center align-items-center flex-column px-3">
        <a className='header fs-1 m-3' href='/'>YOUTUBE DOWNLOADER</a>
      <form className='w-auto m-4 p-3' onSubmit={fetchData}>
          <div className="form-group d-flex flex-row m-auto">
              <input type="text" name="link" onChange={(e) => setLink(e.target.value)} className="form-control p-3" placeholder='Enter youtube link: https://www.youtube.com/watch?v=example' required/>
              <button type="submit" className="btn btn-outline-light mx-1 p-3">Download</button>
          </div>
      </form>
      <div className="container-fluid w-auto d-flex justify-content-center align-items-center flex-column flex-wrap search-result">
        {error && <h3 className='text-danger'>Error or invalid link!</h3> }
        {loading && <ReactLoading type='bubbles' color="#ffffff" height={100} width={100}/>}
        {data && 
        <div className='d-flex flex-row w-100 h-100 flex-wrap'>
          <div className='container d-flex justify-content-center flex-column align-self-start' style={{height: "450px", width: "500px"}}>
            <img src={data.info.player_response.videoDetails.thumbnail.thumbnails[4].url} style={{height: "auto", width: "100%"}} alt="thumbnail"/>
            <h3 className='text-center m-4'>{data.info.player_response.videoDetails.title}</h3>
          </div>
          <div className='container d-flex justify-content-center flex-column' style={{height: "400px", width: "300px"}}>
             {data.data.map((quality) => quality && <a href={quality.url} target="_blank" rel='noreferrer'><button className='btn btn-outline-light m-4 w-100' key={uuid}>{quality.qualityLabel}</button></a>)}
          </div>
        </div>
        }
      </div>
      <section className='container-footer w-100 d-flex justify-content-center align-items-center'>
      <p> 
        This site allows you to convert & download video from YouTube with 1080p, 720p and 360p quality.
      </p>
      </section>
    </div>
    );
}

export default App;
