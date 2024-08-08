import './App.css';
import { useState } from 'react';

function Show(props) {
  return <div>
    <h3>{props.title}</h3>
    <h5>{props.body}</h5>
  </div>
}

function List(props) {
  const lis = [];
  for(let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i]
    lis.push(<li key = {t.id}>
      <a id = {t.id} href={'/read/' + t.id} onClick={event => {
        event.preventDefault();
      }}>{t.title}</a>
    </li>)
  }
  return <div>
    <ul>
      {lis}
    </ul>
  </div>
}

function App() {
  const [topics, setTopics] = useState([{id: 1, title: '제목', body: '내용입니다.'}]);
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  let content = null;
  return <div className='body'>
    <Show title = 'Review' body = 'react app'></Show>
    <List topics={topics}></List>
    {content}
  </div>
}

export default App;