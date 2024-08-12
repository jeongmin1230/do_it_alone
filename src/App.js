import './App.css';
import { useState } from 'react';

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
    <ol>
      {lis}
    </ol>
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

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <div>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.update(title, body);
    }}>
      <p><input type='text' name='title' placeholder='제목' value={title} onChange={event => {setTitle(event.target.value)}}/></p>
      <p><textarea name='body' placeholder='내용' value={body} onChange={event => {setBody(event.target.value)}} /></p>
      <p><input type='submit' value='수정'/></p>
    </form>
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
  const [topics, setTopics] = useState(
    [{id: 0, title: '제목', body: '내용입니다.'}]
  );
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(topics.length);
  const [nextId, setNextId] = useState(topics.length);
  let content = null;
  let inDetail = null;
  if(mode === 'WELCOME') {
    content = <Read title = '복습' body = '리액트 앱'/>
  } else if(mode === 'CREATE'){
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
    content = <Read title={topics[id].title} body={topics[id].body}/>
    inDetail = <>
      <button onClick={event => {
        event.preventDefault();
        setMode('UPDATE');
      }}>수정</button>&nbsp;
    <input type='button' value='삭제' onClick={() => {
        const newTopics = [];
        for(let i = 0; i < topics.length; i++) {
          if(topics[i].id !== id) {
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics)
        setMode('WELCOME');
      }}></input>
    </>
  } else if(mode === 'UPDATE') {
    let title, body = null;
    for(let i = 0; i < topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title = {title} body = {body} update = {(title, body) => {
      const newTopics = [...topics]
      const updateTopic = {id: id, title: title, body: body};
      for(let i = 0; i < newTopics.length; i++) {
        if(newTopics[i].id === id) {
          newTopics[i] = updateTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('WELCOME');
    }}/>
  }
  return <div className='body'>
    <button onClick={() => setMode('WELCOME')}>처음 화면으로</button>&nbsp;
    <button onClick={() => setMode('CREATE')}>새 글 생성</button>
    <hr/>
    {content}
    {inDetail}
    <List topics={topics} detail={(_id) => {
      setId(_id);
      setMode('READ');
    }}></List>
  </div>
}

export default App;