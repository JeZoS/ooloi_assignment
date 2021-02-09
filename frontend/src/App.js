import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [change, setChange] = useState(false);
  const [unstructured, setFiles] = useState([]);
  const [input_text, setText] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [speakImg, setSpeakImg] = useState();
  const [speakers, setAll] = useState([]);
  const [imagess, setImagess] = useState([]);
  //
  //
  //
  //
  const speakHandler = (e) => {
    setSpeakImg(e.target.files[0]);
  };
  const AddSpeakerHandler = (e) => {
    // console.log(speakImg, speaker);
    var obj = {
      name: speaker,
      image: speakImg.name,
    };
    imagess.push(speakImg);
    setImagess(imagess);
    speakers.push(JSON.stringify(obj));
    setAll(speakers);
    console.log(speakers, imagess);
  };
  //
  //
  //
  //
  const fileHandler = (e) => {
    e.preventDefault();
    var img = e.target.files[0];
    img.id = new Date();
    unstructured.push(img);
    setFiles(unstructured);
    setChange(!change);
    console.log(unstructured);
  };
  //
  //
  //
  //
  const addHandler = (e) => {
    e.preventDefault();
    var obj = {
      type: "text",
      subtype: "normal",
      data: input_text,
    };
    unstructured.push(JSON.stringify(obj));
    setFiles(unstructured);
    setChange(!change);
    setText("");
    console.log(unstructured);
  };
  //
  //
  //
  //
  //
  const submitHandler = async () => {
    var form = new FormData();
    unstructured.forEach((el) => {
      form.append("unstructured", el);
    });
    speakers.forEach((el) => {
      form.append("speakers", el);
    });
    imagess.forEach((el) => {
      form.append("image", el);
    });
    const { data } = await axios({
      method: "post",
      url: "/event/",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(data);
  };
  //
  //
  //
  //
  //
  return (
    <div className="App">
      <div className="form">
        <div
          className="files"
          style={{ backgroundColor: "teal", margin: "20px" }}
        >
          <h1>Unstructured</h1>
          <p>Total_data_{unstructured.length}</p>
          <label>Select File</label>
          <div>
            <input
              type="file"
              name="file"
              onChange={(e) => fileHandler(e)}
            ></input>
          </div>
          <div>
            <input
              type="text"
              value={input_text ? input_text : " "}
              onChange={(e) => setText(e.target.value)}
            ></input>
            <button onClick={(e) => addHandler(e)}>Add text</button>
          </div>
        </div>
        <div className="speaker files">
          <input
            type="file"
            name="file"
            onChange={(e) => speakHandler(e)}
          ></input>
          <input
            type="text"
            placeholder={speaker ? "about" : " "}
            value={speaker ? speaker : " "}
            onChange={(e) => setSpeaker(e.target.value)}
          ></input>
          <button onClick={(e) => AddSpeakerHandler(e)}>Add Speaker</button>
        </div>
      </div>
      <button onClick={(e) => submitHandler()}>Submit</button>
    </div>
  );
};

export default App;
