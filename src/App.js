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
        props.onClick(Number(event.target.id));
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
    <h4>새 글 등록</h4>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='제목'/></p>
      <p><textarea name='body' placeholder='내용'></textarea></p>
      <p><input type='submit' value='등록'></input></p>
    </form>
  </div>
}

function App() {
  const [topics, setTopics] = useState([{id: 1, title: '제목', body: '내용입니다.'}]);
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(topics.length);
  const [nextId, setNextId] = useState(topics.length+1);
  let content = null;
  let optionContent = null;
  if(mode === 'WELCOME'){
    content = <Show title = 'CRUD복습 제목' body = 'react를 통해 구현'></Show>
  } else if(mode==='CREATE') {
    content = <Create onCreate = {(_title, _body) => {
      const newTopic = {id: nextId, title: _title, body: _body};
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopic);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
      console.log('topics :: ', topics)
    }}></Create>
  } else if(mode === 'READ') {
    let title, body = null;
    for(let i = 0; i < topics.length; i++){
      const topic = topics[i]
      if(topic.id === id) {
        title = topic.title;
        body = topic.body;
      }
    } 
    content = <Show title={title} body={body}></Show>
  }
  return <div className='body'>
    <a href='/create' onClick={event => {
      event.preventDefault();
      setMode('CREATE');
    }}>새 글 작성</a>
    <List topics={topics} onClick={(_id)=> {
      setMode('READ');
      setId(_id);
    }}></List>
    {content}
    {optionContent}
    <hr/>
  </div>
}

export default App;