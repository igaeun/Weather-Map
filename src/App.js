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
  }
`

function App() {
  const API_KEY = "08e41be9335d813cf0c2fff93b748157";
  const [location, setLocation] = useState(''); // 빈 문자열로 초기화
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
          placeholder='도시를 입력하세요'
          value={location}
          // input 값이 변할 때마다, setLocation 변경 
          onChange={(e)=>setLocation(e.target.value)}
          type='text'
          onKeyDown={searchWeather}
        />

      </div>
    </AppWrap>
  );
}

export default App;
