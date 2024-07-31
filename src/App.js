import './App.css';
import { useState } from 'react';
// create 는 첫 화면에 버튼으로
// read 는 첫 화면에 바로
// update 는 첫 화면에서 특정 글 눌렀을 때 버튼 나오게
// delete 도 특정 글 눌렀을 때 버튼으로

function Menu(props) {
  return <div>
    <a href={''} onClick={event => {
      event.preventDefault();
      props.onCreate();
    }}>작성</a>
  </div>
}

function Create(props) {
  return <div>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const content = event.target.body.value;
      props.onCreate(title, content);
    }}>
      <p><input type='text' name='title' placeholder='title'/></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value='작성'></input></p>
    </form>
  </div>
}

function Read(props) {
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>)
  }
  return <div>
    <ol>
      {lis}
    </ol>
  </div>
}

function App() {
  const [mode, setMode] = useState('READ');
  const [topics, setTopics] = useState([
    {id:1, title: '제목 1', content: '내용 1'}
  ])
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(topics.length+1);
  let content = null;
  if(mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = {id: nextId, title: _title, content: _body};
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if(mode === 'READ') {

  } else if(mode === 'UPDATE') {

  } else if(mode === 'DELETE') {

  }

  return (
    <div className='body'>
      <Menu onCreate={() => {
        if(mode==='READ') setMode('CREATE');
        else if(mode==='CREATE') setMode('READ');
      }}></Menu>
      <Read topics={topics}></Read>
      {content}
    </div>
  );
}

export default App;
