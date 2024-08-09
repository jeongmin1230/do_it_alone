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
    let t = props.topics[i];
    lis.push(<li key = {t.id}>
      <a id = {t.id} href={'/read/' + t.id} onClick={event => {
        event.preventDefault();
        props.detail(Number(event.target.id));
      }}>{t.title}</a>
    </li>)
  }
  return <div>
    <ul>
      {lis}
    </ul>
  </div>
}

function Create(props) {
  return <div>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.create(title, body);
    }}>
      <p><input type='text' name='title' placeholder='제목'/></p>
      <p><textarea name='body' placeholder='내용'/></p>
      <p><input type='submit' value='작성' /></p>
    </form>
  </div>
}

function Read(props) {
  return <div>
    <h4>{props.title}</h4>
    <h6>{props.body}</h6>
  </div>
}

function App() {
  const [topics, setTopics] = useState(
    [{id: 1, title: '제목', body: '내용입니다.'}]
  );
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(topics.length);
  const [nextId, setNextId] = useState(topics.length+1);
  let content = null;
  let inDetail = null;
  if(mode === 'CREATE'){
    content = <Create create={(_title, _body) => {
      const newTopic = {id: nextId, title: _title, body: _body};
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('WELCOME');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if(mode === 'READ') {
    content = <Read title={topics[id-1].title} body={topics[id-1].body}></Read>
  }
  return <div className='body'>
    <Show title = '복습' body = '리액트 앱'></Show>
    <hr/>
    <button onClick={() => setMode('CREATE')}>새 글 생성</button>
    <List topics={topics} detail={(_id) => {
      setId(_id);
      setMode('READ');
    }}></List>
    {content}
  </div>
}

export default App;