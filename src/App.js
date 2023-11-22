import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;

  .contentWrap {
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    padding: 20px;

    .cityInput {
      padding: 12px;
      border-radius: 12px;
      font-size: 15px;
    }
  }
`

const WeatherWrap = styled.div`
  margin-top: 30px;
  padding: 12px;
  border: 2px black solid;
  border-radius: 12px;
  display: flex;
  flex-direction: column;

  .cityName {
    font-size: 20px;
    font-weight: 400;
  }

  .temp {
    font-size: 40px;
    font-weight: 600;
    text-align: center;
  }

  .sky {
    font-size: 20px;
    font-weight: 400;
    text-align: right;
  }
`

function App() {
  const API_KEY = "08e41be9335d813cf0c2fff93b748157";
  const [location, setLocation] = useState(''); // 빈 문자열로 초기화
  const [result, setResult] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  // 비동기
  const searchWeather = async (e) => {
    if(e.key === 'Enter') {
      try {
        const data = await axios({
          method: 'get', // 정보 조회
          url: url
        })
        console.log(data);
        setResult(data);
      }
      catch (err) {
        alert(err);
      }
    }

  }

  return (
    <AppWrap>
      <div className='contentWrap'>
        <input
          className='cityInput'
          placeholder='도시를 입력하세요'
          value={location}
          // input 값이 변할 때마다, setLocation 변경 
          onChange={(e)=>setLocation(e.target.value)}
          type='text'
          onKeyDown={searchWeather}
        />
        {Object.keys(result).length !== 0 && (
           <WeatherWrap>
           <div className='cityName'>{result.data.name}</div>
           <div className='temp'>{result.data.main.temp}</div>
           <div className='sky'>{result.data.weather[0].main}</div>
         </WeatherWrap>
        )}
      </div>
    </AppWrap>
  );
}

export default App;
