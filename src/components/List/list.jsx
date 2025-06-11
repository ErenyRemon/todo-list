import './list.css';
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase'; // تأكدي إن المسار صحيح
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LuListTodo } from "react-icons/lu";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSave } from "react-icons/bi";






function List({ user }) {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");


  // جلب المهام من Firestore عند تحميل المكون
  useEffect(() => {
    if (!user) return;
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, `users/${user.uid}/todos`));
        const fetchedTasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
        }));
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [user]);

  // إضافة مهمة جديدة
  async function addItem() {
    if (inputValue.trim() === "" || !user) return;
    try {
      const todo = { text: inputValue };
      const docRef = await addDoc(collection(db, `users/${user.uid}/todos`), todo);
      setTasks([...tasks, { id: docRef.id, text: inputValue }]);
      setInputValue("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  // حذف مهمة
  async function deleteItem(id) {
    if (!user) return;
    try {
      await deleteDoc(doc(db, `users/${user.uid}/todos`, id));
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // بدء تعديل مهمة
  function editItem(id) {
    const task = tasks.find((task) => task.id === id);
    setEditingIndex(id);
    setEditingValue(task.text);
  }

  // حفظ التعديل
  async function saveEdit(id) {
    if (!user) return;
    try {
      await updateDoc(doc(db, `users/${user.uid}/todos`, id), { text: editingValue });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: editingValue } : task
        )
      );
      setEditingIndex(null);
      setEditingValue("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  return (
    <>
    <div className='body'>
      <div  style={{backgroundColor: '#2C2C2C' , padding: '30px', borderRadius: '10px'}}> 
        <div>
          <Container className='d-flex justify-content-center' >
            <Row className='d-flex justify-content-center align-items-center ' style={{ width: '600px' }}>
              <Col className='d-flex justify-content-end '><hr style={{ width: '50px', color: 'white', height: '1px' }} /></Col>
              {/* <div style={{backgroundColor: 'white', height: '1px', width: '50px'}}></div>  */}
              <Col className='todoText' style={{ fontSize: 'xx-large' }}>TO-DO NOW</Col>
              <Col className='d-flex justify-content-start '><hr style={{ width: '50px', color: 'white', height: '1px' }} /></Col>
              {/* <div style={{backgroundColor: 'white', height: '1px', width: '50px'}}></div>  */}
              {/* <Col><hr /></Col> */}
            </Row>
          </Container>

          <Container className='d-flex justify-content-center mb-3' >
            <Row className='d-flex justify-content-center align-items-center'>
              {/* <Col><hr style={{width: '50px', color: 'white' , height: '1px'}}/></Col> */}
              {/* <div style={{backgroundColor: 'white', height: '1px', width: '50px'}}></div>  */}
              <Col className='d-flex justify-content-start '><hr style={{ width: '150px', color: 'white', height: '1px' }} /></Col>
              <Col><LuListTodo style={{ color: 'white', width: '24px', height: '24px' }} /></Col>
              <Col className='d-flex justify-content-start '><hr style={{ width: '150px', color: 'white', height: '1px' }} /></Col>
              {/* <div style={{backgroundColor: 'white', height: '1px', width: '50px'}}></div>  */}
              {/* <Col><hr /></Col> */}
            </Row>
          </Container>

          {/* <hr className='line' /> */}
          <div className='input' >
            <input
              style={{ borderRadius: '10px', backgroundColor: '#D9D9D9' }}
              className='text_input'
              type="text"
              placeholder="  add task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className='add_button' onClick={addItem}>Add task</button>
          </div>
        </div>
        <div className='d-flex justify-content-center' style={{ marginLeft: '25px', marginBottom: '30px' }}>
          <hr style={{ width: '570px' }} />
        </div>
        <div className='main'>
          {tasks.map((task) => (
            <div className='div_parent_task' key={task.id}>
              <div className="task_div">
                {editingIndex === task.id ? (
                  <input
                    className='text_input'
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                  />
                ) : (
                  <span className='text_task'>{task.text}</span>
                )}
                <div className="two_buttons">
                  <button className='btn' onClick={() => deleteItem(task.id)}><AiOutlineDelete className='taskBtn' style={{ borderRadius: '5px', width:'24px', height: '23px'}} /> </button>
                  {editingIndex === task.id ? (
                    <button className='btn' onClick={() => saveEdit(task.id)}><BiSave className='taskBtn' style={{ borderRadius: '5px', width:'24px', height: '23px'}}/></button>
                  ) : (
                    <button className='btn' onClick={() => editItem(task.id)}><BiSolidEdit className='taskBtn' style={{ borderRadius: '5px', width:'24px', height: '23px'}} /></button>
                  )}
                </div>
              </div>
            
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default List;

