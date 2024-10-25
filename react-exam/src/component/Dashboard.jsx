import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { getDoc, doc, getDocs, collection, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import "./Dashboard.css";


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(""); 
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [attendance, setAttendance] = useState(""); 
  const [studentField, setStudentField] = useState("");
  const [studentSubject, setStudentSubject] = useState("");
  const [studentMarks, setStudentMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [record, setRecord] = useState([]);
  const [editIndex, setEditIndex] = useState(null);




  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        console.log(userDoc.data());
      }
    };

    fetchUser();
  }, [user]);

  const fetchData = async () => {
    const data = await getDocs(collection(db, "Students")); 
    const newData = data.docs.map((item) => ({ docId: item.id, ...item.data() }));
    setRecord(newData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addData = async () => {
    const studentData = {
      studentId,
      studentName,
      email,
      dob,
      contactNumber,
      address,
      attendance,
      studentField,
      studentSubject,
      studentMarks,
      grade
    };

    if (editIndex === null) {
      await addDoc(collection(db, "Students"), studentData); 
    } else {
      await updateDoc(doc(db, "Students", editIndex), studentData); 
      setEditIndex(null);
    }

    clearFields();
    fetchData();
  };

  const deleteData = async (docId) => {
    await deleteDoc(doc(db, "Students", docId)); 
    fetchData();
  };

  const editData = (docId) => {
    const singleData = record.find((item) => item.docId === docId);
    setStudentId(singleData.studentId);
    setStudentName(singleData.studentName);
    setEmail(singleData.email);
    setDob(singleData.dob);
    setContactNumber(singleData.contactNumber);
    setAddress(singleData.address);
    setAttendance(singleData.attendance);
    setStudentField(singleData.studentField);
    setStudentSubject(singleData.studentSubject);
    setStudentMarks(singleData.studentMarks);
    setGrade(singleData.grade);
    setEditIndex(docId);
  };

  const clearFields = () => {
    setStudentId("");
    setStudentName("");
    setEmail("");
    setDob("");
    setContactNumber("");
    setAddress("");
    setAttendance("");
    setStudentField("");
    setStudentSubject("");
    setStudentMarks("");
    setGrade("");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Student ERP System (Admin Side)</h1>
     
      <div className="input-group">
        <input
          type="text"
          placeholder='Student ID'
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder='Student Name'
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="date"
          placeholder='Date of Birth'
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder='Contact Number'
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder='Address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder='Attendance Percentage'
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder='Student Field'
          value={studentField}
          onChange={(e) => setStudentField(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder='Student Subject'
          value={studentSubject}
          onChange={(e) => setStudentSubject(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder='Student Marks'
          value={studentMarks}
          onChange={(e) => setStudentMarks(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder='Grade'
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="input-field"
        />
        <button id='c1' onClick={addData} className="submit-button">
          {editIndex === null ? "Add" : "Update"}
        </button>
      </div>

      <table className="record">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Attendance</th>
            <th>Field</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {record.map((e) => (
            <tr key={e.docId}>
              <td>{e.studentId}</td>
              <td>{e.studentName}</td>
              <td>{e.email}</td>
              <td>{e.dob}</td>
              <td>{e.contactNumber}</td>
              <td>{e.address}</td>
              <td>{e.attendance}</td>
              <td>{e.studentField}</td>
              <td>{e.studentSubject}</td>
              <td>{e.studentMarks}</td>
              <td>{e.grade}</td>
              <td>
                {/* <button onClick={() => editData(e.docId)} className="edit-button">Edit</button> */}
    <button class="edit-button" onClick={() => editData(e.docId)}>
  <svg class="edit-svgIcon" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
</button>
   {/* <button onClick={() => deleteData(e.docId)} className="delete-button">Delete</button> */}
<button class="button1" onClick={() => deleteData(e.docId)}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 69 14"
    class="svgIcon bin-top"
  >
    <g clip-path="url(#clip0_35_24)">
      <path
        fill="black"
        d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_35_24">
        <rect fill="white" height="14" width="69"></rect>
      </clipPath>
    </defs>
  </svg>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 69 57"
    class="svgIcon bin-bottom"
  >
    <g clip-path="url(#clip0_35_22)">
      <path
        fill="black"
        d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_35_22">
        <rect fill="white" height="57" width="69"></rect>
      </clipPath>
    </defs>
  </svg>
</button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
