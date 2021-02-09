import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [change, setChange] = useState(false);
  const [unstructured, setFiles] = useState([]);
  const [input_text, setText] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [speakImg, setSpeakImg] = useState();
  const [speakers, setAll] = useState([]);
  const [moderator, setModerator] = useState("");
  const [allmoderators, setAllModerators] = useState([]);
  const [imagess, setImagess] = useState([]);
  //
  //
  //
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
    setChange(!change);
  };
  //
  //
  //
  //
  //
  // Moderator
  const moderatorHandler = (e) => {
    setSpeakImg(e.target.files[0]);
  };
  const AddModeratorHandler = (e) => {
    var obj = {
      name: moderator,
      image: speakImg.name,
    };
    imagess.push(speakImg);
    setImagess(imagess);
    allmoderators.push(JSON.stringify(obj));
    setAllModerators(allmoderators);
    setChange(!change);
  };
  //
  //
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
    allmoderators.forEach((el) => {
      form.append("moderators", el);
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
          <div className="preview">
            {unstructured.map((el, idx) => {
              if ((typeof el).toString() === "object") {
                let preview = URL.createObjectURL(el);
                return (
                  <div key={idx} className="img_container">
                    <img alt="aksgf" className="width" src={preview}></img>
                  </div>
                );
              } else {
                let dttt = JSON.parse(el);
                return (
                  <div key={idx} className="txt_container">
                    <h5>{dttt.data}</h5>
                  </div>
                );
              }
            })}
          </div>
          <label>Select File Or Add Text</label>
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
        {/*
         */}
        {/*
         */}
        {/* Speaker Section */}
        <div className="preview">
          {imagess.map((el, idx) => {
            if ((typeof el).toString() === "object") {
              let preview = URL.createObjectURL(el);
              return (
                <div key={idx} className="img_container">
                  <img alt="aksgf" className="width" src={preview}></img>
                </div>
              );
            } else {
              let dttt = JSON.parse(el);
              return (
                <div key={idx} className="txt_container">
                  <h5>{dttt.data}</h5>
                </div>
              );
            }
          })}
        </div>
        <div
          className="speaker files"
          style={{ backgroundColor: "teal", margin: "20px" }}
        >
          <h1>Speakers</h1>
          <input
            type="file"
            name="file"
            onChange={(e) => speakHandler(e)}
          ></input>
          <label>
            Name
            <input
              type="text"
              placeholder={speaker ? "name" : " "}
              value={speaker ? speaker : " "}
              onChange={(e) => setSpeaker(e.target.value)}
            ></input>
          </label>
          {/* <label>
            About
            <input
              type="text"
              // placeholder={speaker ? "name" : " "}
              // value={speaker ? speaker : " "}
              // onChange={(e) => setSpeaker(e.target.value)}
            ></input>
          </label> */}
          <button onClick={(e) => AddSpeakerHandler(e)}>Add Speaker</button>
        </div>
        {/*
         */}
        {/*
         */}
        {/* Moderator Section */}
        <div
          className="speaker files"
          style={{ backgroundColor: "teal", margin: "20px" }}
        >
          <h1>Moderators</h1>
          <input
            type="file"
            name="file"
            onChange={(e) => moderatorHandler(e)}
          ></input>
          <label>
            Name
            <input
              type="text"
              placeholder={moderator ? "name" : " "}
              value={moderator ? moderator : " "}
              onChange={(e) => setModerator(e.target.value)}
            ></input>
          </label>
          {/* <label>
            About
            <input
              type="text"
              // placeholder={speaker ? "name" : " "}
              // value={speaker ? speaker : " "}
              // onChange={(e) => setSpeaker(e.target.value)}
            ></input>
          </label> */}
          <button onClick={(e) => AddModeratorHandler(e)}>Add Speaker</button>
        </div>
      </div>
      <button onClick={(e) => submitHandler()}>Submit</button>
    </div>
  );
};

export default App;
